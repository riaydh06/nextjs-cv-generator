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

import { Jobs, Projects, Schools, SkillTags, type PdfStyle } from './extra'

export type GradientDef = {
  id: string
  x1?: string
  y1?: string
  x2?: string
  y2?: string
  stops: Array<{ offset: string; stopColor: string }>
}

export function BannerPdf({
  data,
  page,
  banner,
  name,
  title,
  contact,
  photo,
  body,
  h2,
  heading,
  dates,
  meta,
  bullet,
  link,
  tags,
  tag,
  tagText,
  gradient,
}: {
  data: CvData
  page: PdfStyle
  banner: PdfStyle
  name: PdfStyle
  title: PdfStyle
  contact: PdfStyle
  photo: PdfStyle
  body: PdfStyle
  h2: PdfStyle
  heading: PdfStyle
  dates: PdfStyle
  meta: PdfStyle
  bullet: PdfStyle
  link: PdfStyle
  tags?: PdfStyle
  tag?: PdfStyle
  tagText?: PdfStyle
  gradient?: GradientDef
}) {
  return (
    <Document>
      <Page size="A4" style={page}>
        <View style={banner}>
          {gradient ? (
            <Svg
              preserveAspectRatio="none"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              viewBox="0 0 100 100"
            >
              <Defs>
                <LinearGradient
                  id={gradient.id}
                  x1={gradient.x1 ?? '0%'}
                  x2={gradient.x2 ?? '100%'}
                  y1={gradient.y1 ?? '0%'}
                  y2={gradient.y2 ?? '100%'}
                >
                  {gradient.stops.map((stop, idx) => (
                    <Stop key={idx} offset={stop.offset} stopColor={stop.stopColor} />
                  ))}
                </LinearGradient>
              </Defs>
              <Rect fill={`url(#${gradient.id})`} height="100" width="100" x="0" y="0" />
            </Svg>
          ) : null}
          <View>
            <Text style={name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={title}>{display(data.title, 'Job Title')}</Text>
            <Text style={contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={photo} /> : null}
        </View>
        <View style={body}>
          {hasSummary(data) ? (
            <>
              <Text style={h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={h2}>Experience</Text>
              <Jobs bullet={bullet} data={data} dates={dates} heading={heading} meta={meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={h2}>Education</Text>
              <Schools data={data} dates={dates} heading={heading} meta={meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={h2}>Skills</Text>
              {tags && tag && tagText ? (
                <SkillTags skills={previewSkills(data.skills)} tag={tag} tags={tags} text={tagText} />
              ) : (
                <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
              )}
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={h2}>Projects</Text>
              <Projects data={data} heading={heading} link={link} meta={meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

export function StackPdf({
  data,
  page,
  header,
  name,
  title,
  contact,
  photo,
  h2,
  heading,
  dates,
  meta,
  bullet,
  link,
  kicker,
  band,
  tags,
  tag,
  tagText,
}: {
  data: CvData
  page: PdfStyle
  header: PdfStyle
  name: PdfStyle
  title: PdfStyle
  contact: PdfStyle
  photo: PdfStyle
  h2: PdfStyle
  heading: PdfStyle
  dates: PdfStyle
  meta: PdfStyle
  bullet: PdfStyle
  link: PdfStyle
  kicker?: PdfStyle
  band?: PdfStyle
  tags?: PdfStyle
  tag?: PdfStyle
  tagText?: PdfStyle
}) {
  return (
    <Document>
      <Page size="A4" style={page}>
        <View style={header}>
          <View>
            {kicker ? <Text style={kicker}>Curriculum vitae</Text> : null}
            <Text style={name}>{display(data.fullName, 'Your Name')}</Text>
            <Text style={title}>{display(data.title, 'Job Title')}</Text>
            {band ? <View style={band} /> : null}
            <Text style={contact}>{previewContact(data).join('  ·  ')}</Text>
          </View>
          {data.photo ? <Image src={data.photo} style={photo} /> : null}
        </View>
        {hasSummary(data) ? (
          <>
            <Text style={h2}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </>
        ) : null}
        {hasExperience(data) ? (
          <>
            <Text style={h2}>Experience</Text>
            <Jobs bullet={bullet} data={data} dates={dates} heading={heading} meta={meta} />
          </>
        ) : null}
        {hasEducation(data) ? (
          <>
            <Text style={h2}>Education</Text>
            <Schools data={data} dates={dates} heading={heading} meta={meta} />
          </>
        ) : null}
        {hasSkills(data) ? (
          <>
            <Text style={h2}>Skills</Text>
            {tags && tag && tagText ? (
              <SkillTags skills={previewSkills(data.skills)} tag={tag} tags={tags} text={tagText} />
            ) : (
              <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
            )}
          </>
        ) : null}
        {hasProjects(data) ? (
          <>
            <Text style={h2}>Projects</Text>
            <Projects data={data} heading={heading} link={link} meta={meta} />
          </>
        ) : null}
      </Page>
    </Document>
  )
}

const ocean = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#134e4a', backgroundColor: '#f0fdfa', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#0f766e', color: '#f0fdfa', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#f0fdfa' },
  title: { marginTop: 4, color: '#99f6e4', fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 6, color: '#ccfbf1', fontSize: 9.5 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#0f766e', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#134e4a' },
  dates: { fontSize: 9.5, color: '#3f6f6a' },
  meta: { marginTop: 2, color: '#3f6f6a', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#0f766e', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#ccfbf1', borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2.5, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#115e59', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function OceanPdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...ocean} />
}

const paper = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Times-Roman', fontSize: 11, color: '#3b2f22', backgroundColor: '#efe6d6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#8a7355', paddingBottom: 12, marginBottom: 14 },
  name: { fontFamily: 'Times-Bold', fontSize: 22 },
  title: { marginTop: 6, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: '#6b5340' },
  contact: { marginTop: 6, color: '#6b5340', fontSize: 9.5 },
  photo: { width: 52, height: 52, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#6b5340', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#6b5340' },
  meta: { marginTop: 2, color: '#6b5340', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#3b2f22', fontSize: 9.5 },
})

export function PaperPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...paper} />
}

const metro = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#0f172a', paddingTop: 32, paddingBottom: 32 },
  stripe: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 10, backgroundColor: '#1d4ed8' },
  content: { flex: 1, paddingHorizontal: 28, marginLeft: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 20, textTransform: 'uppercase' },
  title: { marginTop: 4, color: '#1d4ed8', fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 6, color: '#475569', fontSize: 9.5 },
  photo: { width: 52, height: 52, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#1d4ed8', backgroundColor: '#eff6ff', padding: 4, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#64748b' },
  meta: { marginTop: 2, color: '#64748b', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#1d4ed8', fontSize: 9.5 },
})

export function MetroPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={metro.page}>
        <View fixed style={metro.stripe} />
        <View style={metro.content}>
          <View style={metro.header}>
            <View>
              <Text style={metro.name}>{display(data.fullName, 'Your Name')}</Text>
              <Text style={metro.title}>{display(data.title, 'Job Title')}</Text>
              <Text style={metro.contact}>{previewContact(data).join('  ·  ')}</Text>
            </View>
            {data.photo ? <Image src={data.photo} style={metro.photo} /> : null}
          </View>
          {hasSummary(data) ? (
            <>
              <Text style={metro.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={metro.h2}>Experience</Text>
              <Jobs bullet={metro.bullet} data={data} dates={metro.dates} heading={metro.heading} meta={metro.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={metro.h2}>Education</Text>
              <Schools data={data} dates={metro.dates} heading={metro.heading} meta={metro.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={metro.h2}>Skills</Text>
              <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={metro.h2}>Projects</Text>
              <Projects data={data} heading={metro.heading} link={metro.link} meta={metro.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const legal = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 11, color: '#111' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 3, borderBottomColor: '#111', paddingBottom: 10, marginBottom: 14 },
  kicker: { fontSize: 8, letterSpacing: 2.4, textTransform: 'uppercase', marginBottom: 4 },
  name: { fontFamily: 'Times-Bold', fontSize: 18 },
  title: { marginTop: 4, fontSize: 11 },
  contact: { marginTop: 6, fontSize: 9.5 },
  photo: { width: 48, height: 60, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5 },
  meta: { marginTop: 2, fontFamily: 'Times-Italic', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#111', fontSize: 9.5 },
})

export function LegalPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...legal} />
}

const canvas = StyleSheet.create({
  page: { paddingTop: 42, paddingBottom: 42, paddingHorizontal: 48, fontFamily: 'Helvetica', fontSize: 10.5, color: '#171717', backgroundColor: '#fafafa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  name: { fontSize: 26, letterSpacing: -0.5 },
  title: { marginTop: 8, color: '#525252' },
  contact: { marginTop: 8, color: '#737373', fontSize: 9.5 },
  photo: { width: 50, height: 64, objectFit: 'cover' },
  h2: { fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', borderTopWidth: 1, borderTopColor: '#171717', paddingTop: 6, marginTop: 12, marginBottom: 8 },
  heading: { fontSize: 11 },
  dates: { fontSize: 9, color: '#737373' },
  meta: { marginTop: 2, color: '#737373', fontSize: 10 },
  bullet: { marginTop: 3, fontSize: 10 },
  link: { color: '#171717', fontSize: 9.5 },
})

export function CanvasPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...canvas} />
}

const ember = StyleSheet.create({
  page: { fontFamily: 'Times-Roman', fontSize: 11, color: '#3f1d12', backgroundColor: '#fff7ed', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#7f1d1d', color: '#fff7ed', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#fff7ed' },
  title: { marginTop: 6, color: '#fdba74' },
  contact: { marginTop: 6, color: '#fecaca', fontSize: 9.5 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#7f1d1d', borderBottomWidth: 1, borderBottomColor: '#fdba74', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#9a3412' },
  meta: { marginTop: 2, color: '#9a3412', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#7f1d1d', fontSize: 9.5 },
})

export function EmberPdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...ember} />
}

const harbor = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#0f172a', backgroundColor: '#f8fafc', paddingTop: 32, paddingBottom: 32 },
  panelBg: { position: 'absolute', top: 0, left: 0, bottom: 0, width: '32%', backgroundColor: '#1e3a8a' },
  panel: { width: '32%', color: '#eff6ff', paddingHorizontal: 24 },
  photo: { width: 72, height: 72, borderRadius: 36, objectFit: 'cover', marginBottom: 12 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#eff6ff', marginBottom: 6 },
  title: { color: '#93c5fd', fontFamily: 'Helvetica-Bold', marginBottom: 10 },
  contact: { fontSize: 9.5, marginBottom: 6 },
  sideTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#93c5fd', marginTop: 14, marginBottom: 6 },
  main: { width: '68%', paddingHorizontal: 24 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#1e3a8a', marginTop: 8, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#334155' },
  meta: { marginTop: 2, color: '#334155', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#1e3a8a', fontSize: 9.5 },
})

export function HarborPdf({ data }: { data: CvData }) {
  const contact = previewContact(data)
  return (
    <Document>
      <Page size="A4" style={harbor.page}>
        <View fixed style={harbor.panelBg} />
        <View style={harbor.panel}>
          {data.photo ? <Image src={data.photo} style={harbor.photo} /> : null}
          <Text style={harbor.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={harbor.title}>{display(data.title, 'Job Title')}</Text>
          {contact.map((item) => (
            <Text key={item} style={harbor.contact}>
              {item}
            </Text>
          ))}
          {hasSkills(data) ? (
            <>
              <Text style={harbor.sideTitle}>Skills</Text>
              {previewSkills(data.skills).map((skill) => (
                <Text key={skill} style={harbor.contact}>
                  {skill}
                </Text>
              ))}
            </>
          ) : null}
        </View>
        <View style={harbor.main}>
          {hasSummary(data) ? (
            <>
              <Text style={harbor.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={harbor.h2}>Experience</Text>
              <Jobs bullet={harbor.bullet} data={data} dates={harbor.dates} heading={harbor.heading} meta={harbor.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={harbor.h2}>Education</Text>
              <Schools data={data} dates={harbor.dates} heading={harbor.heading} meta={harbor.meta} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={harbor.h2}>Projects</Text>
              <Projects data={data} heading={harbor.heading} link={harbor.link} meta={harbor.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const lumen = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Helvetica', fontSize: 10.5, color: '#171717' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22 },
  title: { marginTop: 6, fontFamily: 'Helvetica-Bold' },
  band: { width: 64, height: 6, backgroundColor: '#facc15', marginVertical: 8 },
  contact: { color: '#525252', fontSize: 9.5, marginBottom: 12 },
  photo: { width: 52, height: 52, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', backgroundColor: '#facc15', padding: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#525252' },
  meta: { marginTop: 2, color: '#525252', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#171717', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#171717', borderRadius: 2, paddingHorizontal: 6, paddingVertical: 2.5, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#facc15', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function LumenPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...lumen} />
}

const quartz = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 11, color: '#292524', backgroundColor: '#f5f5f4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  name: { fontSize: 22, color: '#44403c' },
  title: { marginTop: 6, fontFamily: 'Times-Italic', color: '#78716c' },
  contact: { marginTop: 8, color: '#78716c', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', color: '#78716c', marginTop: 12, marginBottom: 8 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#78716c' },
  meta: { marginTop: 2, color: '#78716c', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#44403c', fontSize: 9.5 },
})

export function QuartzPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...quartz} />
}

const pulse = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#fafafa', backgroundColor: '#0a0a0a', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#db2777', color: '#fff', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#fff' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 6, color: '#fce7f3', fontSize: 9.5 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#db2777', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#fff' },
  dates: { fontSize: 9.5, color: '#db2777' },
  meta: { marginTop: 2, color: '#a3a3a3', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#d4d4d4' },
  link: { color: '#db2777', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { borderWidth: 1, borderColor: '#db2777', borderRadius: 2, paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#db2777', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function PulsePdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...pulse} />
}
