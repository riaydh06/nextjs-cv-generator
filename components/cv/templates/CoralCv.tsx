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

import styles from './CoralCv.module.css'

export function CoralCv({ data }: { data: CvData }) {
  const contact = previewContact(data)
  const skills = previewSkills(data.skills)
  const projects = previewProjects(data.projects)

  return (
    <article className={styles.sheet}>
      <div className={styles.stripe} />
      <div className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>{display(data.fullName, 'Your Name')}</h1>
            <p className={styles.title}>{display(data.title, 'Job Title')}</p>
            <p className={styles.contact}>{contact.join('  ·  ')}</p>
          </div>
          {data.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" className={styles.photo} src={data.photo} />
          ) : null}
        </header>

        {hasSummary(data) ? (
          <section>
            <h2>About</h2>
            <p>{data.summary.trim()}</p>
          </section>
        ) : null}
        {hasExperience(data) ? (
          <section>
            <h2>Experience</h2>
            {data.experience.map((item) => {
              const preview = previewExperience(item)
              return (
                <div className={styles.block} key={item.id}>
                  <div className={styles.row}>
                    <h3>{preview.role}</h3>
                    <span>{preview.dates}</span>
                  </div>
                  <p className={styles.meta}>{preview.company}</p>
                  <ul>
                    {preview.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </section>
        ) : null}
        {hasEducation(data) ? (
          <section>
            <h2>Education</h2>
            {data.education.map((item) => {
              const preview = previewEducation(item)
              return (
                <div className={styles.block} key={item.id}>
                  <div className={styles.row}>
                    <h3>{preview.degree}</h3>
                    <span>{preview.dates}</span>
                  </div>
                  <p className={styles.meta}>{preview.school}</p>
                </div>
              )
            })}
          </section>
        ) : null}
        {hasSkills(data) ? (
          <section>
            <h2>Skills</h2>
            <div className={styles.tags}>
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>
        ) : null}
        {hasProjects(data) ? (
          <section>
            <h2>Projects</h2>
            {projects.map((project) => (
              <div className={styles.block} key={project.name}>
                <h3>{project.name}</h3>
                <p className={styles.meta}>{project.description}</p>
                {project.link ? (
                  <a href={project.link} rel="noreferrer">
                    {project.link}
                  </a>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </article>
  )
}
