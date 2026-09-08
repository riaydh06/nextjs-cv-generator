import {
  display,
  hasEducation,
  hasExperience,
  hasProjects,
  hasSkills,
  hasSummary,
  previewContact,
  previewEducation,
  previewExperience,
  previewProjects,
  previewSkills,
} from '@/lib/cv/format'
import type { CvData } from '@/lib/cv/types'

import styles from './MinimalCv.module.css'

export function MinimalCv({ data }: { data: CvData }) {
  const contact = previewContact(data)
  const skills = previewSkills(data.skills).join('  /  ')
  const projects = previewProjects(data.projects)

  return (
    <article className={styles.sheet}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <h1 className={styles.name}>{display(data.fullName, 'Your Name')}</h1>
          <p className={styles.title}>{display(data.title, 'Job Title')}</p>
          <ul className={styles.contact}>
            {contact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {data.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className={styles.photo} src={data.photo} />
        ) : null}
      </header>

      {hasSummary(data) ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.summary}>{data.summary.trim()}</p>
        </section>
      ) : null}

      {hasExperience(data) ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {data.experience.map((item) => {
            const preview = previewExperience(item)
            return (
              <div className={styles.job} key={item.id}>
                <h3 className={styles.role}>{preview.role}</h3>
                <p className={styles.meta}>{preview.company}</p>
                <p className={styles.dates}>{preview.dates}</p>
                {preview.bullets.length > 0 ? (
                  <ul className={styles.bullets}>
                    {preview.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )
          })}
        </section>
      ) : null}

      {hasEducation(data) ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {data.education.map((item) => {
            const preview = previewEducation(item)
            return (
              <div className={styles.edu} key={item.id}>
                <h3 className={styles.degree}>{preview.degree}</h3>
                <p className={styles.meta}>{preview.school}</p>
                <p className={styles.dates}>{preview.dates}</p>
              </div>
            )
          })}
        </section>
      ) : null}

      {hasSkills(data) ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className={styles.skills}>{skills}</p>
        </section>
      ) : null}

      {hasProjects(data) ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          {projects.map((project) => (
            <div className={styles.project} key={project.name}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <p>{project.description}</p>
              {project.link ? (
                <a className={styles.link} href={project.link} rel="noreferrer">
                  {project.link}
                </a>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}
    </article>
  )
}
