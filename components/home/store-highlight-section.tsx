import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { STORE_URL } from '@/lib/site-config'

type StoreCategory = {
  id: string
  title: string
  description: string
}

const STORE_CATEGORIES: readonly StoreCategory[] = [
  {
    id: 'agendas',
    title: 'Agendas',
    description: 'Agenda numerológica para planear tu año con propósito.'
  },
  {
    id: 'reportes',
    title: 'Reportes',
    description: 'Reportes personalizados: pareja, nombre y proyección.'
  },
  {
    id: 'cursos',
    title: 'Cursos',
    description: 'Aprende numerología paso a paso, a tu ritmo.'
  },
  {
    id: 'certificaciones',
    title: 'Certificaciones',
    description: 'Conviértete en Consultor Numerológico certificado.'
  }
]

export function StoreHighlightSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel md:p-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                Tienda
              </h2>
              <p className="mt-1 text-sm text-foreground/70">
                Agendas, reportes, cursos y certificaciones.
              </p>
            </div>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header-chip rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              <span className="relative z-10">Ver toda la tienda</span>
            </a>
          </div>
        </ScrollReveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORE_CATEGORIES.map((category, index) => (
            <ScrollReveal key={category.id} delay={80 + index * 70}>
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[1.6rem] border border-border/80 bg-[linear-gradient(180deg,hsl(var(--secondary)/0.5),hsl(var(--card)))] p-5 transition hover:-translate-y-1 hover:shadow-glow"
              >
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary">
                  {category.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Explorar →
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
