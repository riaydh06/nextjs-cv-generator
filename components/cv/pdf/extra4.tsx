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

import { Jobs, Projects, Schools } from './extra'
import { BannerPdf, StackPdf } from './extra3'

const sage = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Times-Roman', fontSize: 11, color: '#2f3b2e', backgroundColor: '#f4f7f2' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#3f5340' },
  title: { marginTop: 6, fontFamily: 'Times-Italic', color: '#6b7f64' },
  contact: { marginTop: 6, color: '#6b7f64', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#5c7155', borderBottomWidth: 1, borderBottomColor: '#c5d1bf', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#6b7f64' },
  meta: { marginTop: 2, color: '#6b7f64', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#3f5340', fontSize: 9.5 },
})

export function SagePdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...sage} />
}

const copper = StyleSheet.create({
  page: { fontFamily: 'Times-Roman', fontSize: 11, color: '#3b2718', backgroundColor: '#faf6ef', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#9a5b2e', color: '#faf6ef', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#faf6ef' },
  title: { marginTop: 4, color: '#f0d2b0' },
  contact: { marginTop: 6, color: '#edd5bc', fontSize: 9.5 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#9a5b2e', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#7a4a28' },
  meta: { marginTop: 2, color: '#7a4a28', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#9a5b2e', fontSize: 9.5 },
})

export function CopperPdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...copper} />
}

const ink = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 11, color: '#14213d', backgroundColor: '#f7f3ea' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  name: { fontSize: 24 },
  title: { marginTop: 6, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#1d3557' },
  contact: { marginTop: 8, color: '#4a5568', fontSize: 9.5 },
  photo: { width: 50, height: 64, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#1d3557', marginTop: 12, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#4a5568' },
  meta: { marginTop: 2, color: '#4a5568', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#14213d', fontSize: 9.5 },
})

export function InkPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...ink} />
}

const glacier = StyleSheet.create({
  page: { paddingTop: 44, paddingBottom: 44, paddingHorizontal: 48, fontFamily: 'Helvetica', fontSize: 10.5, color: '#1b3a4b', backgroundColor: '#fbfdff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  name: { fontSize: 26, letterSpacing: -0.4 },
  title: { marginTop: 8, color: '#6b93a6' },
  contact: { marginTop: 8, color: '#6b93a6', fontSize: 9.5 },
  photo: { width: 48, height: 48, borderRadius: 24, objectFit: 'cover' },
  h2: { fontSize: 8, letterSpacing: 2.4, textTransform: 'uppercase', color: '#8bb4c6', marginTop: 14, marginBottom: 8 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#6b93a6' },
  meta: { marginTop: 2, color: '#6b93a6', fontSize: 10 },
  bullet: { marginTop: 3, fontSize: 10 },
  link: { color: '#1b3a4b', fontSize: 9.5 },
})

export function GlacierPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...glacier} />
}

const orchid = StyleSheet.create({
  page: { padding: 34, fontFamily: 'Helvetica', fontSize: 10.5, color: '#3b2454', backgroundColor: '#f8f4fb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#5b2d86' },
  title: { marginTop: 6, fontFamily: 'Helvetica-Bold', color: '#8b5cf6' },
  contact: { marginTop: 6, color: '#7c6a93', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#7c3aed', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#7c6a93' },
  meta: { marginTop: 2, color: '#7c6a93', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#7c3aed', fontSize: 9.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  tag: { backgroundColor: '#ede9fe', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2.5, marginRight: 5, marginBottom: 5 },
  tagText: { color: '#5b2d86', fontSize: 8.5, fontFamily: 'Helvetica' },
})

export function OrchidPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...orchid} />
}

