'use client'

import { startTransition, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getMeaning } from '@/lib/numerology/meanings'
import Person from '@/resources/person'

type CompassItem = {
  label: string
  value: number | string
  meaning: string
}

function toDisplay(value: number | string | false | undefined): number | string {
  if (value === false || value === undefined || value === null || value === '') return '—'
  return value
}

function meaningFor(value: number | string): string {
  return typeof value === 'number' ? getMeaning(value).title : ''
}

function compute(birthDate: string): CompassItem[] | null {
  if (!birthDate) return null
  try {
    const person = new Person({ birthDate })
    const now = new Date()

    const year = toDisplay(person.calcPersonalYear(new Date(now.getFullYear(), 0, 1)))
    const month = toDisplay(person.calcPersonalMonth(now, now))
    const week = toDisplay(person.calcPersonalWeek(now))
    const day = toDisplay(person.calcPersonalDay(now))
    const stage = toDisplay(person.getLifeStage())

    return [
      { label: 'Etapa personal', value: stage, meaning: meaningFor(stage) },
      { label: 'Año personal', value: year, meaning: meaningFor(year) },
      { label: 'Mes personal', value: month, meaning: meaningFor(month) },
      { label: 'Semana personal', value: week, meaning: meaningFor(week) },
      { label: 'Día personal', value: day, meaning: meaningFor(day) }
    ]
  } catch {
    return null
  }
}

export function PersonalCompass() {
  const [birthDate, setBirthDate] = useState('')
  const [items, setItems] = useState<CompassItem[] | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(formData: FormData) {
    const next = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setItems(compute(next))
      setSubmitted(true)
    })
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
          Ver mi brújula
        </Button>
      </form>

      {submitted && items ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.85),hsl(var(--primary)/0.1))] p-5 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand font-display text-2xl font-semibold text-white shadow-glow">
                {item.value}
              </span>
              <span className="mt-3 text-sm font-semibold text-primary">{item.label}</span>
              {item.meaning ? (
                <span className="mt-1 text-xs text-foreground/60">{item.meaning}</span>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para ver, en un vistazo, tus vibraciones de tiempo.
        </p>
      )}
    </div>
  )
}
