import type { Metadata } from 'next'

import { PersonalCycleCalculator } from '@/components/calculators/personal-cycle-calculator'
import { ConceptExplainer } from '@/components/content/concept-explainer'
import { ToolPage } from '@/components/content/tool-page'
import { DIA_PERSONAL } from '@/lib/content/draft-name-day'

export const metadata: Metadata = {
  title: 'Día personal'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="diapersonal"
      wide
      title="Día personal"
      description="El día personal revela la vibración de tu jornada de hoy para que la aproveches mejor."
    >
      <div className="space-y-10">
        <PersonalCycleCalculator kind="day" />
        <ConceptExplainer concept={DIA_PERSONAL} />
      </div>
    </ToolPage>
  )
}
