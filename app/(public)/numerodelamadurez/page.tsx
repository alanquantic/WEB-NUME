import type { Metadata } from 'next'

import { MaturityCalculator } from '@/components/calculators/maturity-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Número de la Madurez'
}

export default function Page() {
  return (
    <ToolPage
      title="Número de la Madurez"
      description="Combina tu camino de vida y tu número de expresión para mostrar hacia dónde madura tu propósito."
    >
      <MaturityCalculator />
    </ToolPage>
  )
}
