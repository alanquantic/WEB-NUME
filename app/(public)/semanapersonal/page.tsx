import type { Metadata } from 'next'

import { PersonalCycleCalculator } from '@/components/calculators/personal-cycle-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Semana personal'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="semanapersonal"
      title="Semana personal"
      description="La semana personal te da un enfoque más cercano para organizar tus próximos días."
    >
      <PersonalCycleCalculator kind="week" />
    </ToolPage>
  )
}
