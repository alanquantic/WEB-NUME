'use client'

import { useState } from 'react'

import { NumberResult } from '@/components/calculators/number-result'
import { KeepExploring, type ExploreLink } from '@/components/content/keep-exploring'

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]

function exploreLinksFor(value: number): ExploreLink[] {
  const isMaster = value === 11 || value === 22 || value === 33
  const article = isMaster
    ? { href: '/blog/nacer-un-dia-11-o-29', title: 'La diferencia de nacer un día 11 o 29' }
    : { href: '/blog/numero-personal-tu-esencia', title: 'El Número Personal: tu esencia' }

  return [
    {
      href: '/calculadoras/camino-de-vida',
      title: 'Calcula tu camino de vida',
      description: '¿Aparece este número en tu carta?'
    },
    {
      href: '/calculadoras/expresion',
      title: 'Tus números del nombre',
      description: 'Expresión, alma y personalidad.'
    },
    {
      href: '/calculatupinaculo',
      title: 'Tu pináculo',
      description: 'El mapa completo de tu vida.'
    },
    { href: article.href, title: article.title, description: 'Sigue leyendo en el blog.' }
  ]
}

export function NumberExplorer() {
  const [selected, setSelected] = useState(1)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {NUMBERS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setSelected(value)}
            aria-pressed={selected === value}
            className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-semibold transition ${
              selected === value
                ? 'bg-gradient-brand text-white shadow-glow'
                : 'border border-border bg-card text-foreground/75 hover:bg-primary-soft hover:text-primary'
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <NumberResult value={selected} />

      <KeepExploring title="Lleva tu número a la práctica" links={exploreLinksFor(selected)} />
    </div>
  )
}
