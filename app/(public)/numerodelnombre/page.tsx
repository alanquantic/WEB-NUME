import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Número del Nombre'
}

export default function Page() {
  return (
    <ToolPage
      title="Número del Nombre"
      description="También llamado número de expresión o destino. Resume tus talentos y la manera en que te muestras al mundo."
    >
      <NameNumberCalculator kind="expression" />
    </ToolPage>
  )
}
