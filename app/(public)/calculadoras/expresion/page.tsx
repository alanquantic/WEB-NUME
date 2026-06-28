import type { Metadata } from 'next'

import { ExpressionCalculator } from '@/components/calculators/expression-calculator'
import { ToolPage } from '@/components/content/tool-page'

export const metadata: Metadata = {
  title: 'Número de expresión'
}

export default function ExpressionPage() {
  return (
    <ToolPage
      toolKey="expresion"
      title="Número de expresión"
      description="A partir de tu nombre completo obtienes tres claves: tu Expresión (destino), tu número del Alma (motivación) y tu Personalidad (cómo te perciben)."
    >
      <ExpressionCalculator />
    </ToolPage>
  )
}
