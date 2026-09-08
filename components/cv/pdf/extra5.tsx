import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

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
import { BannerPdf, StackPdf } from './extra3'

// 1. EMERALD (Banner)
const emerald = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#064e3b', backgroundColor: '#f0fdf4', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#064e3b', color: '#f0fdf4', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#f0fdf4' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold', color: '#a7f3d0' },
  contact: { marginTop: 6, color: '#d1fae5', fontSize: 9.5 },
  photo: { width: 58, height: 58, borderRadius: 29, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#059669', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#064e3b' },
  dates: { fontSize: 9.5, color: '#047857' },
  meta: { marginTop: 2, color: '#047857', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#064e3b' },
  link: { color: '#059669', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#d1fae5', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#065f46', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function EmeraldPdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...emerald} />
}

// 2. AMBER (Stack)
const amber = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Times-Roman', fontSize: 11, color: '#451a03', backgroundColor: '#fffbeb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#78350f' },
  title: { marginTop: 6, fontFamily: 'Times-Italic', color: '#b45309' },
  contact: { marginTop: 6, color: '#92400e', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#92400e', borderBottomWidth: 1, borderBottomColor: '#fde68a', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11, color: '#78350f' },
  dates: { fontSize: 9.5, color: '#92400e' },
  meta: { marginTop: 2, color: '#92400e', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#451a03' },
  link: { color: '#b45309', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#fef3c7', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#92400e', fontSize: 8.5, fontFamily: 'Times-Roman' },
})

export function AmberPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...amber} />
}

// 3. COBALT (Stripe)
const cobalt = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#0f172a', paddingTop: 32, paddingBottom: 32 },
  stripe: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 12, backgroundColor: '#1d4ed8' },
  content: { flex: 1, paddingHorizontal: 28, marginLeft: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#1e3a8a' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold', color: '#1d4ed8' },
  contact: { marginTop: 6, color: '#475569', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#1d4ed8', borderBottomWidth: 1, borderBottomColor: '#bfdbfe', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#0f172a' },
  dates: { fontSize: 9.5, color: '#475569' },
  meta: { marginTop: 2, color: '#475569', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#1d4ed8', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#dbeafe', borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2.5, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#1d4ed8', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function CobaltPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={cobalt.page}>
        <View fixed style={cobalt.stripe} />
        <View style={cobalt.content}>
          <View style={cobalt.header}>
            <View>
              <Text style={cobalt.name}>{display(data.fullName, 'Your Name')}</Text>
              <Text style={cobalt.title}>{display(data.title, 'Job Title')}</Text>
              <Text style={cobalt.contact}>{previewContact(data).join('  ·  ')}</Text>
            </View>
            {data.photo ? <Image src={data.photo} style={cobalt.photo} /> : null}
          </View>
          {hasSummary(data) ? (
            <>
              <Text style={cobalt.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={cobalt.h2}>Experience</Text>
              <Jobs bullet={cobalt.bullet} data={data} dates={cobalt.dates} heading={cobalt.heading} meta={cobalt.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={cobalt.h2}>Education</Text>
              <Schools data={data} dates={cobalt.dates} heading={cobalt.heading} meta={cobalt.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={cobalt.h2}>Skills</Text>
              <SkillTags skills={previewSkills(data.skills)} tag={cobalt.tag} tags={cobalt.tags} text={cobalt.tagText} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={cobalt.h2}>Projects</Text>
              <Projects data={data} heading={cobalt.heading} link={cobalt.link} meta={cobalt.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

// 4. TERRACOTTA (Stack)
const terracotta = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Times-Roman', fontSize: 11, color: '#292524', backgroundColor: '#faf5f0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: '#9a3412', paddingBottom: 12, marginBottom: 14 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#9a3412' },
  title: { marginTop: 6, fontFamily: 'Times-Italic', color: '#c2410c' },
  contact: { marginTop: 6, color: '#78716c', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#9a3412', borderBottomWidth: 1, borderBottomColor: '#fdba74', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11, color: '#9a3412' },
  dates: { fontSize: 9.5, color: '#78716c' },
  meta: { marginTop: 2, color: '#78716c', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#c2410c', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#ffedd5', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#9a3412', fontSize: 8.5, fontFamily: 'Times-Roman' },
})

export function TerracottaPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...terracotta} />
}

// 5. MONACO (Split)
const monaco = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#1c1917', backgroundColor: '#fbfbf9', paddingTop: 32, paddingBottom: 32 },
  panelBg: { position: 'absolute', top: 0, left: 0, bottom: 0, width: '32%', backgroundColor: '#143d2b' },
  panel: { width: '32%', color: '#d1fae5', paddingHorizontal: 24 },
  photo: { width: 64, height: 64, borderRadius: 32, objectFit: 'cover', marginBottom: 12 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#f0fdf4', marginBottom: 6 },
  title: { color: '#fcd34d', fontFamily: 'Helvetica-Bold', marginBottom: 10 },
  contact: { fontSize: 9.5, color: '#a7f3d0', marginBottom: 6 },
  sideTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#fcd34d', marginTop: 14, marginBottom: 6 },
  main: { width: '68%', paddingHorizontal: 24 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#143d2b', borderBottomWidth: 1, borderBottomColor: '#d1fae5', paddingBottom: 3, marginTop: 8, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#143d2b' },
  dates: { fontSize: 9.5, color: '#57534e' },
  meta: { marginTop: 2, color: '#57534e', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#143d2b', fontSize: 9.5 },
})

export function MonacoPdf({ data }: { data: CvData }) {
  const contact = previewContact(data)
  return (
    <Document>
      <Page size="A4" style={monaco.page}>
        <View fixed style={monaco.panelBg} />
        <View style={monaco.panel}>
          {data.photo ? <Image src={data.photo} style={monaco.photo} /> : null}
          <Text style={monaco.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={monaco.title}>{display(data.title, 'Job Title')}</Text>
          {contact.map((item) => (
            <Text key={item} style={monaco.contact}>
              {item}
            </Text>
          ))}
          {hasSkills(data) ? (
            <>
              <Text style={monaco.sideTitle}>Skills</Text>
              {previewSkills(data.skills).map((skill) => (
                <Text key={skill} style={monaco.contact}>
                  {skill}
                </Text>
              ))}
            </>
          ) : null}
        </View>
        <View style={monaco.main}>
          {hasSummary(data) ? (
            <>
              <Text style={monaco.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={monaco.h2}>Experience</Text>
              <Jobs bullet={monaco.bullet} data={data} dates={monaco.dates} heading={monaco.heading} meta={monaco.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={monaco.h2}>Education</Text>
              <Schools data={data} dates={monaco.dates} heading={monaco.heading} meta={monaco.meta} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={monaco.h2}>Projects</Text>
              <Projects data={data} heading={monaco.heading} link={monaco.link} meta={monaco.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

// 6. FUCHSIA (Banner)
const fuchsia = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#3b0764', backgroundColor: '#fdf4ff', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#86198f', color: '#fdf4ff', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#ffffff' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold', color: '#f5d0fe' },
  contact: { marginTop: 6, color: '#fae8ff', fontSize: 9.5 },
  photo: { width: 58, height: 58, borderRadius: 12, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#a21caf', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#3b0764' },
  dates: { fontSize: 9.5, color: '#701a75' },
  meta: { marginTop: 2, color: '#701a75', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#3b0764' },
  link: { color: '#c026d3', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#f5d0fe', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#86198f', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function FuchsiaPdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...fuchsia} />
}

// 7. GRAPHITE (Stack - dark)
const graphite = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Helvetica', fontSize: 10.5, color: '#e4e4e7', backgroundColor: '#18181b' },
  header: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#3f3f46', paddingBottom: 12, marginBottom: 14 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#fafafa' },
  title: { marginTop: 6, fontFamily: 'Helvetica-Bold', color: '#a1a1aa' },
  contact: { marginTop: 6, color: '#71717a', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover', borderRadius: 6 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#d4d4d8', borderBottomWidth: 1, borderBottomColor: '#27272a', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#fafafa' },
  dates: { fontSize: 9.5, color: '#a1a1aa' },
  meta: { marginTop: 2, color: '#a1a1aa', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#d4d4d8' },
  link: { color: '#38bdf8', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#27272a', borderWidth: 1, borderColor: '#3f3f46', borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2.5, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#e4e4e7', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function GraphitePdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...graphite} />
}

// 8. NORD (Stack)
const nord = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Helvetica', fontSize: 10.5, color: '#3b4252', backgroundColor: '#eceff4' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#2e3440' },
  title: { marginTop: 6, fontFamily: 'Helvetica-Bold', color: '#5e81ac' },
  contact: { marginTop: 6, color: '#4c566a', fontSize: 9.5 },
  photo: { width: 54, height: 54, borderRadius: 27, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#5e81ac', borderBottomWidth: 1, borderBottomColor: '#88c0d0', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#2e3440' },
  dates: { fontSize: 9.5, color: '#4c566a' },
  meta: { marginTop: 2, color: '#4c566a', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#3b4252' },
  link: { color: '#5e81ac', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#88c0d0', borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2.5, marginRight: 4, marginBottom: 4 },
  tagText: { color: '#2e3440', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function NordPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...nord} />
}

// 9. CRIMSON (Stripe)
const crimson = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Times-Roman', fontSize: 11, color: '#1c1917', backgroundColor: '#fff5f5', paddingTop: 32, paddingBottom: 32 },
  stripe: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 12, backgroundColor: '#881337' },
  content: { flex: 1, paddingHorizontal: 28, marginLeft: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#881337' },
  title: { marginTop: 4, fontFamily: 'Times-Italic', color: '#9f1239' },
  contact: { marginTop: 6, color: '#78716c', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#881337', borderBottomWidth: 1, borderBottomColor: '#fecdd3', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11, color: '#881337' },
  dates: { fontSize: 9.5, color: '#78716c' },
  meta: { marginTop: 2, color: '#78716c', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#9f1239', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#ffe4e6', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#881337', fontSize: 8.5, fontFamily: 'Times-Roman' },
})

export function CrimsonPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={crimson.page}>
        <View fixed style={crimson.stripe} />
        <View style={crimson.content}>
          <View style={crimson.header}>
            <View>
              <Text style={crimson.name}>{display(data.fullName, 'Your Name')}</Text>
              <Text style={crimson.title}>{display(data.title, 'Job Title')}</Text>
              <Text style={crimson.contact}>{previewContact(data).join('  ·  ')}</Text>
            </View>
            {data.photo ? <Image src={data.photo} style={crimson.photo} /> : null}
          </View>
          {hasSummary(data) ? (
            <>
              <Text style={crimson.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={crimson.h2}>Experience</Text>
              <Jobs bullet={crimson.bullet} data={data} dates={crimson.dates} heading={crimson.heading} meta={crimson.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={crimson.h2}>Education</Text>
              <Schools data={data} dates={crimson.dates} heading={crimson.heading} meta={crimson.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={crimson.h2}>Skills</Text>
              <SkillTags skills={previewSkills(data.skills)} tag={crimson.tag} tags={crimson.tags} text={crimson.tagText} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={crimson.h2}>Projects</Text>
              <Projects data={data} heading={crimson.heading} link={crimson.link} meta={crimson.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

// 10. SANDSTONE (Banner)
const sandstone = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#292524', backgroundColor: '#faf6f0', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#78350f', color: '#faf6f0', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#ffffff' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold', color: '#fde68a' },
  contact: { marginTop: 6, color: '#fef3c7', fontSize: 9.5 },
  photo: { width: 58, height: 58, borderRadius: 8, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#b45309', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#78350f' },
  dates: { fontSize: 9.5, color: '#78716c' },
  meta: { marginTop: 2, color: '#78716c', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#b45309', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#fef3c7', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#78350f', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function SandstonePdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...sandstone} />
}

// 11. CREATIVE FLARE (Banner)
const flareGradient = {
  id: 'flareSunsetGrad',
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '100%',
  stops: [
    { offset: '0%', stopColor: '#2e1065' },
    { offset: '42%', stopColor: '#701a75' },
    { offset: '85%', stopColor: '#ea580c' },
    { offset: '100%', stopColor: '#f59e0b' },
  ],
}

const flare = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#1e1b4b', backgroundColor: '#fffcf9', paddingTop: 28, paddingBottom: 28 },
  banner: {
    position: 'relative',
    marginTop: -28,
    padding: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: '#ea580c',
  },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#ffffff' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold', color: '#fde047', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.8 },
  contact: { marginTop: 6, color: '#fae8ff', fontSize: 9.5 },
  photo: { width: 58, height: 58, borderRadius: 29, objectFit: 'cover', borderWidth: 2, borderColor: '#fb923c' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#701a75', borderBottomWidth: 1.5, borderBottomColor: '#fdba74', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#2e1065' },
  dates: { fontSize: 9.5, color: '#ea580c' },
  meta: { marginTop: 2, color: '#c2410c', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#334155' },
  link: { color: '#ea580c', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#ffedd5', borderWidth: 0.8, borderColor: '#fed7aa', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#9a3412', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function FlarePdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} gradient={flareGradient} {...flare} />
}
