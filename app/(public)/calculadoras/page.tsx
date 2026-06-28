import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calculadoras'
}

const CALCULATORS = [
  {
    href: '/calculadoras/camino-de-vida',
    title: 'Camino de vida',
    description: 'Tu número raíz a partir de tu fecha de nacimiento.'
  },
  {
    href: '/calculadoras/expresion',
    title: 'Expresión',
    description: 'Tus números del nombre: expresión, alma y personalidad.'
  },
  {
    href: '/calculadoras/compatibilidad',
    title: 'Compatibilidad',
    description: 'La afinidad numerológica entre dos personas.'
  }
] as const

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold text-balance">Calculadoras</h1>
      <p className="mt-3 max-w-2xl text-base leading-8 text-foreground/72">
        Herramientas gratuitas para explorar tu numerología. Elige una para comenzar.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {CALCULATORS.map((calculator) => (
          <Link
            key={calculator.href}
            href={calculator.href as Route}
            className="group flex flex-col rounded-[1.8rem] border border-border/80 bg-card p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
          >
            <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">
              {calculator.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">
              {calculator.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Abrir →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
