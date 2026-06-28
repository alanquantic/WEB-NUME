import type { Route } from 'next'
import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'

type Tool = {
  href: string
  title: string
  description: string
}

const TOOLS: readonly Tool[] = [
  {
    href: '/calculatupinaculo',
    title: 'Tu Pináculo Personal',
    description: 'El mapa completo de tu vida en números: ciclos, metas y lecciones.'
  },
  {
    href: '/calculadoras/camino-de-vida',
    title: 'Camino de Vida',
    description: 'Tu propósito esencial a partir de tu fecha de nacimiento.'
  },
  {
    href: '/anopersonal',
    title: 'Año Personal',
    description: 'La energía que te acompaña durante todo el año.'
  },
  {
    href: '/numerodelnombre',
    title: 'Número del Nombre',
    description: 'Lo que tu nombre revela sobre tu destino y tus talentos.'
  }
]

export function FeaturedToolsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <ScrollReveal>
        <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
          Explora tus números
        </h2>
        <p className="mt-2 max-w-2xl text-base leading-8 text-foreground/72">
          Estas son las herramientas más buscadas de Numerología Cotidiana. Todas son gratuitas y se
          calculan al instante.
        </p>
      </ScrollReveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool, index) => (
          <ScrollReveal key={tool.href} delay={80 + index * 70}>
            <Link
              href={tool.href as Route}
              className="group flex h-full flex-col rounded-[1.7rem] border border-border/80 bg-card p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
            >
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary">
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">{tool.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Calcular →
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
