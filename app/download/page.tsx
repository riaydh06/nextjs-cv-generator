import { AppHeader } from '@/components/app/AppHeader'
import { CvDownload } from '@/components/cv/CvDownload'

export const metadata = {
  title: 'Choose Template & Download - CV Generator',
  description: 'Pick a template, review your resume preview, and export a PDF.',
}

export default function DownloadPage() {
  return (
    <>
      <AppHeader current="download" />
      <main className="flex-1 flex flex-col">
        <CvDownload />
      </main>
    </>
  )
}
