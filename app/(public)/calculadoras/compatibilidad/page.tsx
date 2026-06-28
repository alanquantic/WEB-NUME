import type { Metadata } from 'next'

import { CompatibilityCalculator } from '@/components/calculators/compatibility-calculator'

export const metadata: Metadata = {
  title: 'Compatibilidad'
}

export default function CompatibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Compatibilidad</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">
        Descubre la afinidad numerológica entre dos personas comparando sus números de camino
        de vida.
      </p>
      <div className="mt-8">
        <CompatibilityCalculator />
      </div>
    </div>
  )
}
