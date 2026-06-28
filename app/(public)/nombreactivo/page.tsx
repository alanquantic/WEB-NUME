import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Nombre Activo'
}

export default function Page() {
  return (
    <ToolPage
      title="Nombre Activo"
      description="Es la energía de tu primer nombre, el que usas a diario y con el que te identificas."
    >
      <NameNumberCalculator kind="active" />
    </ToolPage>
  )
}
