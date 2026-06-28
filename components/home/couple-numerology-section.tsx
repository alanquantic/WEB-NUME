import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function CoupleNumerologySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,hsl(var(--primary)/0.94),hsl(var(--fuchsia)/0.86))] shadow-glow">
        <div className="grid items-center gap-8 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-12">
          <ScrollReveal>
            <div className="text-white">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                Lo más buscado
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Numerología de pareja
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/90">
                La numerología de pareja —también llamada sinastría— estudia la afinidad entre dos
                personas a partir de sus números. Te dice si son una pareja natural, complementaria,
                de aprendizaje o de reto.
              </p>
              <p className="mt-3 max-w-xl text-base leading-8 text-white/82">
                Suma los días de nacimiento de ambos, reduce el resultado y descubre la energía que
                comparten: dónde fluye la relación y dónde conviene poner conciencia.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/calculadoras/compatibilidad"
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
                >
                  Calcula tu compatibilidad
                </Link>
                <Link
                  href="/blog/como-se-relacionan-los-numeros-en-pareja"
                  className="inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Cómo se relacionan en pareja
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="overflow-hidden rounded-[1.75rem] shadow-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/my-mission.png"
                alt="Numerología de pareja"
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
