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
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 48,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: '#1c1917',
  },
  header: {
    alignItems: 'center',
  },
  photo: {
    width: 64,
    height: 64,
    marginBottom: 8,
    objectFit: 'cover',
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 22,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title: {
    marginTop: 4,
    fontFamily: 'Times-Italic',
    fontSize: 12,
    color: '#44403c',
    textAlign: 'center',
  },
  contact: {
    marginTop: 6,
    fontSize: 9.5,
    color: '#44403c',
    textAlign: 'center',
  },
  rule: {
    marginTop: 14,
    marginBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1c1917',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    borderBottomWidth: 0.8,
    borderBottomColor: '#d6d3d1',
    paddingBottom: 3,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  heading: {
    fontFamily: 'Times-Bold',
    fontSize: 11.5,
  },
  meta: {
    marginTop: 2,
    color: '#44403c',
    fontSize: 10.5,
  },
  dates: {
    fontSize: 10,
    color: '#44403c',
  },
  bullet: {
    marginTop: 3,
    marginLeft: 10,
    fontSize: 10.5,
  },
  project: {
    marginBottom: 8,
  },
})

export function ClassicPdf({ data }: { data: CvData }) {
  const contact = previewContact(data).join('  ·  ')
  const skills = previewSkills(data.skills).join('  ·  ')
  const projects = previewProjects(data.projects)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.photo ? <Image src={data.photo} style={styles.photo} /> : null}
          <Text style={styles.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={styles.title}>{display(data.title, 'Job Title')}</Text>
          <Text style={styles.contact}>{contact}</Text>
        </View>
        <View style={styles.rule} />

        {hasSummary(data) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </View>
        ) : null}

        {hasExperience(data) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((item) => {
              const preview = previewExperience(item)
              return (
                <View key={item.id} wrap={false}>
                  <View style={styles.row}>
                    <Text style={styles.heading}>{preview.role}</Text>
                    <Text style={styles.dates}>{preview.dates}</Text>
                  </View>
                  <Text style={styles.meta}>{preview.company}</Text>
                  {preview.bullets.map((bullet) => (
                    <Text key={bullet} style={styles.bullet}>
                      • {bullet}
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
                <View key={item.id} wrap={false}>
                  <View style={styles.row}>
                    <Text style={styles.heading}>{preview.degree}</Text>
                    <Text style={styles.dates}>{preview.dates}</Text>
                  </View>
                  <Text style={styles.meta}>{preview.school}</Text>
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
              <View key={project.name} style={styles.project} wrap={false}>
                <View style={styles.row}>
                  <Text style={styles.heading}>{project.name}</Text>
                  {project.link ? (
                    <Link src={hrefFor(project.link)} style={styles.dates}>
                      {project.link}
                    </Link>
                  ) : null}
                </View>
                <Text style={styles.meta}>{project.description}</Text>
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
