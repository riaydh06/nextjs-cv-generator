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

import styles from './EditorialCv.module.css'

export function EditorialCv({ data }: { data: CvData }) {
  const contact = previewContact(data)
  const skills = previewSkills(data.skills)
  const projects = previewProjects(data.projects)

  return (
    <article className={styles.sheet}>
      <header className={styles.nameplate}>
        <div>
          <h1>{display(data.fullName, 'Your Name')}</h1>
          <p className={styles.title}>{display(data.title, 'Job Title')}</p>
        </div>
        {data.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className={styles.photo} src={data.photo} />
        ) : null}
      </header>
      <div className={styles.bar}>
        {contact.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {hasSummary(data) ? <p className={styles.lede}>{data.summary.trim()}</p> : null}
      <div className={styles.columns}>
        <div className={styles.wide}>
          {hasExperience(data) ? (
            <>
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
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
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
            </>
          ) : null}
        </div>
        <aside>
          {hasSkills(data) ? (
            <>
              <h2>Skills</h2>
              <div className={styles.tags}>
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <h2>Education</h2>
              {data.education.map((item) => {
                const preview = previewEducation(item)
                return (
                  <div className={styles.block} key={item.id}>
                    <h3>{preview.degree}</h3>
                    <p className={styles.meta}>{preview.school}</p>
                    <p className={styles.meta}>{preview.dates}</p>
                  </div>
                )
              })}
            </>
          ) : null}
        </aside>
      </div>
    </article>
  )
}
