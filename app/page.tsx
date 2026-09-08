import { AppHeader } from '@/components/app/AppHeader'
import { CvEditor } from '@/components/cv/CvEditor'

export const metadata = {
  title: 'Edit Details - CV Generator',
  description: 'Fill in your CV details and create your resume locally.',
}

export default function HomePage() {
  return (
    <>
      <AppHeader current="edit" />
      <main className="flex-1 flex flex-col">
        <CvEditor />
      </main>
    </>
  )
}