const cedar = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Times-Roman', fontSize: 11, color: '#3a2a1c', backgroundColor: '#f6f1e7', paddingTop: 32, paddingBottom: 32 },
  stripe: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 12, backgroundColor: '#6b4423' },
  content: { flex: 1, paddingHorizontal: 28, marginLeft: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#6b4423' },
  title: { marginTop: 4, fontFamily: 'Times-Italic', color: '#8a6240' },
  contact: { marginTop: 6, color: '#7a624c', fontSize: 9.5 },
  photo: { width: 54, height: 54, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: '#6b4423', borderBottomWidth: 1, borderBottomColor: '#d4c2aa', paddingBottom: 3, marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#7a624c' },
  meta: { marginTop: 2, color: '#7a624c', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#6b4423', fontSize: 9.5 },
})

export function CedarPdf({ data }: { data: CvData }) {
  return (
    <Document>
      <Page size="A4" style={cedar.page}>
        <View fixed style={cedar.stripe} />
        <View style={cedar.content}>
          <View style={cedar.header}>
            <View>
              <Text style={cedar.name}>{display(data.fullName, 'Your Name')}</Text>
              <Text style={cedar.title}>{display(data.title, 'Job Title')}</Text>
              <Text style={cedar.contact}>{previewContact(data).join('  ·  ')}</Text>
            </View>
            {data.photo ? <Image src={data.photo} style={cedar.photo} /> : null}
          </View>
          {hasSummary(data) ? (
            <>
              <Text style={cedar.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={cedar.h2}>Experience</Text>
              <Jobs bullet={cedar.bullet} data={data} dates={cedar.dates} heading={cedar.heading} meta={cedar.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={cedar.h2}>Education</Text>
              <Schools data={data} dates={cedar.dates} heading={cedar.heading} meta={cedar.meta} />
            </>
          ) : null}
          {hasSkills(data) ? (
            <>
              <Text style={cedar.h2}>Skills</Text>
              <Text>{previewSkills(data.skills).join('  ·  ')}</Text>
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={cedar.h2}>Projects</Text>
              <Projects data={data} heading={cedar.heading} link={cedar.link} meta={cedar.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const nova = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#e8eef4', backgroundColor: '#0a0a0c', paddingTop: 28, paddingBottom: 28 },
  banner: { backgroundColor: '#111827', color: '#e8eef4', marginTop: -28, padding: 28, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 3, borderBottomColor: '#3b82f6' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#e8eef4' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold', color: '#60a5fa', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase' },
  contact: { marginTop: 6, color: '#93c5fd', fontSize: 9.5 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', color: '#60a5fa', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#e8eef4' },
  dates: { fontSize: 9.5, color: '#93c5fd' },
  meta: { marginTop: 2, color: '#93c5fd', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10, color: '#d1d5db' },
  link: { color: '#93c5fd', fontSize: 9.5 },
})

export function NovaPdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} {...nova} />
}

const linen = StyleSheet.create({
  page: { padding: 36, fontFamily: 'Times-Roman', fontSize: 11, color: '#3d3a2e', backgroundColor: '#f4f1e8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontFamily: 'Times-Bold', fontSize: 22, color: '#4a5d23' },
  title: { marginTop: 6, fontFamily: 'Times-Italic', color: '#6b7c3a' },
  contact: { marginTop: 6, color: '#6b6558', fontSize: 9.5 },
  photo: { width: 52, height: 52, objectFit: 'cover' },
  h2: { fontFamily: 'Times-Bold', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: '#4a5d23', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Times-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#6b6558' },
  meta: { marginTop: 2, color: '#6b6558', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#4a5d23', fontSize: 9.5 },
})

export function LinenPdf({ data }: { data: CvData }) {
  return <StackPdf data={data} {...linen} />
}

const carbon = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 10.5, color: '#1f2933', backgroundColor: '#eceff3', paddingTop: 32, paddingBottom: 32 },
  panelBg: { position: 'absolute', top: 0, left: 0, bottom: 0, width: '32%', backgroundColor: '#2b3038' },
  panel: { width: '32%', color: '#e5e7eb', paddingHorizontal: 24 },
  photo: { width: 64, height: 64, objectFit: 'cover', marginBottom: 12 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#e5e7eb', marginBottom: 6 },
  title: { color: '#9ca3af', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  contact: { fontSize: 9.5, marginBottom: 6 },
  sideTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#9ca3af', marginTop: 14, marginBottom: 6 },
  main: { width: '68%', paddingHorizontal: 24 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#374151', marginTop: 8, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#6b7280' },
  meta: { marginTop: 2, color: '#6b7280', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#111827', fontSize: 9.5 },
})

export function CarbonPdf({ data }: { data: CvData }) {
  const contact = previewContact(data)
  return (
    <Document>
      <Page size="A4" style={carbon.page}>
        <View fixed style={carbon.panelBg} />
        <View style={carbon.panel}>
          {data.photo ? <Image src={data.photo} style={carbon.photo} /> : null}
          <Text style={carbon.name}>{display(data.fullName, 'Your Name')}</Text>
          <Text style={carbon.title}>{display(data.title, 'Job Title')}</Text>
          {contact.map((item) => (
            <Text key={item} style={carbon.contact}>
              {item}
            </Text>
          ))}
          {hasSkills(data) ? (
            <>
              <Text style={carbon.sideTitle}>Skills</Text>
              {previewSkills(data.skills).map((skill) => (
                <Text key={skill} style={carbon.contact}>
                  {skill}
                </Text>
              ))}
            </>
          ) : null}
        </View>
        <View style={carbon.main}>
          {hasSummary(data) ? (
            <>
              <Text style={carbon.h2}>Summary</Text>
              <Text>{data.summary.trim()}</Text>
            </>
          ) : null}
          {hasExperience(data) ? (
            <>
              <Text style={carbon.h2}>Experience</Text>
              <Jobs bullet={carbon.bullet} data={data} dates={carbon.dates} heading={carbon.heading} meta={carbon.meta} />
            </>
          ) : null}
          {hasEducation(data) ? (
            <>
              <Text style={carbon.h2}>Education</Text>
              <Schools data={data} dates={carbon.dates} heading={carbon.heading} meta={carbon.meta} />
            </>
          ) : null}
          {hasProjects(data) ? (
            <>
              <Text style={carbon.h2}>Projects</Text>
              <Projects data={data} heading={carbon.heading} link={carbon.link} meta={carbon.meta} />
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

const sunriseGradient = {
  id: 'sunriseGrad',
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '0%',
  stops: [
    { offset: '0%', stopColor: '#fb923c' },
    { offset: '100%', stopColor: '#fdba74' },
  ],
}

const sunrise = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, color: '#4a2c1a', backgroundColor: '#fff8f2', paddingTop: 28, paddingBottom: 28 },
  banner: {
    position: 'relative',
    marginTop: -28,
    padding: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#3b1d0a' },
  title: { marginTop: 4, fontFamily: 'Helvetica-Bold' },
  contact: { marginTop: 6, fontSize: 9.5 },
  photo: { width: 58, height: 58, objectFit: 'cover' },
  body: { paddingHorizontal: 28, paddingTop: 20 },
  h2: { fontFamily: 'Helvetica-Bold', fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase', color: '#c2410c', marginTop: 10, marginBottom: 6 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  dates: { fontSize: 9.5, color: '#9a3412' },
  meta: { marginTop: 2, color: '#9a3412', fontSize: 10 },
  bullet: { marginTop: 2, marginLeft: 8, fontSize: 10 },
  link: { color: '#c2410c', fontSize: 9.5 },
})

export function SunrisePdf({ data }: { data: CvData }) {
  return <BannerPdf data={data} gradient={sunriseGradient} {...sunrise} />
}
