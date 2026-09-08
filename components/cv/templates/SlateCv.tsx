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

import styles from './SlateCv.module.css'

export function SlateCv({ data }: { data: CvData }) {
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
          <>
            <h2>Contact</h2>
            {contact.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <h2>Skills</h2>
            <ul className={styles.skillList}>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </>
        ) : null}
      </aside>
      <div className={styles.main}>
        <h1>{display(data.fullName, 'Your Name')}</h1>
        <p className={styles.title}>{display(data.title, 'Job Title')}</p>
        {hasSummary(data) ? (
          <section>
            <h2>Profile</h2>
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
