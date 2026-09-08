'use client'

import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { createId } from '@/lib/cv/emptyCv'
import type { CvData, CvEducation, CvExperience, CvProject } from '@/lib/cv/types'

import styles from './CvForm.module.css'

type CvFormProps = {
  data: CvData
  onChange: Dispatch<SetStateAction<CvData>>
  onPhotoFile?: (file: File) => Promise<void> | void
  photoBusy?: boolean
}

export function CvForm({ data, onChange, onPhotoFile, photoBusy }: CvFormProps) {
  const update = <K extends keyof CvData>(key: K, value: CvData[K]) => {
    onChange((prev) => ({ ...prev, [key]: value }))
  }

  const patchExperience = (id: string, patch: Partial<CvExperience>) => {
    onChange((prev) => ({
      ...prev,
      experience: prev.experience.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
    }))
  }

  const patchEducation = (id: string, patch: Partial<CvEducation>) => {
    onChange((prev) => ({
      ...prev,
      education: prev.education.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
    }))
  }

  const patchProject = (id: string, patch: Partial<CvProject>) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
    }))
  }

  const onPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) {
      return
    }
    void onPhotoFile?.(file)
  }

  const addExperience = () => {
    const item: CvExperience = {
      id: createId(),
      company: '',
      role: '',
      start: '',
      end: '',
      bullets: '',
    }
    onChange((prev) => ({ ...prev, experience: [...prev.experience, item] }))
  }

  const addEducation = () => {
    const item: CvEducation = {
      id: createId(),
      school: '',
      degree: '',
      start: '',
      end: '',
    }
    onChange((prev) => ({ ...prev, education: [...prev.education, item] }))
  }

  const addProject = () => {
    const item: CvProject = {
      id: createId(),
      name: '',
      description: '',
      link: '',
    }
    onChange((prev) => ({ ...prev, projects: [...prev.projects, item] }))
  }

  return (
    <div className={styles.form}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal</h2>
        <div className={styles.photoRow}>
          {data.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" className={styles.photoPreview} src={data.photo} />
          ) : (
            <div className={styles.photoPreview} />
          )}
          <div>
            <label className={styles.label} htmlFor="cv-photo">
              Photo (optional)
            </label>
            <input
              accept="image/*"
              className={styles.fileInput}
              disabled={photoBusy}
              id="cv-photo"
              onChange={onPhoto}
              type="file"
            />
            {data.photo ? (
              <div className={styles.actions}>
                <button
                  className={styles.ghost}
                  onClick={() => onChange((prev) => ({ ...prev, photo: null, photoId: null }))}
                  type="button"
                >
                  Remove photo
                </button>
              </div>
            ) : null}
            {photoBusy ? <p className={styles.hint}>Uploading photo…</p> : null}
          </div>
        </div>
        <div className={styles.grid}>
          <Field
            id="cv-full-name"
            label="Full name"
            onChange={(value) => update('fullName', value)}
            value={data.fullName}
          />
          <Field
            id="cv-job-title"
            label="Job title"
            onChange={(value) => update('title', value)}
            value={data.title}
          />
          <Field id="cv-email" label="Email" onChange={(value) => update('email', value)} value={data.email} />
          <Field id="cv-phone" label="Phone" onChange={(value) => update('phone', value)} value={data.phone} />
          <Field
            id="cv-location"
            label="Location"
            onChange={(value) => update('location', value)}
            value={data.location}
          />
          <Field
            id="cv-website"
            label="Website / LinkedIn"
            onChange={(value) => update('website', value)}
            value={data.website}
          />
          <TextArea
            className={styles.wide}
            id="cv-summary"
            label="Professional summary"
            onChange={(value) => update('summary', value)}
            value={data.summary}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <button className={styles.button} onClick={addExperience} type="button">
            Add experience
          </button>
        </div>
        {data.experience.map((item, index) => (
          <article className={styles.card} key={item.id}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Role {index + 1}</span>
              {data.experience.length > 1 ? (
                <button
                  className={styles.ghost}
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      experience: prev.experience.filter((entry) => entry.id !== item.id),
                    }))
                  }
                  type="button"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className={styles.grid}>
              <Field
                id={`${item.id}-role`}
                label="Role"
                onChange={(role) => patchExperience(item.id, { role })}
                value={item.role}
              />
              <Field
                id={`${item.id}-company`}
                label="Company"
                onChange={(company) => patchExperience(item.id, { company })}
                value={item.company}
              />
              <Field
                id={`${item.id}-start`}
                label="Start"
                onChange={(start) => patchExperience(item.id, { start })}
                value={item.start}
              />
              <Field
                id={`${item.id}-end`}
                label="End"
                onChange={(end) => patchExperience(item.id, { end })}
                value={item.end}
              />
              <TextArea
                className={styles.wide}
                hint="One achievement per line"
                id={`${item.id}-bullets`}
                label="Highlights"
                onChange={(bullets) => patchExperience(item.id, { bullets })}
                value={item.bullets}
              />
            </div>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <button className={styles.button} onClick={addEducation} type="button">
            Add education
          </button>
        </div>
        {data.education.map((item, index) => (
          <article className={styles.card} key={item.id}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>School {index + 1}</span>
              {data.education.length > 1 ? (
                <button
                  className={styles.ghost}
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      education: prev.education.filter((entry) => entry.id !== item.id),
                    }))
                  }
                  type="button"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className={styles.grid}>
              <Field
                id={`${item.id}-degree`}
                label="Degree"
                onChange={(degree) => patchEducation(item.id, { degree })}
                value={item.degree}
              />
              <Field
                id={`${item.id}-school`}
                label="School"
                onChange={(school) => patchEducation(item.id, { school })}
                value={item.school}
              />
              <Field
                id={`${item.id}-start`}
                label="Start"
                onChange={(start) => patchEducation(item.id, { start })}
                value={item.start}
              />
              <Field
                id={`${item.id}-end`}
                label="End"
                onChange={(end) => patchEducation(item.id, { end })}
                value={item.end}
              />
            </div>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <TextArea
          hint="Separate with commas"
          id="cv-skills"
          label="Skills"
          onChange={(skills) => update('skills', skills)}
          value={data.skills}
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <button className={styles.button} onClick={addProject} type="button">
            Add project
          </button>
        </div>
        {data.projects.length === 0 ? (
          <p className={styles.hint}>Optional. Add a project if you want it on the CV.</p>
        ) : null}
        {data.projects.map((item, index) => (
          <article className={styles.card} key={item.id}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Project {index + 1}</span>
              <button
                className={styles.ghost}
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    projects: prev.projects.filter((entry) => entry.id !== item.id),
                  }))
                }
                type="button"
              >
                Remove
              </button>
            </div>
            <div className={styles.grid}>
              <Field
                id={`${item.id}-name`}
                label="Name"
                onChange={(name) => patchProject(item.id, { name })}
                value={item.name}
              />
              <Field
                id={`${item.id}-link`}
                label="Link"
                onChange={(link) => patchProject(item.id, { link })}
                value={item.link}
              />
              <TextArea
                className={styles.wide}
                id={`${item.id}-description`}
                label="Description"
                onChange={(description) => patchProject(item.id, { description })}
                value={item.description}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function Field({
  id,
  label,
  onChange,
  value,
}: {
  id: string
  label: string
  onChange: (value: string) => void
  value: string
}) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  )
}

function TextArea({
  className,
  hint,
  id,
  label,
  onChange,
  value,
}: {
  className?: string
  hint?: string
  id: string
  label: string
  onChange: (value: string) => void
  value: string
}) {
  return (
    <label className={`${styles.field} ${className ?? ''}`} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <textarea
        className={styles.textarea}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </label>
  )
}
