import {
  Defs,
  Document,
  Image,
  LinearGradient,
  Page,
  Rect,
  Stop,
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
  previewContact,
  previewSkills,
} from '@/lib/cv/format'
import type { CvData } from '@/lib/cv/types'

import { Jobs, Projects, Schools, SkillTags } from './extra'

const aurora = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#1e1b4b', backgroundColor: '#f5f3ff', paddingTop: 28, paddingBottom: 28 },
  banner: {
    position: 'relative',
    marginTop: -28,
    padding: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#f5f3ff' },
  title: { marginTop: 4, color: '#ddd6fe', fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 6, color: '#c4b5fd', fontSize: 9.5 },
  photo: { width: 58, height: 58, borderRadius: 29, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#6d28d9', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#1e1b4b' },
  dates: { fontSize: 9.5, color: '#5b5675' },
  meta: { marginTop: 2, color: '#5b5675', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#6d28d9', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#ddd6fe', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#4c1d95', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function AuroraPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={aurora.page}>
        <View style={aurora.banner}>
          <Svg
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            viewBox="0 0 100 100"
          >
            <Defs>
              <LinearGradient id="auroraGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <Stop offset="0%" stopColor="#312e81" />
                <Stop offset="100%" stopColor="#7c3aed" />
              </LinearGradient>
            </Defs>
            <Rect fill="url(#auroraGrad)" height="100" width="100" x="0" y="0" />
          </Svg>
          <View>
            <Text style={aurora.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={aurora.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={aurora.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={aurora.photo} /> : null}
        </View>
        <View style={aurora.body}>
          {hasSummary(data) ? (
            <>
              <Text style={aurora.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={aurora.h2}>Experience</Text>
              <Jobs bullet={aurora.bullet} data={data} dates={aurora.dates} heading={aurora.heading} meta={aurora.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={aurora.h2}>Education</Text>
              <Schools data={data} dates={aurora.dates} heading={aurora.heading} meta={aurora.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={aurora.h2}>Skills</Text>
              <SkillTags skills={previewSkills(data.skills)} tag={aurora.tag} tags={aurora.tags} text={aurora.tagText} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={aurora.h2}>Projects</Text>
              <Projects data={data} heading={aurora.heading} link={aurora.link} meta={aurora.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const forest = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Times-Roman', fontSize: 11, color: '#1f2a1f', backgroundColor: '#f7f5ef', paddingTop: 32, paddingBottom: 32 },
  stripe: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 12, backgroundColor: '#1f4d3a' },
  content: { flex: 1, paddingHorizontal: 32, marginLeft: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#1f4d3a' },
  title: { marginTop: 4, fontFamily: 'Times-Italic', color: '#4d6b58' },
  contact: { marginTop: 6, color: '#5c6b60', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: '#1f4d3a', borderBottomWidth: 1, borderBottomColor: '#c5d4c8', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11, color: '#1f4d3a' },
  dates: { fontSize: 9.5, color: '#5c6b60' },
  meta: { marginTop: 2, color: '#5c6b60', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#1f4d3a', fontSize: 9.5 },
})

export function ForestPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={forest.page}>
        <View fixed style={forest.stripe} />
        <View style={forest.content}>
          <View style={forest.header}>
            <View>
              <Text style={forest.name}>{display(data.fullName, 'Your Name')}</Text>
              <Text style={forest.title}>{display(data.title, 'Job Title')}</Text>
              <Text style={forest.contact}>{previewContact(data).join('  ·  ')}</Text>
            </View>
            {data.photo ? <Image src={data.photo} style={forest.photo} /> : null}
          </View>
          {hasSummary(data) ? (
            <>
              <Text style={forest.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={forest.h2}>Experience</Text>
              <Jobs bullet={forest.bullet} data={data} dates={forest.dates} heading={forest.heading} meta={forest.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={forest.h2}>Education</Text>
              <Schools data={data} dates={forest.dates} heading={forest.heading} meta={forest.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={forest.h2}>Skills</Text>
              <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={forest.h2}>Projects</Text>
              <Projects data={data} heading={forest.heading} link={forest.link} meta={forest.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const mono = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Courier', fontSize: 10, color: '#111' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#111', paddingBottom: 12, marginBottom: 14 },
  name: { fontFamily: 'Courier-Bold', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1 },
  title: { marginTop: 6 },
  contact: { marginTop: 6, fontSize: 9 },
  photo: { width: 48, height: 48, objectFit: 'cover' },
  h2: { fontFamily: 'Courier-Bold', fontSize: 10, textTransform: 'uppercase', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Courier-Bold', fontSize: 10 },
  dates: { fontSize: 9 },
  meta: { marginTop: 2, fontSize: 9 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 9 },
  link: { color: '#111', fontSize: 9 },
})

export function MonoPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={mono.page}>
        <View style={mono.header}>
          <View>
            <Text style={mono.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={mono.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={mono.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={mono.photo} /> : null}
        </View>
        {hasSummary(data) ? (
          <>
            <Text style={mono.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={mono.h2}>Experience</Text>
            <Jobs bullet={mono.bullet} data={data} dates={mono.dates} heading={mono.heading} meta={mono.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={mono.h2}>Education</Text>
            <Schools data={data} dates={mono.dates} heading={mono.heading} meta={mono.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={mono.h2}>Skills</Text>
            <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={mono.h2}>Projects</Text>
            <Projects data={data} heading={mono.heading} link={mono.link} meta={mono.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const frame = StyleSheet.create({
  page: { paddingTop: 28, paddingBottom: 28, paddingHorizontal: 24, fontFamily: 'Times-Roman', fontSize: 11, color: '#1c1917' },
  inner: { borderWidth: 2, borderColor: '#1c1917', paddingHorizontal: 24, paddingVertical: 18, minHeight: 740 },
  kicker: { textAlign: 'center', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  name: { fontFamily: 'Times-Bold', fontSize: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.4 },
  title: { marginTop: 6, fontFamily: 'Times-Italic', textAlign: 'center' },
  contact: { marginTop: 6, marginBottom: 14, textAlign: 'center', fontSize: 9.5 },
  photo: { width: 50, height: 50, objectFit: 'cover', alignSelf: 'center', marginBottom: 8 },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, textAlign: 'center', letterSpacing: 1.4, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#1c1917', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#44403c' },
  meta: { marginTop: 2, color: '#44403c', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#1c1917', fontSize: 9.5 },
})

export function FramePdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={frame.page}>
        <View style={frame.inner}>
          <Text style={frame.kicker}>Curriculum vitae</Text>
          {data.photo ? <Image src={data.photo} style={frame.photo} /> : null}
          <Text style={frame.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={frame.title}>{display(data.title, 'Job Title')}</Text>
          <Text style={frame.contact}>{previewContact(data).join('  ·  ')}</Text>
          {hasSummary(data) ? (
            <>
              <Text style={frame.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={frame.h2}>Experience</Text>
              <Jobs bullet={frame.bullet} data={data} dates={frame.dates} heading={frame.heading} meta={frame.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={frame.h2}>Education</Text>
              <Schools data={data} dates={frame.dates} heading={frame.heading} meta={frame.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={frame.h2}>Skills</Text>
              <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={frame.h2}>Projects</Text>
              <Projects data={data} heading={frame.heading} link={frame.link} meta={frame.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const split = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#1c1917', backgroundColor: '#fff7ed', paddingTop: 32, paddingBottom: 32 },
  panelBg: { position: 'absolute', top: 0, left: 0, bottom: 0, width: '32%', backgroundColor: '#9a3412' },
  panel: { width: '32%', color: '#fff7ed', paddingHorizontal: 24 },
  photo: { width: 72, height: 72, objectFit: 'cover', marginBottom: 12 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#fff7ed', marginBottom: 6 },
  title: { color: '#fdba74', fontFamily: 'Helvetica-Bold', marginBottom: 10 },
  contact: { fontSize: 9.5, marginBottom: 6 },
  sideTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#fdba74', marginTop: 14, marginBottom: 6 },
  main: { width: '68%', paddingHorizontal: 24 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#9a3412', marginTop: 8, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#7c2d12' },
  meta: { marginTop: 2, color: '#7c2d12', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#9a3412', fontSize: 9.5 },
})

export function SplitPdf({ data }: { data: CvData }) {
  const contact = previewContact(data)
  return (
    <Document>
      <Page size="A4" style={split.page}>
        <View fixed style={split.panelBg} />
        <View style={split.panel}>
          {data.photo ? <Image src={data.photo} style={split.photo} /> : null}
          <Text style={split.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={split.title}>{display(data.title, 'Job Title')}</Text>
          {contact.map((item) => (
            <Text key={item} style={split.contact}>
              {item}
            </Text>
          ))}
          {hasSkills(data) ? (
            <>
              <Text style={split.sideTitle}>Skills</Text>
              {previewSkills(data.skills).map((skill) => (
                <Text key={skill} style={split.contact}>
                  {skill}
                </Text>
              ))}
            </>
          ) : null}
        </View>
        <View style={split.main}>
          {hasSummary(data) ? (
            <>
              <Text style={split.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={split.h2}>Experience</Text>
              <Jobs bullet={split.bullet} data={data} dates={split.dates} heading={split.heading} meta={split.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={split.h2}>Education</Text>
              <Schools data={data} dates={split.dates} heading={split.heading} meta={split.meta} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={split.h2}>Projects</Text>
              <Projects data={data} heading={split.heading} link={split.link} meta={split.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const ribbon = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Helvetica', fontSize: 10.5, color: '#1f2937' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 24 },
  title: { marginTop: 6, fontFamily: 'Helvetica-Bold' },
  band: { height: 8, backgroundColor: '#9f1239', marginVertical: 8 },
  contact: { color: '#6b7280', fontSize: 9.5, marginBottom: 12 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#9f1239', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#6b7280' },
  meta: { marginTop: 2, color: '#6b7280', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#9f1239', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#9f1239', borderRadius: 2, paddingHorizontal: 6, paddingVertical: 2.5, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#ffffff', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function RibbonPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={ribbon.page}>
        <View style={ribbon.header}>
          <View>
            <Text style={ribbon.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={ribbon.title}>{display(data.title, 'Job Title')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={ribbon.photo} /> : null}
        </View>
        <View style={ribbon.band} />
        <Text style={ribbon.contact}>{previewContact(data).join('  ·  ')}</Text>
        {hasSummary(data) ? (
          <>
            <Text style={ribbon.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={ribbon.h2}>Experience</Text>
            <Jobs bullet={ribbon.bullet} data={data} dates={ribbon.dates} heading={ribbon.heading} meta={ribbon.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={ribbon.h2}>Education</Text>
            <Schools data={data} dates={ribbon.dates} heading={ribbon.heading} meta={ribbon.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={ribbon.h2}>Skills</Text>
            <SkillTags skills={previewSkills(data.skills)} tag={ribbon.tag} tags={ribbon.tags} text={ribbon.tagText} />
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={ribbon.h2}>Projects</Text>
            <Projects data={data} heading={ribbon.heading} link={ribbon.link} meta={ribbon.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const nordic = StyleSheet.create({
  page: { paddingTop: 48, paddingBottom: 48, paddingHorizontal: 54, fontFamily: 'Helvetica', fontSize: 10.5, color: '#1e3a4c', backgroundColor: '#f4f9fb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  name: { fontSize: 26, letterSpacing: -0.4 },
  title: { marginTop: 8, color: '#5b7c8a' },
  contact: { marginTop: 8, color: '#5b7c8a', fontSize: 9.5 },
  photo: { width: 48, height: 48, borderRadius: 24, objectFit: 'cover' },
  h2: { fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: '#7aa0b0', marginTop: 14, marginBottom: 8 },
  heading: { fontSize: 11 },
  dates: { fontSize: 9, color: '#5b7c8a' },
  meta: { marginTop: 2, color: '#5b7c8a', fontSize: 10 },
  bullet: { marginTop: 3, fontSize: 10 },
  link: { color: '#1e3a4c', fontSize: 9.5 },
})

export function NordicPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={nordic.page}>
        <View style={nordic.header}>
          <View>
            <Text style={nordic.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={nordic.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={nordic.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={nordic.photo} /> : null}
        </View>
        {hasSummary(data) ? (
          <>
            <Text style={nordic.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={nordic.h2}>Experience</Text>
            <Jobs bullet={nordic.bullet} data={data} dates={nordic.dates} heading={nordic.heading} meta={nordic.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={nordic.h2}>Education</Text>
            <Schools data={data} dates={nordic.dates} heading={nordic.heading} meta={nordic.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={nordic.h2}>Skills</Text>
            <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={nordic.h2}>Projects</Text>
            <Projects data={data} heading={nordic.heading} link={nordic.link} meta={nordic.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const industrial = StyleSheet.create({
  page: { padding: 32, fontFamily: 'Helvetica', fontSize: 10, color: '#f4f4f5', backgroundColor: '#111' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 4, borderBottomColor: '#f97316', paddingBottom: 12, marginBottom: 14 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 20, textTransform: 'uppercase', color: '#f4f4f5' },
  title: { marginTop: 4, color: '#f97316', fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 6, color: '#a1a1aa', fontSize: 9 },
  photo: { width: 52, height: 52, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#f97316', marginTop: 10, marginBottom: 6 },
  box: { borderWidth: 1, borderColor: '#3f3f46', padding: 8, marginBottom: 8, backgroundColor: '#18181b' },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#f4f4f5' },
  dates: { fontSize: 9, color: '#f97316' },
  meta: { marginTop: 2, color: '#a1a1aa', fontSize: 9.5 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 9.5, color: '#d4d4d8' },
  link: { color: '#f97316', fontSize: 9 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { borderWidth: 1, borderColor: '#f97316', borderRadius: 2, paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#f97316', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function IndustrialPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={industrial.page}>
        <View style={industrial.header}>
          <View>
            <Text style={industrial.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={industrial.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={industrial.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={industrial.photo} /> : null}
        </View>
        {hasSummary(data) ? (
          <>
            <Text style={industrial.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={industrial.h2}>Experience</Text>
            <Jobs bullet={industrial.bullet} data={data} dates={industrial.dates} heading={industrial.heading} meta={industrial.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={industrial.h2}>Education</Text>
            <Schools data={data} dates={industrial.dates} heading={industrial.heading} meta={industrial.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={industrial.h2}>Skills</Text>
            <SkillTags skills={previewSkills(data.skills)} tag={industrial.tag} tags={industrial.tags} text={industrial.tagText} />
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={industrial.h2}>Projects</Text>
            <Projects data={data} heading={industrial.heading} link={industrial.link} meta={industrial.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const atelier = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Times-Roman', fontSize: 11, color: '#3f2a28', backgroundColor: '#fdf6f4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontSize: 24 },
  title: { marginTop: 6, fontFamily: 'Times-Italic', color: '#c26d5a' },
  contact: { marginTop: 6, color: '#8a6e6a', fontSize: 9.5 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#c26d5a', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#8a6e6a' },
  meta: { marginTop: 2, color: '#8a6e6a', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#c26d5a', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#f0d6d0', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#3f2a28', fontSize: 8.5, fontFamily: 'Times-Roman' },
})

export function AtelierPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={atelier.page}>
        <View style={atelier.header}>
          <View>
            <Text style={atelier.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={atelier.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={atelier.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={atelier.photo} /> : null}
        </View>
        {hasSummary(data) ? (
          <>
            <Text style={atelier.h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={atelier.h2}>Experience</Text>
            <Jobs bullet={atelier.bullet} data={data} dates={atelier.dates} heading={atelier.heading} meta={atelier.meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={atelier.h2}>Education</Text>
            <Schools data={data} dates={atelier.dates} heading={atelier.heading} meta={atelier.meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={atelier.h2}>Skills</Text>
            <SkillTags skills={previewSkills(data.skills)} tag={atelier.tag} tags={atelier.tags} text={atelier.tagText} />
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={atelier.h2}>Projects</Text>
            <Projects data={data} heading={atelier.heading} link={atelier.link} meta={atelier.meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const summit = StyleSheet.create({
  page: { fontFamily: 'Times-Roman', fontSize: 11, color: '#1c1917', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#1c1917', color: '#fafaf9', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#fafaf9' },
  title: { marginTop: 6, color: '#d6b15e' },
  contact: { marginTop: 6, color: '#d6d3d1', fontSize: 9.5 },
  photo: { width: 60, height: 60, objectFit: 'cover' },
  gold: { height: 8, backgroundColor: '#d6b15e' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#d6b15e', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#57534e' },
  meta: { marginTop: 2, color: '#57534e', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#1c1917', fontSize: 9.5 },
})

export function SummitPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={summit.page}>
        <View style={summit.banner}>
          <View>
            <Text style={summit.name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={summit.title}>{display(data.title, 'Job Title')}</Text>
            <Text style={summit.contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={summit.photo} /> : null}
        </View>
        <View style={summit.gold} />
        <View style={summit.body}>
          {hasSummary(data) ? (
            <>
              <Text style={summit.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={summit.h2}>Experience</Text>
              <Jobs bullet={summit.bullet} data={data} dates={summit.dates} heading={summit.heading} meta={summit.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={summit.h2}>Education</Text>
              <Schools data={data} dates={summit.dates} heading={summit.heading} meta={summit.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={summit.h2}>Skills</Text>
              <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={summit.h2}>Projects</Text>
              <Projects data={data} heading={summit.heading} link={summit.link} meta={summit.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}
