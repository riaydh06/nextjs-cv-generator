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

export type CvSkin = { readonly [className: string]: string }

type CvSkinProps = {
  data: CvData
  styles: CvSkin
  layout?: 'stack' | 'stripe' | 'banner' | 'split'
  labels?: {
    summary?: string
    experience?: string
    education?: string
    skills?: string
    projects?: string
  }
}

function Photo({ className, src }: { className: string; src: string | null }) {
  if (!src) {
    return null
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" className={className} src={src} />
  )
}

function Stack({
  data,
  styles,
  labels,
  hideSkills = false,
}: {
  data: CvData
  styles: CvSkin
  labels: NonNullable<CvSkinProps['labels']>
  hideSkills?: boolean
}) {
  const skills = previewSkills(data.skills)
  const projects = previewProjects(data.projects)

  return (
    <>
      {hasSummary(data) ? (
        <section>
          <h2>{labels.summary}</h2>
          <p>{data.summary.trim()}</p>
        </section>
      ) : null}
      {hasExperience(data) ? (
        <section>
          <h2>{labels.experience}</h2>
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
          <h2>{labels.education}</h2>
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
      {!hideSkills && hasSkills(data) ? (
        <section>
          <h2>{labels.skills}</h2>
          {styles.tags ? (
            <div className={styles.tags}>
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          ) : (
            <p>{skills.join('  ·  ')}</p>
          )}
        </section>
      ) : null}
      {hasProjects(data) ? (
        <section>
          <h2>{labels.projects}</h2>
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
    </>
  )
}

export function CvSkinSheet({ data, styles, layout = 'stack', labels }: CvSkinProps) {
  const contact = previewContact(data)
  const copy = {
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    ...labels,
  }

  const identity = (
    <header className={styles.header}>
      <div>
        {styles.kicker ? <p className={styles.kicker}>Curriculum vitae</p> : null}
        <h1>{display(data.fullName, 'Your Name')}</h1>
        <p className={styles.title}>{display(data.title, 'Job Title')}</p>
        {styles.ribbon ? <div className={styles.ribbon} /> : null}
        <p className={styles.contact}>{contact.join('  ·  ')}</p>
      </div>
      <Photo className={styles.photo} src={data.photo} />
    </header>
  )

  if (layout === 'split' && styles.panel && styles.main) {
    const skills = previewSkills(data.skills)
    return (
      <article className={styles.sheet}>
        <aside className={styles.panel}>
          <Photo className={styles.photo} src={data.photo} />
          <h1>{display(data.fullName, 'Your Name')}</h1>
          <p className={styles.title}>{display(data.title, 'Job Title')}</p>
          {contact.map((item) => (
            <p className={styles.contact} key={item}>
              {item}
            </p>
          ))}
          {hasSkills(data) ? (
            <>
              <h2>{copy.skills}</h2>
              {skills.map((skill) => (
                <p key={skill}>{skill}</p>
              ))}
            </>
          ) : null}
        </aside>
        <div className={styles.main}>
          <Stack data={data} hideSkills labels={copy} styles={styles} />
        </div>
      </article>
    )
  }

  const inner = (
    <>
      {identity}
      <Stack data={data} labels={copy} styles={styles} />
    </>
  )

  if (layout === 'stripe' && styles.stripe && styles.content) {
    return (
      <article className={styles.sheet}>
        <div className={styles.stripe} />
        <div className={styles.content}>{inner}</div>
      </article>
    )
  }

  if (layout === 'banner' && styles.body) {
    return (
      <article className={styles.sheet}>
        {identity}
        <div className={styles.body}>
          <Stack data={data} labels={copy} styles={styles} />
        </div>
      </article>
    )
  }

  if (styles.inner) {
    return (
      <article className={styles.sheet}>
        <div className={styles.inner}>{inner}</div>
      </article>
    )
  }

  return <article className={styles.sheet}>{inner}</article>
}
