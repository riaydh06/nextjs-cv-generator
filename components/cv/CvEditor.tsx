'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { emptyCv, sampleCv } from '@/lib/cv/emptyCv'
import { loadCvData, saveCvData } from '@/lib/cv/storage'
import type { CvData } from '@/lib/cv/types'

import styles from './CvBuilder.module.css'
import { CvForm } from './CvForm'

type CvEditorProps = {
  initialData?: CvData
}

export function CvEditor({ initialData }: CvEditorProps) {
  const router = useRouter()
  const [data, setData] = useState<CvData>(initialData ?? sampleCv)
  const [isLoaded, setIsLoaded] = useState(Boolean(initialData))
  const [photoBusy, setPhotoBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialData) {
      const stored = loadCvData()
      setData(stored)
      setIsLoaded(true)
    }
  }, [initialData])

  const handleDataChange: React.Dispatch<React.SetStateAction<CvData>> = (updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveCvData(next)
      return next
    })
  }

  const onPhotoFile = (file: File) => {
    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    // Limit photo file size to 2MB to keep localStorage responsive
    if (file.size > 2 * 1024 * 1024) {
      setError('Photo is too large (max 2MB). Please choose a smaller image.')
      return
    }

    setPhotoBusy(true)
    const reader = new FileReader()

    reader.onload = () => {
      const base64 = reader.result as string
      handleDataChange((prev) => ({
        ...prev,
        photo: base64,
        photoId: null,
      }))
      setPhotoBusy(false)
    }

    reader.onerror = () => {
      setError('Failed to read the selected photo file.')
      setPhotoBusy(false)
    }

    reader.readAsDataURL(file)
  }

  const handleResetSample = () => {
    if (window.confirm('Reset form to sample data? Any current changes will be overwritten.')) {
      handleDataChange(sampleCv)
      setError(null)
    }
  }

  const handleClear = () => {
    if (window.confirm('Clear all form fields? This will remove all entered details.')) {
      handleDataChange(emptyCv)
      setError(null)
    }
  }

  const onContinue = () => {
    saveCvData(data)
    router.push('/download')
  }

  if (!isLoaded) {
    return null
  }

  return (
    <div className={styles.builder}>
      <header className={`${styles.top} ${styles.topCentered}`}>
        <div className={styles.topInner}>
          <div className={styles.intro}>
            <h1>Your Details</h1>
            <p>Fill in your CV information. Your changes are automatically saved in your browser.</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary} onClick={handleResetSample} type="button">
              Load Sample
            </button>
            <button className={styles.secondary} onClick={handleClear} type="button">
              Clear Form
            </button>
            <button className={styles.download} onClick={onContinue} type="button">
              Save & Preview →
            </button>
          </div>
        </div>
      </header>

      {error ? (
        <div className={styles.errorWrapper}>
          <p className={styles.error}>{error}</p>
        </div>
      ) : null}

      <div className={`${styles.body} ${styles.formOnly}`}>
        <CvForm
          data={data}
          onChange={handleDataChange}
          onPhotoFile={onPhotoFile}
          photoBusy={photoBusy}
        />
      </div>
    </div>
  )
}
