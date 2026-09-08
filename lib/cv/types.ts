export type { CvTemplateId } from './templates'

export type CvExperience = {
  id: string
  company: string
  role: string
  start: string
  end: string
  bullets: string
}

export type CvEducation = {
  id: string
  school: string
  degree: string
  start: string
  end: string
}

export type CvProject = {
  id: string
  name: string
  description: string
  link: string
}

export type CvData = {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  photo: string | null
  photoId?: number | null
  summary: string
  experience: CvExperience[]
  education: CvEducation[]
  skills: string
  projects: CvProject[]
}
