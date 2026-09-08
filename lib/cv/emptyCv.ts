import type { CvData } from './types'

export const emptyCv: CvData = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  photo: null,
  photoId: null,
  summary: '',
  experience: [
    {
      id: 'exp-1',
      company: '',
      role: '',
      start: '',
      end: '',
      bullets: '',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: '',
      degree: '',
      start: '',
      end: '',
    },
  ],
  skills: '',
  projects: [],
}

export const sampleCv: CvData = {
  fullName: 'Alex Morgan',
  title: 'Senior Software Engineer',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  website: 'https://github.com/alexmorgan',
  photo: null,
  photoId: null,
  summary:
    'Results-driven software engineer with 6+ years of experience architecting scalable web applications, optimizing performance, and mentoring engineering teams. Passionate about clean code, developer experience, and modern web technologies.',
  experience: [
    {
      id: 'exp-1',
      company: 'TechFlow Solutions',
      role: 'Senior Full Stack Engineer',
      start: '2021',
      end: 'Present',
      bullets:
        'Led frontend architecture migration to Next.js and TypeScript, reducing initial page load times by 42%.\nMentored 6 junior and mid-level developers through structured code reviews and bi-weekly design sessions.\nDesigned and deployed high-throughput microservices handling over 5M daily requests with 99.98% uptime.',
    },
    {
      id: 'exp-2',
      company: 'Apex Digital Labs',
      role: 'Software Engineer',
      start: '2018',
      end: '2021',
      bullets:
        'Developed interactive dashboards and real-time analytics components using React and D3.\nIntegrated secure REST and GraphQL APIs with automated end-to-end test suites.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      start: '2014',
      end: '2018',
    },
  ],
  skills:
    'TypeScript, React, Next.js, Node.js, Tailwind CSS, PostgreSQL, Docker, Git, GraphQL, REST APIs, CI/CD',
  projects: [
    {
      id: 'proj-1',
      name: 'OpenResume Builder',
      description:
        'A browser-based resume and CV design tool supporting instant PDF export and custom themes.',
      link: 'https://github.com/example/openresume',
    },
  ],
}

export function createId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
