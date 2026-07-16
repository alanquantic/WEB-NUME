import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ConceptExplainer } from '@/components/content/concept-explainer'
import { ToolPage } from '@/components/content/tool-page'
import { NUMERO_NOMBRE } from '@/lib/content/draft-name-day'

export const metadata: Metadata = {
  title: 'Número del Nombre'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="numerodelnombre"
      wide
      title="Número del Nombre"
      description="También llamado número de expresión o destino. Resume tus talentos y la manera en que te muestras al mundo."
    >
      <div className="space-y-10">
        <NameNumberCalculator kind="expression" />
        <ConceptExplainer concept={NUMERO_NOMBRE} />
      </div>
    </ToolPage>
  )
}
