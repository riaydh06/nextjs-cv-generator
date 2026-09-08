import type { CvData, CvTemplateId } from '@/lib/cv/types'

export async function downloadCv(data: CvData, template: CvTemplateId): Promise<void> {
  const [{ pdf }, { getPdfDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./documents'),
  ])

  const blob = await pdf(getPdfDocument(template, data) as Parameters<typeof pdf>[0]).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const slug = fileSlug(data.fullName)

  link.href = url
  link.download = `${slug}-cv.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function fileSlug(fullName: string): string {
  const slug = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'cv'
}
