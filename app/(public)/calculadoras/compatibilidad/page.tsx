import type { Metadata } from 'next'

import { CompatibilityCalculator } from '@/components/calculators/compatibility-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Compatibilidad'
}

export default function CompatibilityPage() {
  return (
    <ToolPage
      toolKey="compatibilidad"
      title="Compatibilidad"
      description="Descubre la afinidad numerológica entre dos personas comparando sus números de camino de vida."
    >
      <CompatibilityCalculator />
    </ToolPage>
  )
}
