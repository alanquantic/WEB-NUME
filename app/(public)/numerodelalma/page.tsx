import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Número del Alma'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="numerodelalma"
      title="Número del Alma"
      description="Surge de las vocales de tu nombre y revela lo que tu corazón realmente anhela."
    >
      <NameNumberCalculator kind="soul" />
    </ToolPage>
  )
}
