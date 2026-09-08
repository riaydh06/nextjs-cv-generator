import { Document, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

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

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 54,
    fontFamily: 'Helvetica',
    fontSize: 10.5,
    color: '#18181b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
    marginBottom: 28,
  },
  identity: {
    flexGrow: 1,
  },
  photo: {
    width: 54,
    height: 54,
    objectFit: 'cover',
  },
  name: {
    fontSize: 26,
    letterSpacing: -0.4,
  },
  title: {
    marginTop: 6,
    fontSize: 11,
    color: '#71717a',
  },
  contact: {
    marginTop: 10,
    fontSize: 9.5,
    color: '#52525b',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#a1a1aa',
    marginBottom: 8,
  },
  summary: {
    maxWidth: 420,
    lineHeight: 1.5,
  },
  block: {
    marginBottom: 12,
  },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  meta: {
    marginTop: 2,
    color: '#71717a',
  },
  dates: {
    marginTop: 2,
    fontSize: 9,
    color: '#a1a1aa',
  },
  bullet: {
    marginTop: 3,
    color: '#3f3f46',
  },
  link: {
    marginTop: 3,
    color: '#18181b',
    fontSize: 9.5,
  },
})

export function MinimalPdf({ data }: { data: CvData }) {
  const contact = previewContact(data).join('\n')
  const skills = previewSkills(data.skills).join('  /  ')
  const projects = previewProjects(data.projects)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.identity}>
            <Text style={styles.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={styles.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={styles.contact}>{contact}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={styles.photo} /> : null}
        </View>

        {hasSummary(data) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.summary}>{data.summary.trim()}</Text>
          </View>
        ) : null}

        {hasExperience(data) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((item) => {
              const preview = previewExperience(item)
              return (
                <View key={item.id} style={styles.block} wrap={false}>
                  <Text style={styles.heading}>{preview.role}</Text>
                  <Text style={styles.meta}>{preview.company}</Text>
                  <Text style={styles.dates}>{preview.dates}</Text>
                  {preview.bullets.map((bullet) => (
                    <Text key={bullet} style={styles.bullet}>
                      {bullet}
                    </Text>
                  ))}
                </View>
              )
            })}
          </View>
        ) : null}

        {hasEducation(data) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((item) => {
              const preview = previewEducation(item)
              return (
                <View key={item.id} style={styles.block} wrap={false}>
                  <Text style={styles.heading}>{preview.degree}</Text>
                  <Text style={styles.meta}>{preview.school}</Text>
                  <Text style={styles.dates}>{preview.dates}</Text>
                </View>
              )
            })}
          </View>
        ) : null}

        {hasSkills(data) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text>{skills}</Text>
          </View>
        ) : null}

        {hasProjects(data) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project) => (
              <View key={project.name} style={styles.block} wrap={false}>
                <Text style={styles.heading}>{project.name}</Text>
                <Text style={styles.meta}>{project.description}</Text>
                {project.link ? (
                  <Link src={hrefFor(project.link)} style={styles.link}>
                    {project.link}
                  </Link>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  )
}

function hrefFor(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value
  }
  return `https://${value}`
}
