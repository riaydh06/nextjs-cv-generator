import type { CvData } from '@/lib/cv/types'

import atelier from './AtelierCv.module.css'
import aurora from './AuroraCv.module.css'
import canvas from './CanvasCv.module.css'
import carbon from './CarbonCv.module.css'
import cedar from './CedarCv.module.css'
import copper from './CopperCv.module.css'
import { CvSkinSheet } from './CvSkin'
import ember from './EmberCv.module.css'
import forest from './ForestCv.module.css'
import frame from './FrameCv.module.css'
import glacier from './GlacierCv.module.css'
import harbor from './HarborCv.module.css'
import industrial from './IndustrialCv.module.css'
import ink from './InkCv.module.css'
import legal from './LegalCv.module.css'
import linen from './LinenCv.module.css'
import lumen from './LumenCv.module.css'
import metro from './MetroCv.module.css'
import mono from './MonoCv.module.css'
import nordic from './NordicCv.module.css'
import nova from './NovaCv.module.css'
import ocean from './OceanCv.module.css'
import orchid from './OrchidCv.module.css'
import paper from './PaperCv.module.css'
import pulse from './PulseCv.module.css'
import quartz from './QuartzCv.module.css'
import ribbon from './RibbonCv.module.css'
import sage from './SageCv.module.css'
import split from './SplitCv.module.css'
import summit from './SummitCv.module.css'
import sunrise from './SunriseCv.module.css'
import amber from './AmberCv.module.css'
import cobalt from './CobaltCv.module.css'
import crimson from './CrimsonCv.module.css'
import emerald from './EmeraldCv.module.css'
import fuchsia from './FuchsiaCv.module.css'
import graphite from './GraphiteCv.module.css'
import monaco from './MonacoCv.module.css'
import nord from './NordCv.module.css'
import sandstone from './SandstoneCv.module.css'
import terracotta from './TerracottaCv.module.css'
import flare from './FlareCv.module.css'

export function AuroraCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={aurora} />
}

export function ForestCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="stripe" styles={forest} />
}

export function MonoCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={mono} />
}

export function FrameCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={frame} />
}

export function SplitCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="split" styles={split} />
}

export function RibbonCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={ribbon} />
}

export function NordicCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={nordic} />
}

export function IndustrialCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={industrial} />
}

export function AtelierCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={atelier} />
}

export function SummitCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={summit} />
}

export function OceanCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={ocean} />
}

export function PaperCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={paper} />
}

export function MetroCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="stripe" styles={metro} />
}

export function LegalCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={legal} />
}

export function CanvasCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={canvas} />
}

export function EmberCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={ember} />
}

export function HarborCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="split" styles={harbor} />
}

export function LumenCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={lumen} />
}

export function QuartzCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={quartz} />
}

export function PulseCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={pulse} />
}

export function SageCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={sage} />
}

export function CopperCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={copper} />
}

export function InkCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={ink} />
}

export function GlacierCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={glacier} />
}

export function OrchidCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={orchid} />
}

export function CedarCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="stripe" styles={cedar} />
}

export function NovaCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={nova} />
}

export function LinenCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={linen} />
}

export function CarbonCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="split" styles={carbon} />
}

export function SunriseCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={sunrise} />
}

export function EmeraldCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={emerald} />
}

export function AmberCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={amber} />
}

export function CobaltCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="stripe" styles={cobalt} />
}

export function TerracottaCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={terracotta} />
}

export function MonacoCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="split" styles={monaco} />
}

export function FuchsiaCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={fuchsia} />
}

export function GraphiteCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={graphite} />
}

export function NordCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} styles={nord} />
}

export function CrimsonCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="stripe" styles={crimson} />
}

export function SandstoneCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={sandstone} />
}

export function FlareCv({ data }: { data: CvData }) {
  return <CvSkinSheet data={data} layout="banner" styles={flare} />
}
