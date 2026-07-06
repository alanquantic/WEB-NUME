import type { Metadata } from 'next'

import { LifePathCalculator } from '@/components/calculators/life-path-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Camino de vida'
}

export default function LifePathPage() {
  return (
    <ToolPage
      toolKey="camino-de-vida"
      title="Camino de vida"
      description="Tu número de camino de vida revela tu propósito esencial. Se calcula a partir de tu fecha de nacimiento."
    >
      <LifePathCalculator />
    </ToolPage>
  )
}
