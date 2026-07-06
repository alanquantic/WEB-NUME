import type { Metadata } from 'next'

import { NumberExplorer } from '@/components/explore/number-explorer'

export const metadata: Metadata = {
  title: 'Explora por número',
  description:
    'Elige un número y descubre su significado, su luz y su reto, además de las calculadoras y artículos relacionados.'
}

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Explora por número</h1>
      <p className="mt-3 max-w-2xl text-base leading-8 text-foreground/72">
        Toca un número para descubrir su esencia, su luz y su reto —y de ahí salta a las
        calculadoras y artículos que lo revelan en tu vida.
      </p>
      <div className="mt-8">
        <NumberExplorer />
      </div>
    </div>
  )
}
