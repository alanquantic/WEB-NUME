'use client'

import { useState, useTransition } from 'react'
import type { Route } from 'next'
import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Person from '@/resources/person'
import Pinnacle from '@/resources/pinnacle'

type ResultCard = {
  id: 'personal-number' | 'soul-number' | 'personal-year'
  heading: string
  subtitle: string
  href: Route
  tone: 'essence' | 'mission' | 'year'
}

type FormState = {
  fullName: string
  birthDate: string
}

type CalculationResult = {
  personalNumber: number | string
  soulNumber: number | string
  personalYear: number | string
  personalDay: number | string
  personalWeek: number | string
  personalMonth: number | string
  pinnacleValues: Partial<Record<PinnacleLetter, number | string>>
}

type EnergyLabel = keyof typeof ENERGY_CARD_TONES

type PinnacleLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'W'

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
    heading: 'Mi año 2026',
    subtitle: 'Ano Personal',
    href: '/calculadoras/camino-de-vida',
    tone: 'year'
  }
] as const

const CARD_STYLES: Record<ResultCard['tone'], string> = {
  essence:
    "border border-border/70 bg-[linear-gradient(180deg,hsl(var(--secondary)/0.94),hsl(var(--background)/0.98)),url('/images/who-im.png')] text-primary shadow-[0_22px_55px_hsl(var(--primary)/0.08)]",
  mission:
    "bg-[linear-gradient(180deg,hsl(var(--primary)/0.66),hsl(var(--fuchsia)/0.7)),url('/images/my-mission.png')] text-white shadow-[0_24px_60px_hsl(var(--primary)/0.18)]",
  year:
    "border border-[hsl(var(--accent)/0.14)] bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.34),transparent_55%),linear-gradient(180deg,hsl(var(--background)/0.94),hsl(var(--accent)/0.2)),url('/images/personal-year-2.png')] text-[hsl(var(--accent))] shadow-[0_22px_55px_hsl(var(--accent)/0.14)]"
}

const ENERGY_CARD_TONES = {
  Dia: 'text-[hsl(var(--accent))]',
  Semana: 'text-[hsl(var(--chart-4))]',
  Mes: 'text-[hsl(var(--fuchsia))]'
} as const

const PINNACLE_POSITIONS: Record<PinnacleLetter, string> = {
  A: 'left-[10.2%] top-[42%]',
  B: 'left-[37.7%] top-[42%]',
  C: 'left-[65.7%] top-[42%]',
  D: 'left-[93%] top-[42%]',
  E: 'left-[24.5%] top-[30%]',
  F: 'left-[51.8%] top-[30%]',
  G: 'left-[37.9%] top-[17%]',
  H: 'left-[38.1%] top-[4%]',
  I: 'left-[38.2%] top-[29%]',
  J: 'left-[74%] top-[24%]',
  K: 'left-[24%] top-[56.5%]',
  L: 'left-[52.8%] top-[56.5%]',
  M: 'left-[38.2%] top-[67.5%]',
  N: 'left-[38.2%] top-[79.5%]',
  O: 'left-[38.2%] top-[56.5%]',
  P: 'left-[14.8%] top-[79.8%]',
  Q: 'left-[24.5%] top-[91.4%]',
  R: 'left-[38.2%] top-[91.4%]',
  S: 'left-[52.5%] top-[91.4%]',
  W: 'left-[6%] top-[67.9%]'
}

const INITIAL_FORM_STATE: FormState = {
  fullName: '',
  birthDate: ''
}

