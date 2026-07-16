import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ConceptExplainer } from '@/components/content/concept-explainer'
import { ToolPage } from '@/components/content/tool-page'
import { NOMBRE_HEREDITARIO } from '@/lib/content/draft-name-day'

export const metadata: Metadata = {
  title: 'Nombre Hereditario'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="nombrehereditario"
      wide
      title="Nombre Hereditario"
      description="Es la vibración de tus apellidos: la herencia familiar que traes contigo."
    >
      <div className="space-y-10">
        <NameNumberCalculator kind="hereditary" />
        <ConceptExplainer concept={NOMBRE_HEREDITARIO} draft />
      </div>
    </ToolPage>
  )
}
