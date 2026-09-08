import {
  Circle,
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer'

import {
  display,
  hasEducation,
  hasExperience,
  hasProjects,
  hasSkills,
  hasSummary,
  hrefFor,
  previewContact,
  previewEducation,
  previewExperience,
  previewProjects,
  previewSkills,
} from '@/lib/cv/format'
import type { CvData } from '@/lib/cv/types'

export type PdfStyle = ReturnType<typeof StyleSheet.create>[string]

export function Jobs({
  data,
  heading,
  dates,
  meta,
  bullet,
}: {
  data: CvData
  heading: PdfStyle
  dates: PdfStyle
  meta: PdfStyle
  bullet: PdfStyle
}) {
  return data.experience.map((item) => {
    const preview = previewExperience(item)
    return (
      <View key={item.id} style={{ marginBottom: 8 }} wrap={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          <Text style={heading}>{preview.role}</Text>
          <Text style={dates}>{preview.dates}</Text>
        </View>
        <Text style={meta}>{preview.company}</Text>
        {preview.bullets.map((line) => (
          <Text key={line} style={bullet}>
            • {line}
          </Text>
        ))}
      </View>
    )
  })
}

export function Schools({
  data,
  heading,
  dates,
  meta,
}: {
  data: CvData
  heading: PdfStyle
  dates: PdfStyle
  meta: PdfStyle
}) {
  return data.education.map((item) => {
    const preview = previewEducation(item)
    return (
      <View key={item.id} style={{ marginBottom: 8 }} wrap={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          <Text style={heading}>{preview.degree}</Text>
          <Text style={dates}>{preview.dates}</Text>
        </View>
        <Text style={meta}>{preview.school}</Text>
      </View>
    )
  })
}

export function Projects({
  data,
  heading,
  meta,
  link,
}: {
  data: CvData
  heading: PdfStyle
  meta: PdfStyle
  link: PdfStyle
}) {
  return previewProjects(data.projects).map((project) => (
    <View key={project.name} style={{ marginBottom: 8 }} wrap={false}>
      <Text style={heading}>{project.name}</Text>
      <Text style={meta}>{project.description}</Text>
      {project.link ? (
        <Link src={hrefFor(project.link)} style={link}>
          {project.link}
        </Link>
      ) : null}
    </View>
  ))
}

export function SkillTags({
  skills,
  tags,
  tag,
  text,
}: {
  skills: string[]
  tags: PdfStyle
  tag: PdfStyle
  text: PdfStyle
}) {
  return (
    <View style={tags}>
      {skills.map((skill) => (
        <View key={skill} style={tag}>
          <Text style={text}>{skill}</Text>
        </View>
      ))}
    </View>
  )
}

const elegant = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 11, color: '#1e293b', backgroundColor: '#faf7f2' },
  name: { fontFamily: 'Times-Bold', fontSize: 24, color: '#1e3a5f', textAlign: 'center' },
  title: { marginTop: 6, fontFamily: 'Times-Italic', fontSize: 12, color: '#5c6b80', textAlign: 'center' },
  rule: { width: 56, marginTop: 10, marginBottom: 8, alignSelf: 'center', borderBottomWidth: 2, borderBottomColor: '#c4a35a' },
  contact: { textAlign: 'center', fontSize: 9.5, color: '#5c6b80', marginBottom: 16 },
  photo: { width: 64, height: 64, borderRadius: 32, objectFit: 'cover', alignSelf: 'center', marginBottom: 8 },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase', color: '#1e3a5f', borderBottomWidth: 1, borderBottomColor: '#c4a35a', paddingBottom: 3, marginBottom: 8, marginTop: 10 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11, color: '#1e3a5f' },
  dates: { fontSize: 9.5, color: '#5c6b80' },
  meta: { marginTop: 2, color: '#5c6b80', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#1e3a5f', fontSize: 9.5 },
})

export function ElegantPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={elegant.page}>
        {data.photo ? <Image src={data.photo} style={elegant.photo} /> : null}
        <Text style={elegant.name}>{display(data.fullName, 'Your Name')}</Text>
        <Text style={elegant.title}>{display(data.title, 'Job Title')}</Text>
        <View style={elegant.rule} />
        <Text style={elegant.contact}>{previewContact(data).join('  ·  ')}</Text>
        {hasSummary(data) ? (
          <>
            <Text style={elegant.h2}>Profile</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={elegant.h2}>Experience</Text>
            <Jobs bullet={elegant.bullet} data={data} dates={elegant.dates} heading={elegant.heading} meta={elegant.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={elegant.h2}>Education</Text>
            <Schools data={data} dates={elegant.dates} heading={elegant.heading} meta={elegant.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={elegant.h2}>Skills</Text>
            <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={elegant.h2}>Projects</Text>
            <Projects data={data} heading={elegant.heading} link={elegant.link} meta={elegant.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const bold = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Helvetica', fontSize: 10.5, color: '#111' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 8, borderBottomColor: '#111', paddingBottom: 12, marginBottom: 8 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 26, textTransform: 'uppercase' },
  title: { marginTop: 6, fontFamily: 'Helvetica-Bold', fontSize: 12 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  contact: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, marginBottom: 14 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, borderLeftWidth: 8, borderLeftColor: '#111', paddingLeft: 8, marginTop: 12, marginBottom: 8 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontFamily: 'Helvetica-Bold', fontSize: 9.5 },
  meta: { marginTop: 2, color: '#444' },
  bullet: { marginTop: 2, marginLeft: 8 },
  link: { color: '#111', fontSize: 9.5 },
})

export function BoldPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={bold.page}>
        <View style={bold.header}>
          <View>
            <Text style={bold.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={bold.title}>{display(data.title, 'Job Title')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={bold.photo} /> : null}
        </View>
        <Text style={bold.contact}>{previewContact(data).join('  /  ')}</Text>
        {hasSummary(data) ? (
          <>
            <Text style={bold.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={bold.h2}>Experience</Text>
            <Jobs bullet={bold.bullet} data={data} dates={bold.dates} heading={bold.heading} meta={bold.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={bold.h2}>Education</Text>
            <Schools data={data} dates={bold.dates} heading={bold.heading} meta={bold.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={bold.h2}>Skills</Text>
            <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={bold.h2}>Projects</Text>
            <Projects data={data} heading={bold.heading} link={bold.link} meta={bold.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const slate = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#0f172a', paddingTop: 32, paddingBottom: 32 },
  sidebarBg: { position: 'absolute', top: 0, left: 0, bottom: 0, width: '30%', backgroundColor: '#334155' },
  sidebar: { width: '30%', color: '#e2e8f0', paddingHorizontal: 24 },
  photo: { width: 78, height: 78, objectFit: 'cover', alignSelf: 'center', marginBottom: 16 },
  sideTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#94a3b8', marginTop: 14, marginBottom: 6 },
  sideItem: { marginBottom: 6, fontSize: 9.5 },
  main: { width: '70%', paddingHorizontal: 28 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22 },
  title: { marginTop: 4, marginBottom: 14, color: '#475569', fontFamily: 'Helvetica-Bold' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#334155', borderBottomWidth: 2, borderBottomColor: '#cbd5e1', paddingBottom: 3, marginBottom: 8, marginTop: 10 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9, color: '#334155' },
  meta: { marginTop: 2, color: '#64748b', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#334155', fontSize: 9.5 },
})

export function SlatePdf({ data }: { data: CvData }) {
  const contact = previewContact(data)
  return (
    <Document>
      <Page size="A4" style={slate.page}>
        <View fixed style={slate.sidebarBg} />
        <View style={slate.sidebar}>
          {data.photo ? <Image src={data.photo} style={slate.photo} /> : null}
          {contact.length > 0 ? (
            <>
              <Text style={slate.sideTitle}>Contact</Text>
              {contact.map((item) => (
                <Text key={item} style={slate.sideItem}>
                  {item}
                </Text>
              ))}
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={slate.sideTitle}>Skills</Text>
              {previewSkills(data.skills).map((skill) => (
                <Text key={skill} style={slate.sideItem}>
                  {skill}
                </Text>
              ))}
            </>
          ) : null}
        </View>
        <View style={slate.main}>
          <Text style={slate.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={slate.title}>{display(data.title, 'Job Title')}</Text>
          {hasSummary(data) ? (
            <>
              <Text style={slate.h2}>Profile</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={slate.h2}>Experience</Text>
              <Jobs bullet={slate.bullet} data={data} dates={slate.dates} heading={slate.heading} meta={slate.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={slate.h2}>Education</Text>
              <Schools data={data} dates={slate.dates} heading={slate.heading} meta={slate.meta} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={slate.h2}>Projects</Text>
              <Projects data={data} heading={slate.heading} link={slate.link} meta={slate.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const timeline = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Helvetica', fontSize: 10.5, color: '#1f2937' },
  header: { flexDirection: 'row', gap: 14, alignItems: 'center', marginBottom: 12 },
  photo: { width: 56, height: 56, borderRadius: 28, objectFit: 'cover' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 20 },
  title: { marginTop: 3, color: '#2563eb', fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 4, color: '#6b7280', fontSize: 9.5 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#2563eb', marginTop: 12, marginBottom: 8 },
  timeline: { borderLeftWidth: 2, borderLeftColor: '#bfdbfe', marginLeft: 6, paddingLeft: 18, marginBottom: 8 },
  item: { position: 'relative', marginBottom: 10 },
  dot: { position: 'absolute', left: -24, top: 0, width: 10, height: 10 },
  dates: { color: '#2563eb', fontFamily: 'Helvetica-Bold', fontSize: 9 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  meta: { marginTop: 2, color: '#6b7280', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#2563eb', fontSize: 9.5 },
})

function TimelineDot() {
  return (
    <Svg style={timeline.dot} viewBox="0 0 10 10">
      <Circle cx="5" cy="5" fill="#dbeafe" r="5" />
      <Circle cx="5" cy="5" fill="#2563eb" r="2.8" />
    </Svg>
  )
}

export function TimelinePdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={timeline.page}>
        <View style={timeline.header}>
          {data.photo ? <Image src={data.photo} style={timeline.photo} /> : null}
          <View>
            <Text style={timeline.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={timeline.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={timeline.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
        </View>
        {hasSummary(data) ? (
          <>
            <Text style={timeline.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={timeline.h2}>Experience</Text>
            <View style={timeline.timeline}>
              {data.experience.map((item) => {
                const preview = previewExperience(item)
                return (
                  <View key={item.id} style={timeline.item} wrap={false}>
                    <TimelineDot />
                    <Text style={timeline.dates}>{preview.dates}</Text>
                    <Text style={timeline.heading}>{preview.role}</Text>
                    <Text style={timeline.meta}>{preview.company}</Text>
                    {preview.bullets.map((line) => (
                      <Text key={line} style={timeline.bullet}>
                        • {line}
                      </Text>
                    ))}
                  </View>
                )
              })}
            </View>
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={timeline.h2}>Education</Text>
            <View style={timeline.timeline}>
              {data.education.map((item) => {
                const preview = previewEducation(item)
                return (
                  <View key={item.id} style={timeline.item} wrap={false}>
                    <TimelineDot />
                    <Text style={timeline.dates}>{preview.dates}</Text>
                    <Text style={timeline.heading}>{preview.degree}</Text>
                    <Text style={timeline.meta}>{preview.school}</Text>
                  </View>
                )
              })}
            </View>
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={timeline.h2}>Skills</Text>
            <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={timeline.h2}>Projects</Text>
            <Projects data={data} heading={timeline.heading} link={timeline.link} meta={timeline.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const executive = StyleSheet.create({
  page: { fontFamily: 'Times-Roman', fontSize: 11, color: '#111827', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#0f172a', color: '#f8fafc', marginTop: -28, paddingTop: 28, paddingBottom: 28, paddingHorizontal: 36, flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#f8fafc' },
  title: { marginTop: 6, color: '#cbd5e1' },
  contact: { marginTop: 6, fontSize: 9.5, color: '#94a3b8' },
  photo: { width: 68, height: 68, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#cbd5e1', paddingBottom: 3, marginBottom: 8, marginTop: 10 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#4b5563' },
  meta: { marginTop: 2, color: '#4b5563', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#0f172a', fontSize: 9.5 },
})

export function ExecutivePdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={executive.page}>
        <View style={executive.banner}>
          <View>
            <Text style={executive.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={executive.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={executive.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={executive.photo} /> : null}
        </View>
        <View style={executive.body}>
          {hasSummary(data) ? (
            <>
              <Text style={executive.h2}>Professional summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={executive.h2}>Experience</Text>
              <Jobs bullet={executive.bullet} data={data} dates={executive.dates} heading={executive.heading} meta={executive.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={executive.h2}>Education</Text>
              <Schools data={data} dates={executive.dates} heading={executive.heading} meta={executive.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={executive.h2}>Skills</Text>
              <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={executive.h2}>Projects</Text>
              <Projects data={data} heading={executive.heading} link={executive.link} meta={executive.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const coral = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#3d2c29', backgroundColor: '#fffaf7', paddingTop: 32, paddingBottom: 32 },
  stripe: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 10, backgroundColor: '#e07a5f' },
  content: { flex: 1, paddingHorizontal: 32, marginLeft: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22 },
  title: { marginTop: 4, color: '#e07a5f', fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 6, color: '#7a6a66', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#e07a5f', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#7a6a66' },
  meta: { marginTop: 2, color: '#7a6a66', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#e07a5f', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#fbeee8', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#c95c3f', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function CoralPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={coral.page}>
        <View fixed style={coral.stripe} />
        <View style={coral.content}>
          <View style={coral.header}>
            <View>
              <Text style={coral.name}>{display(data.fullName, 'Your Name')}</Text>
              <Text style={coral.title}>{display(data.title, 'Job Title')}</Text>
              <Text style={coral.contact}>{previewContact(data).join('  ·  ')}</Text>
            </View>
            {data.photo ? <Image src={data.photo} style={coral.photo} /> : null}
          </View>
          {hasSummary(data) ? (
            <>
              <Text style={coral.h2}>About</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={coral.h2}>Experience</Text>
              <Jobs bullet={coral.bullet} data={data} dates={coral.dates} heading={coral.heading} meta={coral.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={coral.h2}>Education</Text>
              <Schools data={data} dates={coral.dates} heading={coral.heading} meta={coral.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={coral.h2}>Skills</Text>
              <SkillTags skills={previewSkills(data.skills)} tag={coral.tag} tags={coral.tags} text={coral.tagText} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={coral.h2}>Projects</Text>
              <Projects data={data} heading={coral.heading} link={coral.link} meta={coral.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const compact = StyleSheet.create({
  page: { padding: 28, fontFamily: 'Helvetica', fontSize: 9.5, color: '#1a1a1a' },
  header: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 8 },
  photo: { width: 42, height: 42, objectFit: 'cover' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 18 },
  title: { marginTop: 2, fontFamily: 'Helvetica-Bold', color: '#444' },
  contact: { marginTop: 3, color: '#555', fontSize: 9 },
  columns: { flexDirection: 'row', gap: 16, marginTop: 10 },
  left: { width: '58%' },
  right: { width: '42%' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 2, marginBottom: 6, marginTop: 8 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  dates: { fontSize: 8.5, color: '#555' },
  meta: { marginTop: 1, color: '#555', fontSize: 9 },
  bullet: { marginTop: 1, marginLeft: 8, fontSize: 9 },
  link: { color: '#111', fontSize: 8.5 },
  skillItem: { fontSize: 8.5, color: '#374151', marginBottom: 2 },
})

export function CompactPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={compact.page}>
        <View style={compact.header}>
          {data.photo ? <Image src={data.photo} style={compact.photo} /> : null}
          <View>
            <Text style={compact.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={compact.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={compact.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
        </View>
        {hasSummary(data) ? <Text>{data.summary.trim()}</Text> : null}
        <View style={compact.columns}>
          <View style={compact.left}>
            {hasExperience(data) ? (
              <>
                <Text style={compact.h2}>Experience</Text>
                <Jobs bullet={compact.bullet} data={data} dates={compact.dates} heading={compact.heading} meta={compact.meta} />
              </>
            ) : null}
          </View>
          <View style={compact.right}>
            {hasEducation(data) ? (
              <>
                <Text style={compact.h2}>Education</Text>
                <Schools data={data} dates={compact.dates} heading={compact.heading} meta={compact.meta} />
              </>
            ) : null}
            {hasSkills(data) ? (
              <>
                <Text style={compact.h2}>Skills</Text>
                {previewSkills(data.skills).map((skill) => (
                  <Text key={skill} style={compact.skillItem}>
                    • {skill}
                  </Text>
                ))}
              </>
            ) : null}
            {hasProjects(data) ? (
              <>
                <Text style={compact.h2}>Projects</Text>
                <Projects data={data} heading={compact.heading} link={compact.link} meta={compact.meta} />
              </>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  )
}

const academic = StyleSheet.create({
  page: { paddingTop: 42, paddingBottom: 42, paddingHorizontal: 54, fontFamily: 'Times-Roman', fontSize: 11, color: '#222' },
  kicker: { textAlign: 'center', fontSize: 9, letterSpacing: 2.4, textTransform: 'uppercase', color: '#666', marginBottom: 8 },
  photo: { width: 52, height: 52, objectFit: 'cover', alignSelf: 'center', marginBottom: 8 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, textAlign: 'center' },
  title: { marginTop: 6, fontFamily: 'Times-Italic', textAlign: 'center', color: '#444' },
  contact: { marginTop: 8, marginBottom: 16, textAlign: 'center', fontSize: 10, color: '#555' },
  h2: { fontFamily: 'Times-Bold', fontSize: 11, textAlign: 'center', letterSpacing: 1.2, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#222', paddingBottom: 3, marginBottom: 8, marginTop: 12 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#555' },
  meta: { marginTop: 2, fontFamily: 'Times-Italic', color: '#555', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#222', fontSize: 9.5 },
})

export function AcademicPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={academic.page}>
        <Text style={academic.kicker}>Curriculum Vitae</Text>
        {data.photo ? <Image src={data.photo} style={academic.photo} /> : null}
        <Text style={academic.name}>{display(data.fullName, 'Your Name')}</Text>
        <Text style={academic.title}>{display(data.title, 'Job Title')}</Text>
        <Text style={academic.contact}>{previewContact(data).join('  ·  ')}</Text>
        {hasSummary(data) ? (
          <>
            <Text style={academic.h2}>Research interests</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={academic.h2}>Appointments</Text>
            <Jobs bullet={academic.bullet} data={data} dates={academic.dates} heading={academic.heading} meta={academic.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={academic.h2}>Education</Text>
            <Schools data={data} dates={academic.dates} heading={academic.heading} meta={academic.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={academic.h2}>Areas of expertise</Text>
            <Text>{previewSkills(data.skills).join(', ')}</Text>
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={academic.h2}>Selected work</Text>
            <Projects data={data} heading={academic.heading} link={academic.link} meta={academic.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const midnight = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Helvetica', fontSize: 10.5, color: '#e2e8f0', backgroundColor: '#0b1220' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#f8fafc' },
  title: { marginTop: 4, color: '#2dd4bf', fontFamily: 'Helvetica-Bold' },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  contact: { marginTop: 10, marginBottom: 12, paddingVertical: 8, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#1e293b', color: '#94a3b8', fontSize: 9.5 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#2dd4bf', marginTop: 12, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#f8fafc' },
  dates: { fontSize: 9.5, color: '#2dd4bf' },
  meta: { marginTop: 2, color: '#94a3b8', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#cbd5e1' },
  link: { color: '#2dd4bf', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#1e293b', borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#94a3b8', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function MidnightPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={midnight.page}>
        <View style={midnight.header}>
          <View>
            <Text style={midnight.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={midnight.title}>{display(data.title, 'Job Title')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={midnight.photo} /> : null}
        </View>
        <Text style={midnight.contact}>{previewContact(data).join('  ·  ')}</Text>
        {hasSummary(data) ? (
          <>
            <Text style={midnight.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={midnight.h2}>Experience</Text>
            <Jobs bullet={midnight.bullet} data={data} dates={midnight.dates} heading={midnight.heading} meta={midnight.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={midnight.h2}>Education</Text>
            <Schools data={data} dates={midnight.dates} heading={midnight.heading} meta={midnight.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={midnight.h2}>Skills</Text>
            <SkillTags skills={previewSkills(data.skills)} tag={midnight.tag} tags={midnight.tags} text={midnight.tagText} />
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={midnight.h2}>Projects</Text>
            <Projects data={data} heading={midnight.heading} link={midnight.link} meta={midnight.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const editorial = StyleSheet.create({
  page: { padding: 32, fontFamily: 'Times-Roman', fontSize: 10.5, color: '#171717' },
  nameplate: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  name: { fontFamily: 'Times-Bold', fontSize: 28 },
  title: { marginTop: 6, color: '#525252' },
  photo: { width: 64, height: 80, objectFit: 'cover' },
  bar: { marginTop: 12, marginBottom: 12, paddingVertical: 8, borderTopWidth: 2, borderBottomWidth: 1, borderColor: '#171717', fontSize: 9.5, color: '#525252' },
  lede: { fontSize: 12, marginBottom: 14 },
  columns: { flexDirection: 'row', gap: 18 },
  wide: { width: '64%' },
  side: { width: '36%' },
  h2: { fontFamily: 'Times-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 6, marginTop: 8 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9, color: '#525252' },
  meta: { marginTop: 2, color: '#525252', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#171717', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { borderWidth: 1, borderColor: '#dcd7ce', borderRadius: 2, paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#171717', fontSize: 8, fontFamily: 'Times-Roman' },
})

export function EditorialPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={editorial.page}>
        <View style={editorial.nameplate}>
          <View>
            <Text style={editorial.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={editorial.title}>{display(data.title, 'Job Title')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={editorial.photo} /> : null}
        </View>
        <Text style={editorial.bar}>{previewContact(data).join('   ·   ')}</Text>
        {hasSummary(data) ? <Text style={editorial.lede}>{data.summary.trim()}</Text> : null}
        <View style={editorial.columns}>
          <View style={editorial.wide}>
            {hasExperience(data) ? (
              <>
                <Text style={editorial.h2}>Experience</Text>
                <Jobs bullet={editorial.bullet} data={data} dates={editorial.dates} heading={editorial.heading} meta={editorial.meta} />
              </>
            ) : null}
            {hasProjects(data) ? (
              <>
                <Text style={editorial.h2}>Projects</Text>
                <Projects data={data} heading={editorial.heading} link={editorial.link} meta={editorial.meta} />
              </>
            ) : null}
          </View>
          <View style={editorial.side}>
            {hasSkills(data) ? (
              <>
                <Text style={editorial.h2}>Skills</Text>
                <SkillTags skills={previewSkills(data.skills)} tag={editorial.tag} tags={editorial.tags} text={editorial.tagText} />
              </>
            ) : null}
            {hasEducation(data) ? (
              <>
                <Text style={editorial.h2}>Education</Text>
                <Schools data={data} dates={editorial.dates} heading={editorial.heading} meta={editorial.meta} />
              </>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  )
}
