'use client'

import { useEffect, useRef } from 'react'

import { CV_TEMPLATES, type CvTemplateId } from '@/lib/cv/templates'

import styles from './TemplatePicker.module.css'

type TemplatePickerProps = {
  value: CvTemplateId
  onChange: (id: CvTemplateId) => void
}

export function TemplatePicker({ onChange, value }: TemplatePickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const activeEl = pickerRef.current?.querySelector(`.${styles.selected}`) as HTMLElement | null
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [value])

  return (
    <div className={styles.picker} ref={pickerRef} role="radiogroup" aria-label="CV format">
      {CV_TEMPLATES.map((template) => {
        const selected = template.id === value
        return (
          <button
            aria-checked={selected}
            className={`${styles.card} ${selected ? styles.selected : ''}`}
            key={template.id}
            onClick={() => onChange(template.id)}
            role="radio"
            type="button"
          >
            <span className={styles.name}>{template.name}</span>
            <span className={styles.blurb}>{template.blurb}</span>
          </button>
        )
      })}
    </div>
  )
}