const INITIAL_RESULTS: CalculationResult = {
  personalNumber: '?',
  soulNumber: '?',
  personalYear: '?',
  personalDay: '?',
  personalWeek: '?',
  personalMonth: '?',
  pinnacleValues: {}
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

function sanitizeName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitFullName(fullName: string): { name: string; lastName: string } {
  const normalizedName = sanitizeName(fullName)
  const [name = '', ...rest] = normalizedName.split(' ')

  return {
    name,
    lastName: rest.join(' ')
  }
}

function parseDateInput(value: string): Date {
  const [year, month, day] = value.split('-').map((part) => parseInt(part, 10))
  return new Date(Date.UTC(year, month - 1, day, 12))
}

function formatPinnacleDate(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function normalizeValue(value: number | string | false | null | undefined): number | string {
  if (value === false || value === null || value === undefined || value === '') {
    return '?'
  }

  return value
}

function buildCalculationResult(formState: FormState): CalculationResult {
  const birthDate = parseDateInput(formState.birthDate)
  const { name, lastName } = splitFullName(formState.fullName)
  const person = new Person({
    name,
    lastName,
    birthDate
  })

  const currentYearDate = new Date(new Date().getFullYear(), 0, 1)
  const pinnacle = new Pinnacle(formatPinnacleDate(birthDate))

  return {
    personalNumber: normalizeValue(person.calcPersonalNumber()),
    soulNumber: normalizeValue(person.calcSoulNumber()),
    personalYear: normalizeValue(person.calcPersonalYear(currentYearDate)),
    personalDay: normalizeValue(person.calcPersonalDay(new Date())),
    personalWeek: normalizeValue(person.calcPersonalWeek(new Date())),
    personalMonth: normalizeValue(person.calcPersonalMonth(new Date(), new Date())),
    pinnacleValues: {
      A: normalizeValue(pinnacle.calcKarma()),
      B: normalizeValue(pinnacle.calcPersonalNumber()),
      C: normalizeValue(pinnacle.calcPastLife()),
      D: normalizeValue(pinnacle.calcPersonalityNumber()),
      E: normalizeValue(pinnacle.calcLifeCycle(1)),
      F: normalizeValue(pinnacle.calcLifeCycle(2)),
      G: normalizeValue(pinnacle.calcLifeCycle(3)),
      H: normalizeValue(pinnacle.calcLifeCycle(4)),
      I: normalizeValue(pinnacle.calcUnconsciousNumber()),
      J: normalizeValue(pinnacle.calcSubconsciousNumber()),
      K: normalizeValue(pinnacle.calcFirstGoal()),
      L: normalizeValue(pinnacle.calcSecGoal()),
      M: normalizeValue(pinnacle.calcThiGoal()),
      N: normalizeValue(pinnacle.calcFourGoal()),
      O: normalizeValue(pinnacle.calcNegativeUnconsciousNumber()),
      P: normalizeValue(pinnacle.calcShadeNumber()),
      Q: normalizeValue(pinnacle.calcFamilysLowerSelfNumber()),
      R: normalizeValue(pinnacle.calcConsciousLowerSelfNumber()),
      S: normalizeValue(pinnacle.calcLatentLowerSelfNumber()),
      W: normalizeValue(pinnacle.calcW())
    }
  }
}

export function NumerologyMapSection() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE)
  const [results, setResults] = useState(INITIAL_RESULTS)
  const [isCalculated, setIsCalculated] = useState(false)
  const [isPending, startTransition] = useTransition()

  const isFormComplete =
    formState.fullName.trim().length > 0 && formState.birthDate.trim().length > 0

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value
    }))
  }

  const handleReset = () => {
    setFormState(INITIAL_FORM_STATE)
    setResults(INITIAL_RESULTS)
    setIsCalculated(false)
  }

  const handleCalculate = () => {
    if (!isFormComplete) {
      return
    }

    startTransition(() => {
      const nextResults = buildCalculationResult(formState)
      setResults(nextResults)
      setIsCalculated(true)
    })
  }

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
                <label htmlFor="map-full-name" className="text-sm font-medium text-white/86">
                  Nombre Completo
                </label>
                <input
                  id="map-full-name"
                  type="text"
                  value={formState.fullName}
                  onChange={(event) => handleInputChange('fullName', event.target.value)}
                  placeholder="Tu nombre completo"
                  className="mt-2 h-11 w-full rounded-2xl border border-white/30 bg-white/92 px-4 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--gray))] outline-none transition focus:border-white/70 focus:bg-white"
                />
                <p className="mt-1.5 text-xs text-white/60">No utilizar tildes</p>
              </div>
              <div className="space-y-5">
                <div>
                  <label htmlFor="map-birth-date" className="text-sm font-medium text-white/86">
                    Fecha de Nacimiento
                  </label>
                  <input
                    id="map-birth-date"
                    type="date"
                    value={formState.birthDate}
                    onChange={(event) => handleInputChange('birthDate', event.target.value)}
                    className="mt-2 h-11 w-full rounded-2xl border border-white/30 bg-white/16 px-4 text-sm text-[#333] placeholder:text-white/50 focus:outline-none sm:text-[16px] outline-none transition focus:border-white/70 focus:bg-white/20"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={!isFormComplete || isPending}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-gradient-brand px-5 text-sm font-semibold text-white shadow-[0_14px_30px_hsl(var(--primary)/0.24)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
                  >
                    {isPending ? 'Calculando...' : 'Calcular'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/34 bg-white/10 px-6 text-sm font-semibold text-white/84 transition hover:bg-white/16"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div data-calculator-slot="mapa-resultados" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RESULT_CARDS.map((card, index) => {
            const value =
              card.id === 'personal-number'
                ? results.personalNumber
                : card.id === 'soul-number'
                  ? results.soulNumber
                  : results.personalYear

            return (
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
                  <span className="mt-5 font-display text-5xl font-semibold leading-none sm:mt-6 sm:text-6xl">
                    {value}
                  </span>
                  <CardLink href={card.href} />
                </article>
              </ScrollReveal>
            )
          })}

          <ScrollReveal delay={360}>
            <article
              data-result="energia-hoy"
              className="group flex min-h-[13rem] h-full flex-col rounded-[2rem] bg-[radial-gradient(circle_at_top,hsl(var(--card)/0.24),transparent_42%),linear-gradient(180deg,hsl(var(--royal-blue)/0.72),hsl(var(--primary)/0.88))] px-5 py-6 text-white shadow-[0_24px_60px_hsl(var(--royal-blue)/0.16)] transition hover:-translate-y-1 sm:min-h-[15rem] sm:px-6 sm:py-7"
            >
              <h3 className="font-display text-[1.2rem] font-semibold uppercase tracking-[0.03em] sm:text-[1.55rem]">
                Mi energia de hoy
              </h3>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center sm:mt-6 sm:gap-3">
                {([
                  { label: 'Dia', value: results.personalDay },
                  { label: 'Sem', value: results.personalWeek },
                  { label: 'Mes', value: results.personalMonth }
                ] as Array<{ label: EnergyLabel; value: number | string }>).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/8 px-2 py-3 backdrop-blur-sm"
                  >
                    <span
                      className={`block font-display text-3xl font-semibold leading-none sm:text-4xl ${ENERGY_CARD_TONES[item.label]}`}
                    >
                      {item.value}
                    </span>
                    <span className="mt-2 block text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/72 sm:text-[0.62rem] sm:tracking-[0.18em]">
                      {item.label}
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
              <div className="relative overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,hsl(var(--card)/0.84),hsl(var(--secondary)/0.7))]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isCalculated ? '/images/pinnacle.png' : '/images/pinnacle-pre.webp'}
                  alt="Vista del pinaculo"
                  className="h-full w-full object-cover"
                />
                {isCalculated && (
                  <div className="pointer-events-none absolute inset-0">
                    {(
                      Object.entries(PINNACLE_POSITIONS) as Array<[PinnacleLetter, string]>
                    ).map(([letter, positionClassName]) => (
                      <span
                        key={letter}
                        data-letter={letter}
                        className={`absolute inline-flex h-[1.85rem] w-[1.85rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-display text-[0.55rem] font-semibold leading-none text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:h-[2.1rem] sm:w-[2.1rem] sm:text-[1.08rem] ${positionClassName}`}
                      >
                        {results.pinnacleValues[letter] ?? ''}
                      </span>
                    ))}
                  </div>
                )}
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
