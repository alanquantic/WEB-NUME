import type { Route } from 'next'
import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ToolIconTile } from '@/components/ui/tool-icon'

type Tool = {
  href: string
  title: string
  description: string
}

const FEATURED = {
  href: '/calculatupinaculo',
  title: 'Tu Pináculo Personal',
  description:
    'El mapa completo de tu vida en números: tus ciclos, metas y lecciones. El estudio más profundo de tu carta numerológica.'
}

const TOOLS: readonly Tool[] = [
  {
    href: '/calculadoras/camino-de-vida',
    title: 'Camino de Vida',
    description: 'Tu propósito esencial desde tu fecha de nacimiento.'
  },
  {
    href: '/numerologia-de-pareja',
    title: 'Numerología de Pareja',
    description: 'Tu compatibilidad en el amor y las relaciones.'
  },
  {
    href: '/anopersonal',
    title: 'Año Personal',
    description: 'La energía que te acompaña durante todo el año.'
  },
  {
    href: '/numerodelnombre',
    title: 'Número del Nombre',
    description: 'Lo que tu nombre revela sobre tu destino.'
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        <ScrollReveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <Link
            href={FEATURED.href as Route}
            className="group flex h-full flex-col justify-between rounded-[1.8rem] border border-border/80 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.75),hsl(var(--card)))] p-7 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div>
              <ToolIconTile href={FEATURED.href} className="h-14 w-14" size={28} />
              <h3 className="mt-5 font-display text-2xl font-semibold text-foreground group-hover:text-primary">
                {FEATURED.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-7 text-foreground/72">
                {FEATURED.description}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Calcular mi pináculo →
            </span>
          </Link>
        </ScrollReveal>

        {TOOLS.map((tool, index) => (
          <ScrollReveal key={tool.href} delay={80 + index * 60}>
            <Link
              href={tool.href as Route}
              className="group flex h-full flex-col rounded-[1.7rem] border border-border/80 bg-card p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
            >
              <ToolIconTile href={tool.href} />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground group-hover:text-primary">
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">{tool.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Calcular →
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
