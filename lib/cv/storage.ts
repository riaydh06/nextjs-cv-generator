import { emptyCv, sampleCv } from './emptyCv'
import { isCvTemplateId } from './templates'
import type { CvData, CvTemplateId } from './types'

export const STORAGE_KEY_DATA = 'cv_generator_data'
export const STORAGE_KEY_TEMPLATE = 'cv_generator_template'

export function loadCvData(): CvData {
  if (typeof window === 'undefined') {
    return sampleCv
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_DATA)
    if (!raw) {
      return sampleCv
    }
    const parsed = JSON.parse(raw) as Partial<CvData>
    return {
      fullName: parsed.fullName ?? '',
      title: parsed.title ?? '',
      email: parsed.email ?? '',
      phone: parsed.phone ?? '',
      location: parsed.location ?? '',
      website: parsed.website ?? '',
      photo: parsed.photo ?? null,
      photoId: parsed.photoId ?? null,
      summary: parsed.summary ?? '',
      experience: Array.isArray(parsed.experience) && parsed.experience.length > 0
        ? parsed.experience
        : emptyCv.experience,
      education: Array.isArray(parsed.education) && parsed.education.length > 0
        ? parsed.education
        : emptyCv.education,
      skills: parsed.skills ?? '',
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
    }
  } catch (error) {
    console.error('Failed to read CV data from localStorage:', error)
    return sampleCv
  }
}

export function saveCvData(data: CvData): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save CV data to localStorage:', error)
  }
}

export function loadCvTemplate(): CvTemplateId {
  if (typeof window === 'undefined') {
    return 'classic'
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_TEMPLATE)
    if (raw && isCvTemplateId(raw)) {
      return raw
    }
  } catch (error) {
    console.error('Failed to read CV template from localStorage:', error)
  }

  return 'classic'
}

export function saveCvTemplate(template: CvTemplateId): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY_TEMPLATE, template)
  } catch (error) {
    console.error('Failed to save CV template to localStorage:', error)
  }
}

export function resetCvData(): CvData {
  saveCvData(emptyCv)
  return emptyCv
}

export function resetToSampleCv(): CvData {
  saveCvData(sampleCv)
  return sampleCv
}
