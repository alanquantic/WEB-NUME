import type { Metadata } from 'next'

import { PersonalCycleCalculator } from '@/components/calculators/personal-cycle-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Etapa personal'
}

export default function Page() {
  return (
    <ToolPage
      title="Etapa personal"
      description="Las etapas personales son los grandes ciclos de vida. Descubre en cuál te encuentras y qué energía la rige."
    >
      <PersonalCycleCalculator kind="stage" />
    </ToolPage>
  )
}
