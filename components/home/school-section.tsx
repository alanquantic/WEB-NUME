import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function SchoolSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="overflow-hidden rounded-[2rem] bg-gradient-brand shadow-glow">
        <div className="grid min-h-[18rem] items-center gap-8 bg-[url('/images/escuela-numerologia.png')] bg-cover bg-center p-8 md:min-h-[30rem] md:grid-cols-[auto_1fr] md:px-10 md:py-12">
          <ScrollReveal delay={40} className="flex self-stretch md:min-h-full">
            <div className="mt-auto text-white text-center">
              <h2 className="font-display text-3xl font-semibold leading-tight">
                Escuela de Numerologia
              </h2>
              <p className="text-sm text-white/80">de Laura L. Rodriguez</p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className="max-w-2xl self-center rounded-[1.75rem] bg-[linear-gradient(135deg,hsl(0_0%_100%_/_0.05),hsl(0_0%_100%_/_0.02))] p-1 text-white md:justify-self-end"
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,hsl(var(--foreground)/0.14),transparent)] px-5 py-6 backdrop-blur-[2px] md:px-7 md:py-8">
              <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                Descifra tu codigo
              </h3>
              <p className="mt-3 max-w-xl text-base leading-8 text-white/88">
              Encuentra cursos para conocerte y entender tu proceso de vida. O conviertete en
              Consultor Numerologico con nuestra Especializacion.
              </p>
              <Link
                href="/membresias"
                className="mt-6 inline-flex rounded-full bg-accent px-7 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
              >
                Conocer mas
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
