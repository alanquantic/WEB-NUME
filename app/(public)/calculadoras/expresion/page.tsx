import type { Metadata } from 'next'

import { ExpressionCalculator } from '@/components/calculators/expression-calculator'

export const metadata: Metadata = {
  title: 'Número de expresión'
}

export default function ExpressionPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Número de expresión</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">
        A partir de tu nombre completo obtienes tres claves: tu Expresión (destino), tu número
        del Alma (motivación) y tu Personalidad (cómo te perciben).
      </p>
      <div className="mt-8">
        <ExpressionCalculator />
      </div>
    </div>
  )
}
