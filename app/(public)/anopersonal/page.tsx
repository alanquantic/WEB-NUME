import type { Metadata } from 'next'

import { PersonalCycleCalculator } from '@/components/calculators/personal-cycle-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Año personal'
}

export default function Page() {
  return (
    <ToolPage
      title="Año personal"
      description="Tu año personal marca el tema y las oportunidades de tu ciclo anual. Se calcula con tu fecha de nacimiento y el año en curso."
    >
      <PersonalCycleCalculator kind="year" />
    </ToolPage>
  )
}
