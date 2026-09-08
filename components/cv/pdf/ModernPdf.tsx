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
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 10.5,
    color: '#1c1917',
    paddingTop: 36,
    paddingBottom: 36,
  },
  sidebarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '32%',
    backgroundColor: '#1f4d3a',
  },
  sidebar: {
    width: '32%',
    color: '#f4f1ea',
    paddingHorizontal: 22,
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    objectFit: 'cover',
    alignSelf: 'center',
    marginBottom: 22,
  },
  sideTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: '#c5ddd0',
    marginBottom: 8,
  },
  sideBlock: {
    marginBottom: 22,
  },
  contactItem: {
    marginBottom: 6,
    fontSize: 9.5,
  },
  skillItem: {
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 0.6,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    fontSize: 9.5,
  },
  main: {
    width: '68%',
    paddingHorizontal: 28,
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: '#16382b',
  },
  title: {
    marginTop: 6,
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#1f4d3a',
  },
  accent: {
    width: 40,
    marginTop: 12,
    marginBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#1f4d3a',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#1f4d3a',
    marginBottom: 8,
  },
  summary: {
    color: '#3f3f46',
    lineHeight: 1.4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  meta: {
    marginTop: 2,
    color: '#57534e',
    fontSize: 10,
  },
  dates: {
    color: '#1f4d3a',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
  },
  bullet: {
    marginTop: 3,
    marginLeft: 8,
    color: '#3f3f46',
  },
  project: {
    marginBottom: 8,
  },
  link: {
    color: '#1f4d3a',
    fontSize: 9.5,
  },
})

export function ModernPdf({ data }: { data: CvData }) {
  const contact = previewContact(data)
  const skills = previewSkills(data.skills)
  const projects = previewProjects(data.projects)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View fixed style={styles.sidebarBg} />
        <View style={styles.sidebar}>
          {data.photo ? <Image src={data.photo} style={styles.photo} /> : null}
          {contact.length > 0 ? (
            <View style={styles.sideBlock}>
              <Text style={styles.sideTitle}>Contact</Text>
              {contact.map((item) => (
                <Text key={item} style={styles.contactItem}>
                  {item}
                </Text>
              ))}
            </View>
          ) : null}
          {hasSkills(data) ? (
            <View style={styles.sideBlock}>
              <Text style={styles.sideTitle}>Skills</Text>
              {skills.map((skill) => (
                <Text key={skill} style={styles.skillItem}>
                  {skill}
                </Text>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.main}>
          <Text style={styles.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={styles.title}>{display(data.title, 'Job Title')}</Text>
          <View style={styles.accent} />

          {hasSummary(data) ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summary}>{data.summary.trim()}</Text>
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

          {hasProjects(data) ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project) => (
                <View key={project.name} style={styles.project} wrap={false}>
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
        </View>
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
