'use client'

import { useRef, useState } from 'react'

import mesPersonalData from '@/components/jsons/significados/mes-personal.json'
import { SaveResultButton } from '@/components/calculators/save-result-button'
import { Button } from '@/components/ui/button'
import { CountUp } from '@/components/ui/count-up'
import { Input } from '@/components/ui/input'
import Person from '@/resources/person'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
] as const

type MesPersonalBloque =
  | { tipo: 'titulo'; texto: string }
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'cita'; texto: string }
  | { tipo: 'lista'; items: string[] }

type MesPersonalEntry = {
  numero: number
  titulo: string
  bloques: MesPersonalBloque[]
}

const MEANINGS = mesPersonalData as Record<string, MesPersonalEntry>

type CalcResult = {
  value: number
  monthIndex: number
}

function MeaningBlocks({ entry }: { entry: MesPersonalEntry }) {
  return (
    <div className="space-y-5">
      {entry.bloques.map((bloque, index) => {
        if (bloque.tipo === 'titulo') {
          return (
            <h3 key={index} className="pt-2 font-display text-xl font-semibold text-primary">
              {bloque.texto}
            </h3>
          )
        }
        if (bloque.tipo === 'cita') {
          return (
            <blockquote
              key={index}
              className="rounded-2xl border border-primary/16 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.4),hsl(var(--card)))] p-5 text-center font-display text-lg italic leading-8 text-primary"
            >
              {bloque.texto}
            </blockquote>
          )
        }
        if (bloque.tipo === 'lista') {
          return (
            <ul key={index} className="grid gap-2.5">
              {bloque.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-base leading-8 text-foreground/78">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={index} className="text-base leading-8 text-foreground/78">
            {bloque.texto}
          </p>
        )
      })}
    </div>
  )
}

export function PersonalMonthCalculator() {
  const now = new Date()
  const [birthDate, setBirthDate] = useState('')
  const [monthIndex, setMonthIndex] = useState(now.getMonth())
  const [result, setResult] = useState<CalcResult | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)
  const meaningRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = (formData: FormData) => {
    const nextBirthDate = String(formData.get('birthDate') ?? '')
    const nextMonthIndex = Number(formData.get('targetMonth') ?? monthIndex)

    try {
      const person = new Person({ birthDate: nextBirthDate })
      const targetMonth = new Date(Date.UTC(now.getFullYear(), nextMonthIndex, 1, 12))
      const value = person.calcPersonalMonth(targetMonth, now)
      setResult(typeof value === 'number' ? { value, monthIndex: nextMonthIndex } : null)
    } catch {
      setResult(null)
    }
    setSubmitted(true)
    setShowMeaning(false)
  }

  const handleShowMeaning = () => {
    setShowMeaning(true)
    requestAnimationFrame(() => {
      meaningRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const meaning = result ? MEANINGS[String(result.value)] : undefined

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
        <form action={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm font-medium text-foreground/80">
            Fecha de nacimiento
            <Input
              name="birthDate"
              type="date"
              required
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="mt-2"
            />
          </label>
          <label className="flex-1 text-sm font-medium text-foreground/80">
            Mes que quieres conocer
            <select
              name="targetMonth"
              value={monthIndex}
              onChange={(event) => setMonthIndex(Number(event.target.value))}
              className="mt-2 flex h-11 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary"
            >
              {MONTHS.map((monthName, index) => (
                <option key={monthName} value={index}>
                  {monthName}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" className="sm:w-auto">
            Calcular
          </Button>
        </form>

        {submitted && result ? (
          <div
            key={`${result.value}-${result.monthIndex}`}
            className="animate-result-pop mt-6 rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.82),hsl(var(--primary)/0.12))] p-6"
          >
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
              <div className="relative shrink-0">
                <span
                  className="absolute -inset-2 rounded-full bg-gradient-brand opacity-30 blur-xl"
                  aria-hidden
                />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand font-display text-4xl font-semibold text-white shadow-glow">
                  <CountUp value={result.value} />
                </span>
              </div>
              <div>
                <p className="text-sm text-foreground/70">
                  Tu Mes Personal para {MONTHS[result.monthIndex]} es
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-primary">
                  Mes Personal {result.value}
                </p>
                <button
                  type="button"
                  onClick={handleShowMeaning}
                  className="mt-3 inline-flex items-center gap-1.5 text-base font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary"
                >
                  ¿Qué significa?
                </button>
              </div>
            </div>
            <div className="mt-5">
              <SaveResultButton label="Mes personal" value={result.value} />
            </div>
          </div>
        ) : submitted ? (
          <p className="mt-4 text-sm text-foreground/60">
            Revisa la fecha ingresada para poder calcular este número.
          </p>
        ) : (
          <p className="mt-4 text-sm text-foreground/60">
            Ingresa tu fecha de nacimiento, elige el mes que quieres conocer y presiona
            Calcular.
          </p>
        )}
      </div>

      {showMeaning && result ? (
        <section
          ref={meaningRef}
          className="scroll-mt-28 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8"
        >
          {meaning ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Mes Personal {meaning.numero}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {meaning.titulo}
              </h2>
              <div className="mt-6">
                <MeaningBlocks entry={meaning} />
              </div>
            </>
          ) : (
            <p className="text-base leading-8 text-foreground/72">
              El significado del Mes Personal {result.value} estará disponible muy pronto.
            </p>
          )}
        </section>
      ) : null}
    </div>
  )
}
