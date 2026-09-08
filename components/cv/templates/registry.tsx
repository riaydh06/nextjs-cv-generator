import type { ComponentType } from 'react'

import type { CvTemplateId } from '@/lib/cv/templates'
import type { CvData } from '@/lib/cv/types'

import { AcademicCv } from './AcademicCv'
import { BoldCv } from './BoldCv'
import { ClassicCv } from './ClassicCv'
import { CompactCv } from './CompactCv'
import { CoralCv } from './CoralCv'
import { EditorialCv } from './EditorialCv'
import { ElegantCv } from './ElegantCv'
import { ExecutiveCv } from './ExecutiveCv'
import { MidnightCv } from './MidnightCv'
import { MinimalCv } from './MinimalCv'
import { ModernCv } from './ModernCv'
import {
  AtelierCv,
  AuroraCv,
  CanvasCv,
  CarbonCv,
  CedarCv,
  CopperCv,
  EmberCv,
  ForestCv,
  FrameCv,
  GlacierCv,
  HarborCv,
  IndustrialCv,
  InkCv,
  LegalCv,
  LinenCv,
  LumenCv,
  MetroCv,
  MonoCv,
  NordicCv,
  NovaCv,
  OceanCv,
  OrchidCv,
  PaperCv,
  PulseCv,
  QuartzCv,
  RibbonCv,
  SageCv,
  SplitCv,
  SummitCv,
  SunriseCv,
  AmberCv,
  CobaltCv,
  CrimsonCv,
  EmeraldCv,
  FuchsiaCv,
  GraphiteCv,
  MonacoCv,
  NordCv,
  SandstoneCv,
  TerracottaCv,
  FlareCv,
} from './more'
import { SlateCv } from './SlateCv'
import { TimelineCv } from './TimelineCv'

const PREVIEWS: Record<CvTemplateId, ComponentType<{ data: CvData }>> = {
  classic: ClassicCv,
  modern: ModernCv,
  minimal: MinimalCv,
  elegant: ElegantCv,
  bold: BoldCv,
  slate: SlateCv,
  timeline: TimelineCv,
  executive: ExecutiveCv,
  coral: CoralCv,
  compact: CompactCv,
  academic: AcademicCv,
  midnight: MidnightCv,
  editorial: EditorialCv,
  aurora: AuroraCv,
  forest: ForestCv,
  mono: MonoCv,
  frame: FrameCv,
  split: SplitCv,
  ribbon: RibbonCv,
  nordic: NordicCv,
  industrial: IndustrialCv,
  atelier: AtelierCv,
  summit: SummitCv,
  ocean: OceanCv,
  paper: PaperCv,
  metro: MetroCv,
  legal: LegalCv,
  canvas: CanvasCv,
  ember: EmberCv,
  harbor: HarborCv,
  lumen: LumenCv,
  quartz: QuartzCv,
  pulse: PulseCv,
  sage: SageCv,
  copper: CopperCv,
  ink: InkCv,
  glacier: GlacierCv,
  orchid: OrchidCv,
  cedar: CedarCv,
  nova: NovaCv,
  linen: LinenCv,
  carbon: CarbonCv,
  sunrise: SunriseCv,
  emerald: EmeraldCv,
  amber: AmberCv,
  cobalt: CobaltCv,
  terracotta: TerracottaCv,
  monaco: MonacoCv,
  fuchsia: FuchsiaCv,
  graphite: GraphiteCv,
  nord: NordCv,
  crimson: CrimsonCv,
  sandstone: SandstoneCv,
  flare: FlareCv,
}

export function CvTemplatePreview({ data, template }: { data: CvData; template: CvTemplateId }) {
  const Preview = PREVIEWS[template] ?? ClassicCv
  return <Preview data={data} />
}
