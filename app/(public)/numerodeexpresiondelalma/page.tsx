import type { Metadata } from 'next'

import { NameNumberCalculator } from '@/components/calculators/name-number-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Número de Expresión del Alma'
}

export default function Page() {
  return (
    <ToolPage
      toolKey="numerodeexpresiondelalma"
      title="Número de Expresión del Alma"
      description="Surge de las consonantes de tu nombre y refleja la imagen que proyectas hacia afuera."
    >
      <NameNumberCalculator kind="personality" />
    </ToolPage>
  )
}
