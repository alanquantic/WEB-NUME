'use client'

import { useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import Universal from '@/resources/universal'

type Vibration = {
  label: string
  value: number
}

function computeVibrations(dateValue: string): Vibration[] {
  const base = dateValue ? new Date(`${dateValue}T12:00:00`) : new Date()
  const universal = new Universal()
  const params = {
    day: base.getDate(),
    month: base.getMonth() + 1,
    year: base.getFullYear()
  }

  return [
    { label: 'Año universal', value: universal.calcUniversalYear(params.year) },
    { label: 'Mes universal', value: universal.calcUniversalMonth(params) },
    { label: 'Semana universal', value: universal.calcCurrentUniversalWeek(params) },
    { label: 'Día universal', value: universal.calcUniversalDay(params) }
  ]
}

export function CollectiveVibrations() {
  const [dateValue, setDateValue] = useState('')
  const vibrations = useMemo(() => computeVibrations(dateValue), [dateValue])

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <label className="block max-w-xs text-sm font-medium text-foreground/80">
        Elige una fecha (por defecto, hoy)
        <Input
          type="date"
          value={dateValue}
          onChange={(event) => setDateValue(event.target.value)}
          className="mt-2"
        />
      </label>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {vibrations.map((vibration) => (
          <div
            key={vibration.label}
            className="flex flex-col items-center rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.85),hsl(var(--primary)/0.12))] p-5 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-semibold text-white shadow-glow">
              {vibration.value}
            </span>
            <span className="mt-3 text-sm font-semibold text-foreground/75">{vibration.label}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-foreground/60">
        Las vibraciones colectivas son las energías que compartimos todos en una misma fecha, sin
        importar el nombre o la fecha de nacimiento.
      </p>
    </div>
  )
}
