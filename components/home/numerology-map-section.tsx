import type { Route } from 'next'
import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'

type ResultCard = {
  id: string
  heading: string
  subtitle: string
  href: Route
  tone: 'essence' | 'mission' | 'year'
}

const RESULT_CARDS: readonly ResultCard[] = [
  {
    id: 'personal-number',
    heading: 'Mi esencia',
    subtitle: 'Numero Personal',
    href: '/calculadoras/camino-de-vida',
    tone: 'essence'
  },
  {
    id: 'soul-number',
    heading: 'Mi mision',
    subtitle: 'Numero del Alma',
    href: '/calculadoras/expresion',
    tone: 'mission'
  },
  {
    id: 'personal-year',
    heading: 'Mi ano 2026',
    subtitle: 'Ano Personal',
    href: '/calculadoras/camino-de-vida',
    tone: 'year'
  }
]

const CARD_STYLES: Record<ResultCard['tone'], string> = {
  essence:
    "border border-border/70 bg-[linear-gradient(180deg,hsl(var(--secondary)/0.94),hsl(var(--background)/0.98)),url('/images/who-im.png')] text-primary shadow-[0_22px_55px_hsl(var(--primary)/0.08)]",
  mission:
    "bg-[linear-gradient(180deg,hsl(var(--primary)/0.66),hsl(var(--fuchsia)/0.7)),url('/images/my-mission.png')] text-white shadow-[0_24px_60px_hsl(var(--primary)/0.18)]",
  year:
    "border border-[hsl(var(--accent)/0.14)] bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.34),transparent_55%),linear-gradient(180deg,hsl(var(--background)/0.94),hsl(var(--accent)/0.2)),url('/images/personal-year-2.png')] text-[hsl(var(--accent))] shadow-[0_22px_55px_hsl(var(--accent)/0.14)]"
}

function CardLink({ href }: { href: Route }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 transition hover:underline"
    >
      Ver mas
    </Link>
  )
}

export function NumerologyMapSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-2xl font-semibold leading-tight text-balance sm:text-3xl md:text-5xl">
          <span className="text-gradient-brand">Comienza a conocerte</span> a traves de
          Numerologia Cotidiana
        </h1>
      </ScrollReveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.5fr_1.02fr]">
        <ScrollReveal delay={70} className="h-full">
          <div
            data-calculator-slot="mapa-form"
            className="flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,hsl(var(--foreground)/0.34),hsl(var(--primary)/0.24)),url('/images/form-bk.png')] bg-contain bg-center p-5 text-white shadow-[0_24px_60px_hsl(var(--foreground)/0.12)] backdrop-blur sm:min-h-[31rem] sm:p-6"
          >
            <h2 className="font-display text-[1.45rem] font-semibold uppercase tracking-[0.03em] text-white sm:text-[1.7rem]">
              Mi Mapa <span className="block">Numerologico</span>
            </h2>
            <div className="mt-6 flex flex-1 flex-col justify-center gap-5">
              <div>
                <label className="text-sm font-medium text-white/86">Nombre Completo</label>
                <input
                  type="text"
                  disabled
                  placeholder="Tu nombre completo"
                  className="mt-2 h-11 w-full rounded-2xl border border-white/30 bg-white/16 px-4 text-sm text-white placeholder:text-white/50"
                />
                <p className="mt-1.5 text-xs text-white/60">No utilizar tildes</p>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-white/86">Fecha de Nacimiento</label>
                  <input
                    type="text"
                    disabled
                    placeholder="DD/MM/AAAA"
                    className="mt-2 h-11 w-full rounded-2xl border border-white/30 bg-white/16 px-4 text-sm text-white placeholder:text-white/50"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <span className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-gradient-brand px-5 text-sm font-semibold text-white shadow-[0_14px_30px_hsl(var(--primary)/0.24)]">
                    Calcular
                  </span>
                  <span className="inline-flex h-11 items-center justify-center rounded-full border border-white/34 bg-white/10 px-6 text-sm font-semibold text-white/84">
                    Borrar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div data-calculator-slot="mapa-resultados" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RESULT_CARDS.map((card, index) => (
            <ScrollReveal key={card.id} delay={120 + index * 80}>
              <article
                data-result={card.id}
                className={`group flex min-h-[13rem] h-full flex-col items-center justify-center rounded-[2rem] bg-cover bg-center bg-no-repeat px-5 py-6 text-center transition hover:-translate-y-1 sm:min-h-[15rem] sm:px-6 sm:py-7 ${CARD_STYLES[card.tone]}`}
              >
                <h3
                  className={`font-display text-[0.98rem] font-semibold uppercase tracking-[0.03em] sm:text-[1.05rem] ${
                    card.tone === 'mission' ? 'text-white' : ''
                  }`}
                >
                  {card.heading}
                </h3>
                <p
                  className={`mt-1 text-[0.95rem] ${
                    card.tone === 'mission' ? 'text-white/82' : 'opacity-82'
                  }`}
                >
                  {card.subtitle}
                </p>
                <span className="mt-5 font-display text-5xl font-semibold leading-none sm:mt-6 sm:text-6xl">?</span>
                <CardLink href={card.href} />
              </article>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={360}>
            <article
              data-result="energia-hoy"
              className="group flex min-h-[13rem] h-full flex-col rounded-[2rem] bg-[radial-gradient(circle_at_top,hsl(var(--card)/0.24),transparent_42%),linear-gradient(180deg,hsl(var(--royal-blue)/0.72),hsl(var(--primary)/0.88))] px-5 py-6 text-white shadow-[0_24px_60px_hsl(var(--royal-blue)/0.16)] transition hover:-translate-y-1 sm:min-h-[15rem] sm:px-6 sm:py-7"
            >
              <h3 className="font-display text-[1.2rem] font-semibold uppercase tracking-[0.03em] sm:text-[1.55rem]">
                Mi energia de hoy
              </h3>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center sm:mt-6 sm:gap-3">
                {['Dia', 'Semana', 'Mes'].map((label) => (
                  <div key={label} className="rounded-2xl bg-white/8 px-2 py-3 backdrop-blur-sm">
                    <span className="block font-display text-3xl font-semibold leading-none sm:text-4xl">?</span>
                    <span className="mt-2 block text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/72 sm:text-[0.62rem] sm:tracking-[0.18em]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/calculadoras"
                className="mt-auto inline-flex w-fit text-sm font-semibold underline-offset-4 transition hover:underline"
              >
                Ver mas
              </Link>
            </article>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={180}>
          <div
            data-calculator-slot="mapa-pinaculo"
            className="flex flex-col rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,hsl(var(--secondary)/0.74),hsl(var(--card)/0.94))] p-5 text-center shadow-[0_22px_55px_hsl(var(--primary)/0.08)] sm:p-6"
          >
            <h3 className="font-display text-[1.4rem] font-semibold uppercase tracking-[0.03em] text-primary sm:text-[1.7rem]">
              Mi Pinaculo
            </h3>
            <p className="mt-1 text-sm text-[hsl(var(--gray))]">Descubre tu Pinaculo Personal</p>
            <div className="mt-5 overflow-hidden rounded-[1.65rem] bg-white/66 p-3 shadow-[inset_0_1px_0_hsl(var(--card)/0.6)]">
              <div className="overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,hsl(var(--card)/0.84),hsl(var(--secondary)/0.7))]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/pinnacle-pre.webp"
                  alt="Vista previa del pinaculo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <Link
              href="/calculadoras"
              className="mt-6 inline-flex justify-center text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
            >
              Ver mas
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
