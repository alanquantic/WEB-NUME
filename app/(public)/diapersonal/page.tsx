import type { Metadata } from 'next'

import { PersonalCycleCalculator } from '@/components/calculators/personal-cycle-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Día personal'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="diapersonal"
      title="Día personal"
      description="El día personal revela la vibración de tu jornada de hoy para que la aproveches mejor."
    >
      <PersonalCycleCalculator kind="day" />
    </ToolPage>
  )
}
