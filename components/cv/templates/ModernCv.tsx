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

import styles from './ModernCv.module.css'

export function ModernCv({ data }: { data: CvData }) {
  const contact = previewContact(data)
  const skills = previewSkills(data.skills)
  const projects = previewProjects(data.projects)

  return (
    <article className={styles.sheet}>
      <aside className={styles.sidebar}>
        {data.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className={styles.photo} src={data.photo} />
        ) : null}
        {contact.length > 0 ? (
          <div className={styles.sideBlock}>
            <h2 className={styles.sideTitle}>Contact</h2>
            {contact.map((item) => (
              <p className={styles.contactItem} key={item}>
                {item}
              </p>
            ))}
          </div>
        ) : null}
        {hasSkills(data) ? (
          <div className={styles.sideBlock}>
            <h2 className={styles.sideTitle}>Skills</h2>
            {skills.map((skill) => (
              <p className={styles.skillItem} key={skill}>
                {skill}
              </p>
            ))}
          </div>
        ) : null}
      </aside>

      <div className={styles.main}>
        <h1 className={styles.name}>{display(data.fullName, 'Your Name')}</h1>
        <p className={styles.title}>{display(data.title, 'Job Title')}</p>
        <hr className={styles.accent} />

        {hasSummary(data) ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <p className={styles.summary}>{data.summary.trim()}</p>
          </section>
        ) : null}

        {hasExperience(data) ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            {data.experience.map((item) => {
              const preview = previewExperience(item)
              return (
                <div key={item.id}>
                  <div className={styles.jobHeader}>
                    <h3 className={styles.role}>{preview.role}</h3>
                    <span className={styles.dates}>{preview.dates}</span>
                  </div>
                  <p className={styles.meta}>{preview.company}</p>
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
                <div key={item.id}>
                  <div className={styles.eduHeader}>
                    <h3 className={styles.degree}>{preview.degree}</h3>
                    <span className={styles.dates}>{preview.dates}</span>
                  </div>
                  <p className={styles.meta}>{preview.school}</p>
                </div>
              )
            })}
          </section>
        ) : null}

        {hasProjects(data) ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            {projects.map((project) => (
              <div className={styles.project} key={project.name}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p>
                  {project.description}
                  {project.link ? (
                    <>
                      {' '}
                      <a className={styles.link} href={project.link} rel="noreferrer">
                        {project.link}
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </article>
  )
}
