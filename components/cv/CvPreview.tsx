'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { CV_TEMPLATES } from '@/lib/cv/templates'
import type { CvData, CvTemplateId } from '@/lib/cv/types'

import { CvTemplatePreview } from './templates/registry'

import styles from './CvPreview.module.css'

const A4_HEIGHT_PX = 1123 // Standard A4 height at 96 DPI (297mm)
const MIN_ZOOM = 0.35
const MAX_ZOOM = 1.6
const STEP_ZOOM = 0.1

type CvPreviewProps = {
  data: CvData
  template: CvTemplateId
  onTemplateChange?: (template: CvTemplateId) => void
}

export function CvPreview({ data, template: controlledTemplate, onTemplateChange }: CvPreviewProps) {
  const [internalTemplate, setInternalTemplate] = useState<CvTemplateId>(controlledTemplate)
  const [sheetHeight, setSheetHeight] = useState<number>(A4_HEIGHT_PX)
  const [mounted, setMounted] = useState(false)
  const [showBreaks, setShowBreaks] = useState(true)
  const [viewMode, setViewMode] = useState<'visual' | 'pdf'>('visual')
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(0.68)
  const [pdfPagesCount, setPdfPagesCount] = useState<number>(1)
  const [pdfPage, setPdfPage] = useState<number>(1)

  const sheetContainerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const pageBreakRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const prevPdfUrlRef = useRef<string | null>(null)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && window.innerWidth <= 900) {
      setZoomLevel(0.5)
    }
  }, [])

  // Keep internal state in sync if prop changes
  useEffect(() => {
    setInternalTemplate(controlledTemplate)
    setPdfPage(1)
  }, [controlledTemplate])

  const currentTemplate = onTemplateChange ? controlledTemplate : internalTemplate

  const currentIndex = useMemo(() => {
    const idx = CV_TEMPLATES.findIndex((t) => t.id === currentTemplate)
    return idx >= 0 ? idx : 0
  }, [currentTemplate])

  const currentTemplateObj = CV_TEMPLATES[currentIndex] || CV_TEMPLATES[0]
  const prevIndex = (currentIndex - 1 + CV_TEMPLATES.length) % CV_TEMPLATES.length
  const nextIndex = (currentIndex + 1) % CV_TEMPLATES.length
  const prevTemplate = CV_TEMPLATES[prevIndex]
  const nextTemplate = CV_TEMPLATES[nextIndex]

  const handleSelectTemplate = useCallback(
    (nextId: CvTemplateId) => {
      setPdfPage(1)
      if (onTemplateChange) {
        onTemplateChange(nextId)
      } else {
        setInternalTemplate(nextId)
      }
    },
    [onTemplateChange],
  )

  const handlePrevTemplate = useCallback(() => {
    handleSelectTemplate(prevTemplate.id)
  }, [handleSelectTemplate, prevTemplate.id])

  const handleNextTemplate = useCallback(() => {
    handleSelectTemplate(nextTemplate.id)
  }, [handleSelectTemplate, nextTemplate.id])

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(MAX_ZOOM, Math.round((prev + STEP_ZOOM) * 100) / 100))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(MIN_ZOOM, Math.round((prev - STEP_ZOOM) * 100) / 100))
  }, [])

  const handleResetZoom = useCallback(() => {
    const defaultZoom = typeof window !== 'undefined' && window.innerWidth <= 900 ? 0.5 : 0.68
    setZoomLevel(defaultZoom)
  }, [])

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

      if (e.key === 'ArrowLeft' && (e.altKey || e.metaKey)) {
        e.preventDefault()
        handlePrevTemplate()
      } else if (e.key === 'ArrowRight' && (e.altKey || e.metaKey)) {
        e.preventDefault()
        handleNextTemplate()
      } else if ((e.key === '+' || e.key === '=') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handleZoomIn()
      } else if ((e.key === '-' || e.key === '_') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handleZoomOut()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrevTemplate, handleNextTemplate, handleZoomIn, handleZoomOut])

  // Measure rendered sheet height to calculate page count and break points
  useEffect(() => {
    if (viewMode !== 'visual') return
    const container = sheetContainerRef.current
    if (!container) return

    const measure = () => {
      const firstChild = container.firstElementChild as HTMLElement | null
      const height = firstChild ? firstChild.scrollHeight || firstChild.offsetHeight : container.offsetHeight
      if (height > 0) {
        setSheetHeight(height)
      }
    }

    measure()

    const observer = new ResizeObserver(() => {
      measure()
    })

    observer.observe(container)
    if (container.firstElementChild) {
      observer.observe(container.firstElementChild)
    }

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => measure())
    }

    return () => observer.disconnect()
  }, [data, currentTemplate, viewMode])

  // Generate PDF preview when PDF view is active
  useEffect(() => {
    if (viewMode !== 'pdf') return

    let active = true

    setPdfLoading(true)
    setPdfError(null)

    const loadPdf = async () => {
      try {
        const [{ pdf }, { getPdfDocument }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('./pdf/documents'),
        ])

        const photo =
          data.photo && data.photo.startsWith('/')
            ? `${window.location.origin}${data.photo}`
            : data.photo

        const doc = getPdfDocument(currentTemplate, { ...data, photo }) as Parameters<typeof pdf>[0]
        const inst = pdf(doc)

        const pdfInstance = inst as unknown as {
          container?: {
            document?: {
              props?: {
                onRender?: (info: { _INTERNAL__LAYOUT__DATA_?: { children?: unknown[] } }) => void
              }
            }
          }
        }

        if (pdfInstance.container?.document) {
          pdfInstance.container.document.props = {
            ...pdfInstance.container.document.props,
            onRender: ({ _INTERNAL__LAYOUT__DATA_ }) => {
              if (_INTERNAL__LAYOUT__DATA_?.children?.length) {
                setPdfPagesCount(_INTERNAL__LAYOUT__DATA_.children.length)
              }
            },
          }
        }

        const blob = await inst.toBlob()

        if (!active) return

        const newUrl = URL.createObjectURL(blob)
        setPdfUrl(newUrl)
        if (prevPdfUrlRef.current && prevPdfUrlRef.current !== newUrl) {
          URL.revokeObjectURL(prevPdfUrlRef.current)
        }
        prevPdfUrlRef.current = newUrl
      } catch (err) {
        if (!active) return
        setPdfError(err instanceof Error ? err.message : 'Could not generate PDF preview.')
      } finally {
        if (active) {
          setPdfLoading(false)
        }
      }
    }

    loadPdf()

    return () => {
      active = false
    }
  }, [viewMode, currentTemplate, data])

  // Revoke object URL on final unmount
  useEffect(() => {
    return () => {
      if (prevPdfUrlRef.current) {
        URL.revokeObjectURL(prevPdfUrlRef.current)
        prevPdfUrlRef.current = null
      }
    }
  }, [])

  const { totalPages, pageBreaks } = useMemo(() => {
    const effective = Math.max(A4_HEIGHT_PX, sheetHeight)
    // 4px tolerance for subpixel layout rounding
    const visualCount = Math.max(1, Math.ceil((effective - 4) / A4_HEIGHT_PX))
    const count = viewMode === 'pdf' ? Math.max(visualCount, pdfPagesCount) : visualCount
    const breaks: number[] = []
    for (let i = 1; i < count; i++) {
      breaks.push(i * A4_HEIGHT_PX)
    }
    return { totalPages: count, pageBreaks: breaks }
  }, [sheetHeight, viewMode, pdfPagesCount])

  const handleJumpPage = (pageNumber: number) => {
    if (viewMode === 'visual') {
      if (!viewportRef.current) return
      if (pageNumber === 1) {
        viewportRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      const breakEl = pageBreakRefs.current[pageNumber]
      if (breakEl) {
        breakEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }

      const targetY = (pageNumber - 1) * A4_HEIGHT_PX * zoomLevel
      viewportRef.current.scrollTo({ top: targetY, behavior: 'smooth' })
    } else {
      setPdfPage(pageNumber)
    }
  }

  const pdfWidth = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900
    const baseZoom = isMobile ? 0.5 : 0.68
    const baseWidth = 850
    return Math.round(baseWidth * (zoomLevel / baseZoom))
  }, [zoomLevel])

  const iframeSrc = useMemo(() => {
    if (!pdfUrl) return ''
    return `${pdfUrl}#page=${pdfPage}&view=FitH&toolbar=0&navpanes=0`
  }, [pdfUrl, pdfPage])

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarSectionLeft}>
          {/* Template navigation with left and right arrows */}
          <div className={styles.templateNavGroup}>
            <button
              aria-label={`Previous template (${prevTemplate.name})`}
              className={styles.templateArrowBtn}
              onClick={handlePrevTemplate}
              title={`Previous template (${prevTemplate.name})`}
              type="button"
            >
              <svg
                className={styles.arrowIcon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div
              className={styles.templateBadge}
              title={`Current template: ${currentTemplateObj.name} (${currentIndex + 1} of ${CV_TEMPLATES.length})`}
            >
              <span className={styles.templateLabel}>Template:</span>
              <span className={styles.templateName}>{currentTemplateObj.name}</span>
              <span className={styles.templateCounter}>
                {currentIndex + 1}/{CV_TEMPLATES.length}
              </span>
            </div>

            <button
              aria-label={`Next template (${nextTemplate.name})`}
              className={styles.templateArrowBtn}
              onClick={handleNextTemplate}
              title={`Next template (${nextTemplate.name})`}
              type="button"
            >
              <svg
                className={styles.arrowIcon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Size increase / decrease view zoom buttons */}
          <div className={styles.zoomGroup}>
            <button
              aria-label="Decrease view size (Zoom out)"
              className={styles.zoomBtn}
              disabled={zoomLevel <= MIN_ZOOM}
              onClick={handleZoomOut}
              title="Decrease view size (Zoom out)"
              type="button"
            >
              <svg
                className={styles.toolIcon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
                <line x1="8" x2="14" y1="11" y2="11" />
              </svg>
            </button>

            <button
              className={styles.zoomResetBtn}
              onClick={handleResetZoom}
              title="Reset view size to default (click to reset)"
              type="button"
            >
              {Math.round(zoomLevel * 100)}%
            </button>

            <button
              aria-label="Increase view size (Zoom in)"
              className={styles.zoomBtn}
              disabled={zoomLevel >= MAX_ZOOM}
              onClick={handleZoomIn}
              title="Increase view size (Zoom in)"
              type="button"
            >
              <svg
                className={styles.toolIcon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
                <line x1="11" x2="11" y1="8" y2="14" />
                <line x1="8" x2="14" y1="11" y2="11" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.toolbarSectionRight}>
          <div className={styles.pageInfo}>
            <span className={`${styles.pageBadge} ${totalPages > 1 ? styles.pageBadgeMulti : ''}`}>
              <svg
                className={styles.docIcon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              {totalPages === 1 ? '1 Page (A4)' : `${totalPages} Pages (A4)`}
            </span>
            {totalPages > 1 ? (
              <span className={styles.breakHint}>
                Page break at {A4_HEIGHT_PX.toLocaleString()}px
              </span>
            ) : (
              <span className={styles.breakHint}>Fits on a single page</span>
            )}
          </div>

          <div className={styles.toolbarActions}>
            {totalPages > 1 && (
              <div className={styles.jumpGroup}>
                <span className={styles.jumpLabel}>Jump:</span>
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      className={styles.jumpBtn}
                      key={pageNum}
                      onClick={() => handleJumpPage(pageNum)}
                      title={`Jump to Page ${pageNum}`}
                      type="button"
                    >
                      Page {pageNum}
                    </button>
                  )
                })}
              </div>
            )}

            {viewMode === 'visual' && (
              <button
                className={`${styles.toggleBtn} ${showBreaks ? styles.toggleActive : ''}`}
                onClick={() => setShowBreaks((prev) => !prev)}
                title="Toggle page break lines visibility"
                type="button"
              >
                <span className={styles.toggleDot} />
                {showBreaks ? 'Page breaks: Visible' : 'Page breaks: Hidden'}
              </button>
            )}

            <div className={styles.modeTabs}>
              <button
                className={`${styles.tabBtn} ${viewMode === 'visual' ? styles.tabActive : ''}`}
                onClick={() => setViewMode('visual')}
                type="button"
              >
                Visual
              </button>
              <button
                className={`${styles.tabBtn} ${viewMode === 'pdf' ? styles.tabActive : ''}`}
                onClick={() => setViewMode('pdf')}
                type="button"
              >
                PDF view
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.previewWrapper}>
        {/* Floating Left Arrow for changing template */}
        <button
          aria-label={`Previous template: ${prevTemplate.name}`}
          className={`${styles.floatingNavBtn} ${styles.floatingNavLeft}`}
          onClick={handlePrevTemplate}
          title={`Previous template: ${prevTemplate.name}`}
          type="button"
        >
          <svg
            className={styles.floatingNavIcon}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className={styles.floatingNavTooltip}>← {prevTemplate.name}</span>
        </button>

        <div className={styles.viewport} ref={viewportRef}>
          {viewMode === 'visual' ? (
            <div className={styles.scale} style={{ zoom: zoomLevel }}>
              <div className={styles.sheetContainer} ref={sheetContainerRef}>
                <CvTemplatePreview data={data} template={currentTemplate} />

                {/* Page break indicators rendered at every 1123px */}
                {mounted &&
                  showBreaks &&
                  pageBreaks.map((breakTop, index) => {
                    const pageNum = index + 2
                    return (
                      <div
                        className={styles.pageBreakOverlay}
                        key={`break-${pageNum}`}
                        ref={(el) => {
                          pageBreakRefs.current[pageNum] = el
                        }}
                        style={{ top: `${breakTop}px` }}
                      >
                        <div className={styles.breakMainRow}>
                          <div className={styles.gutterBadgeLeft}>
                            <span>Page {pageNum - 1}</span>
                          </div>

                          <div className={styles.breakLineLeft} />

                          <div className={styles.breakPill}>
                            <span className={styles.breakIcon}>✂</span>
                            <span className={styles.breakLabel}>Page Break</span>
                            <span className={styles.breakSep}>•</span>
                            <span className={styles.breakPageNum}>Page {pageNum} starts here</span>
                          </div>

                          <div className={styles.breakLineRight} />

                          <div className={styles.gutterBadgeRight}>
                            <span>Page {pageNum}</span>
                          </div>
                        </div>

                        <div className={styles.pageBreakMarginGuide}>
                          <span className={styles.marginGuideIcon}>ℹ</span>
                          <span>
                            Page {pageNum} print area (top spacing applied automatically on download)
                          </span>
                        </div>
                      </div>
                    )
                  })}

                {/* Page side tags on right gutter */}
                {mounted &&
                  showBreaks &&
                  Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1
                    const topOffset = i * A4_HEIGHT_PX + 24
                    return (
                      <div
                        className={styles.pageSideTag}
                        key={`tag-${pageNum}`}
                        style={{ top: `${topOffset}px` }}
                      >
                        Page {pageNum} of {totalPages}
                      </div>
                    )
                  })}
              </div>
            </div>
          ) : (
            <div className={styles.pdfContainer}>
              {pdfError ? (
                <div className={styles.pdfState}>
                  <p className={styles.errorText}>{pdfError}</p>
                  <button
                    className={styles.retryBtn}
                    onClick={() => {
                      setViewMode('visual')
                      setTimeout(() => setViewMode('pdf'), 50)
                    }}
                    type="button"
                  >
                    Retry
                  </button>
                </div>
              ) : pdfUrl ? (
                <div
                  className={styles.pdfSheetWrapper}
                  style={{
                    width: `${pdfWidth}px`,
                  }}
                >
                  <iframe
                    className={styles.pdfIframe}
                    src={iframeSrc}
                    title="Exact PDF Preview"
                  />
                  {pdfLoading && (
                    <div className={styles.pdfLoadingOverlay}>
                      <div className={styles.spinner} />
                      <p>Loading {currentTemplateObj.name}…</p>
                    </div>
                  )}
                </div>
              ) : pdfLoading ? (
                <div className={styles.pdfState}>
                  <div className={styles.spinner} />
                  <p>Generating exact PDF preview…</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Floating Right Arrow for changing template */}
        <button
          aria-label={`Next template: ${nextTemplate.name}`}
          className={`${styles.floatingNavBtn} ${styles.floatingNavRight}`}
          onClick={handleNextTemplate}
          title={`Next template: ${nextTemplate.name}`}
          type="button"
        >
          <svg
            className={styles.floatingNavIcon}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className={styles.floatingNavTooltip}>{nextTemplate.name} →</span>
        </button>
      </div>
    </div>
  )
}
