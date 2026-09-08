'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { sampleCv } from '@/lib/cv/emptyCv'
import { loadCvData, loadCvTemplate, saveCvTemplate } from '@/lib/cv/storage'
import type { CvData, CvTemplateId } from '@/lib/cv/types'

import styles from './CvBuilder.module.css'
import { CvPreview } from './CvPreview'
import { TemplatePicker } from './TemplatePicker'

type CvDownloadProps = {
  initialData?: CvData
  initialTemplate?: CvTemplateId
}

export function CvDownload({ initialData, initialTemplate }: CvDownloadProps) {
  const [data, setData] = useState<CvData>(initialData ?? sampleCv)
  const [template, setTemplate] = useState<CvTemplateId>(initialTemplate ?? 'classic')
  const [isLoaded, setIsLoaded] = useState(Boolean(initialData && initialTemplate))
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadedData = initialData ?? loadCvData()
    const loadedTemplate = initialTemplate ?? loadCvTemplate()
    setData(loadedData)
    setTemplate(loadedTemplate)
    setIsLoaded(true)
  }, [initialData, initialTemplate])

  const onTemplateChange = (next: CvTemplateId) => {
    setTemplate(next)
    saveCvTemplate(next)
    setError(null)
  }

  const onDownload = async () => {
    setError(null)
    setDownloading(true)

    try {
      const { downloadCv } = await import('./pdf/downloadCv')
      await downloadCv(data, template)
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : 'Could not create the PDF.'
      setError(message)
    } finally {
      setDownloading(false)
    }
  }

  if (!isLoaded) {
    return null
  }

  return (
    <div className={styles.builder}>
      <header className={styles.top}>
        <div className={styles.intro}>
          <h1>Choose Template & Download</h1>
          <p>Pick any of the 50+ layouts below, review the interactive preview, and download your PDF.</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.secondary} href="/">
            ← Edit Details
          </Link>
          <button
            className={styles.download}
            disabled={downloading}
            onClick={onDownload}
            type="button"
          >
            {downloading ? 'Preparing PDF…' : 'Download PDF'}
          </button>
        </div>
      </header>

      {error ? (
        <div className={styles.errorWrapper}>
          <p className={styles.error}>{error}</p>
        </div>
      ) : null}

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <TemplatePicker onChange={onTemplateChange} value={template} />
        </div>
        <div className={styles.previewColumn}>
          <CvPreview data={data} onTemplateChange={onTemplateChange} template={template} />
        </div>
      </div>
    </div>
  )
}
