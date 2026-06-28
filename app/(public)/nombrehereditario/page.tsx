import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Nombre Hereditario'
}

export default function Page() {
  return (
    <ToolPage
      title="Nombre Hereditario"
      description="Es la vibración de tus apellidos: la herencia familiar que traes contigo."
    >
      <NameNumberCalculator kind="hereditary" />
    </ToolPage>
  )
}
