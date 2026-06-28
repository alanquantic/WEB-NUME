import type { Metadata } from 'next'

import { LifePathCalculator } from '@/components/calculators/life-path-calculator'

export const metadata: Metadata = {
  title: 'Camino de vida'
}

export default function LifePathPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Camino de vida</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">
        Tu número de camino de vida revela tu propósito esencial. Se calcula a partir de tu
        fecha de nacimiento.
      </p>
      <div className="mt-8">
        <LifePathCalculator />
      </div>
    </div>
  )
}
