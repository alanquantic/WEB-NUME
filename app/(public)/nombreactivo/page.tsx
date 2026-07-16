import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ConceptExplainer } from '@/components/content/concept-explainer'
import { ToolPage } from '@/components/content/tool-page'
import { NOMBRE_ACTIVO } from '@/lib/content/draft-name-day'

export const metadata: Metadata = {
  title: 'Nombre Activo'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="nombreactivo"
      wide
      title="Nombre Activo"
      description="Es la energía de tu primer nombre, el que usas a diario y con el que te identificas."
    >
      <div className="space-y-10">
        <NameNumberCalculator kind="active" />
        <ConceptExplainer concept={NOMBRE_ACTIVO} draft />
      </div>
    </ToolPage>
  )
}
