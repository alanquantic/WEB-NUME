import type { Metadata } from 'next'

import { PinnacleCalculator } from '@/components/calculators/pinnacle-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Calcula tu Pináculo'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="calculatupinaculo"
      wide
      title="Calcula tu Pináculo"
      description="El pináculo personal reúne los números clave de tu mapa: karma, ciclos de vida, metas y más, a partir de tu fecha de nacimiento."
    >
      <PinnacleCalculator />
    </ToolPage>
  )
}
