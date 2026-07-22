'use client'

import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { startTransition, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CountUp } from '@/components/ui/count-up'
import { Input } from '@/components/ui/input'
import { addSavedResult } from '@/lib/saved-results'
import Pinnacle from '@/resources/pinnacle'

type DesafioKey = 'K' | 'L' | 'M' | 'N'
type Valores = Record<DesafioKey, number | string>

const DESAFIOS: { key: DesafioKey; label: string; sub: string }[] = [
  { key: 'K', label: '1er Desafío', sub: 'El contrato heredado de tu clan' },
  { key: 'L', label: '2º Desafío', sub: 'La confrontación de los mandatos' },
  { key: 'M', label: '3er Desafío', sub: 'La búsqueda de tu individuación' },
  { key: 'N', label: '4º Desafío', sub: 'La conquista de las oposiciones' }
]

function computeDesafios(birthDate: string): Valores | null {
  if (!birthDate) return null
  try {
    const pinnacle = new Pinnacle(birthDate)
    return {
      K: pinnacle.calcFirstGoal(),
      L: pinnacle.calcSecGoal(),
      M: pinnacle.calcThiGoal(),
      N: pinnacle.calcFourGoal()
    }
  } catch {
    return null
  }
}

function formatShortDate(value: string): string {
  const [year, month, day] = value.split('-')
  return day && month && year ? `${day}/${month}/${year}` : value
}

export function DesafiosCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [values, setValues] = useState<Valores | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState(false)

  // Precarga desde Mi carta: /calculadoras/desafios-de-vida?nacimiento=YYYY-MM-DD
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nacimiento = params.get('nacimiento')
    if (!nacimiento) return
    setBirthDate(nacimiento)
    startTransition(() => {
      setValues(computeDesafios(nacimiento))
      setSubmitted(true)
    })
  }, [])

  function handleSubmit(formData: FormData) {
    const next = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setValues(computeDesafios(next))
      setSubmitted(true)
      setSaved(false)
    })
  }

  function handleSave() {
    if (!values || !birthDate) return
    const detail = `Nacimiento: ${formatShortDate(birthDate)}`
    const href = `/calculadoras/desafios-de-vida?nacimiento=${birthDate}`
    DESAFIOS.forEach(({ key, label }) => {
      addSavedResult({ label: `${label} de vida`, value: String(values[key]), detail, href })
    })
    setSaved(true)
  }

  return (
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
        <Button type="submit" className="sm:w-auto">
          Calcular mis desafíos
        </Button>
      </form>

      {submitted && values ? (
        <div className="animate-result-pop mt-6 rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.82),hsl(var(--primary)/0.12))] p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DESAFIOS.map(({ key, label, sub }) => (
              <div
                key={key}
                className="flex flex-col items-center rounded-[1.5rem] border border-border/70 bg-card/80 p-5 text-center"
              >
                <div className="relative">
                  <span
                    className="absolute -inset-1.5 rounded-full bg-gradient-brand opacity-25 blur-lg"
                    aria-hidden
                  />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-semibold text-white shadow-glow">
                    <CountUp value={values[key]} />
                  </span>
                </div>
                <p className="mt-3 font-display text-sm font-semibold text-foreground">
                  {label} <span className="text-foreground/50">({key})</span>
                </p>
                <p className="mt-0.5 text-xs leading-5 text-foreground/55">{sub}</p>
                {typeof values[key] === 'number' ? (
                  <Link
                    href={`/significadodelosnumeros/reto-meta/${values[key]}` as Route}
                    className="mt-2 text-xs font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Ver significado
                  </Link>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={handleSave}
              disabled={saved}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft disabled:cursor-default disabled:opacity-70"
            >
              {saved ? (
                <>
                  <BookmarkCheck size={16} aria-hidden /> Guardado en Mi carta
                </>
              ) : (
                <>
                  <BookmarkPlus size={16} aria-hidden /> Guardar resultado
                </>
              )}
            </button>
          </div>
        </div>
      ) : submitted ? (
        <p className="mt-4 text-sm text-foreground/60">
          Revisa la fecha ingresada para poder calcular tus desafíos.
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para descubrir los 4 desafíos de tu vida.
        </p>
      )}
    </div>
  )
}
