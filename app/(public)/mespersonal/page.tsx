import type { Metadata } from 'next'

import { PersonalCycleCalculator } from '@/components/calculators/personal-cycle-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Mes personal'
}

export default function Page() {
  return (
    <ToolPage
      title="Mes personal"
      description="El mes personal afina la energía de tu año y te muestra en qué enfocarte este mes."
    >
      <PersonalCycleCalculator kind="month" />
    </ToolPage>
  )
}
