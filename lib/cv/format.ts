import type { CvData, CvEducation, CvExperience, CvProject } from './types'

export const SUMMARY_PLACEHOLDER =
  'A short professional summary highlighting your strengths, experience, and what you want next.'

export function hrefFor(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `https://${value}`
}

export function display(value: string, fallback: string): string {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

export function skillList(skills: string): string[] {
  return skills
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function bulletList(bullets: string): string[] {
  return bullets
    .split(/\n+/)
    .map((item) => item.trim().replace(/^[-•*]\s*/, ''))
    .filter(Boolean)
}

export function dateRange(start: string, end: string, fallback = '2019 – Present'): string {
  const from = start.trim()
  const to = end.trim()

  if (!from && !to) {
    return fallback
  }

  if (!from) {
    return to
  }

  return `${from} – ${to || 'Present'}`
}

export function isBlank(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0
}

export function hasSummary(data: CvData): boolean {
  return Boolean(data.summary && data.summary.trim().length > 0)
}

export function hasExperience(data: CvData): boolean {
  return Boolean(
    data.experience &&
      data.experience.some(
        (item) => !isBlank(item.role) || !isBlank(item.company) || !isBlank(item.bullets),
      ),
  )
}

export function hasEducation(data: CvData): boolean {
  return Boolean(
    data.education &&
      data.education.some((item) => !isBlank(item.degree) || !isBlank(item.school)),
  )
}

export function hasSkills(data: CvData): boolean {
  return Boolean(data.skills && skillList(data.skills).length > 0)
}

export function hasProjects(data: CvData): boolean {
  return Boolean(
    data.projects &&
      data.projects.some(
        (p) => !isBlank(p.name) || !isBlank(p.description) || !isBlank(p.link),
      ),
  )
}

export function previewContact(data: CvData): string[] {
  const items = [
    data.email?.trim(),
    data.phone?.trim(),
    data.location?.trim(),
    data.website?.trim(),
  ].filter(Boolean) as string[]

  if (items.length > 0) {
    return items
  }

  return ['you@email.com', '+1 555 0100', 'City, Country', 'linkedin.com/in/you']
}

export function previewSkills(skills: string): string[] {
  return skillList(skills)
}

export function previewExperience(item: CvExperience): {
  role: string
  company: string
  dates: string
  bullets: string[]
} {
  const empty = [item.company, item.role, item.start, item.end, item.bullets].every(isBlank)

  if (empty) {
    return {
      role: 'Role title',
      company: 'Company name',
      dates: '2019 – Present',
      bullets: ['Describe your impact in one or two short lines.'],
    }
  }

  return {
    role: display(item.role, 'Role title'),
    company: display(item.company, 'Company name'),
    dates: dateRange(item.start, item.end),
    bullets: bulletList(item.bullets),
  }
}

export function previewEducation(item: CvEducation): {
  degree: string
  school: string
  dates: string
} {
  const empty = [item.school, item.degree, item.start, item.end].every(isBlank)

  if (empty) {
    return {
      degree: 'Degree or certification',
      school: 'School or university',
      dates: '2015 – 2019',
    }
  }

  return {
    degree: display(item.degree, 'Degree or certification'),
    school: display(item.school, 'School or university'),
    dates: dateRange(item.start, item.end, '2015 – 2019'),
  }
}

export function previewProjects(projects: CvProject[]): Array<{
  name: string
  description: string
  link: string
}> {
  if (!projects || projects.length === 0) {
    return []
  }

  const valid = projects.filter(
    (project) => !isBlank(project.name) || !isBlank(project.description) || !isBlank(project.link),
  )

  return valid.map((project) => ({
    name: project.name.trim(),
    description: project.description.trim(),
    link: project.link.trim(),
  }))
}
