'use client'

import { startTransition, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Pinnacle from '@/resources/pinnacle'

type PinnacleItem = {
  label: string
  value: number | string
}

function format(value: number | undefined | ''): number | string {
  if (value === undefined || value === '') return '—'
  return value
}

function compute(birthDate: string): PinnacleItem[] | null {
  if (!birthDate) return null
  try {
    const pinnacle = new Pinnacle(birthDate)
    return [
      { label: 'Karma', value: format(pinnacle.calcKarma()) },
      { label: 'Número Personal', value: format(pinnacle.calcPersonalNumber()) },
      { label: 'Vida Pasada', value: format(pinnacle.calcPastLife()) },
      { label: 'Personalidad', value: format(pinnacle.calcPersonalityNumber()) },
      { label: 'Ciclo de vida 1', value: format(pinnacle.calcLifeCycle(1)) },
      { label: 'Ciclo de vida 2', value: format(pinnacle.calcLifeCycle(2)) },
      { label: 'Ciclo de vida 3', value: format(pinnacle.calcLifeCycle(3)) },
      { label: 'Ciclo de vida 4', value: format(pinnacle.calcLifeCycle(4)) },
      { label: 'Inconsciente', value: format(pinnacle.calcUnconsciousNumber()) },
      { label: 'Subconsciente', value: format(pinnacle.calcSubconsciousNumber()) },
      { label: 'Meta 1', value: format(pinnacle.calcFirstGoal()) },
      { label: 'Meta 2', value: format(pinnacle.calcSecGoal()) },
      { label: 'Meta 3', value: format(pinnacle.calcThiGoal()) },
      { label: 'Meta 4', value: format(pinnacle.calcFourGoal()) }
    ]
  } catch {
    return null
  }
}

export function PinnacleCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [items, setItems] = useState<PinnacleItem[] | null>(null)
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
          Calcular pináculo
        </Button>
      </form>

      {submitted && items ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-[1.4rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.85),hsl(var(--primary)/0.1))] p-4 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand font-display text-xl font-semibold text-white shadow-glow">
                {item.value}
              </span>
              <span className="mt-2 text-xs font-semibold text-foreground/70">{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para revelar los números de tu pináculo personal.
        </p>
      )}
    </div>
  )
}
