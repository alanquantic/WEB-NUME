'use client'

import { startTransition, useState } from 'react'

import { NumberResult } from '@/components/calculators/number-result'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Person from '@/resources/person'

export type CycleKind = 'year' | 'month' | 'week' | 'day' | 'stage'

const KIND_HINT: Record<CycleKind, string> = {
  year: 'Tu tema central durante este año.',
  month: 'La energía que acompaña tu mes actual.',
  week: 'El enfoque de tu semana en curso.',
  day: 'La vibración de tu día de hoy.',
  stage: 'La etapa de vida que atraviesas ahora.'
}

function compute(kind: CycleKind, birthDate: string): number | string | null {
  try {
    const person = new Person({ birthDate })
    const now = new Date()
    let value: number | string | false | undefined

    switch (kind) {
      case 'year':
        value = person.calcPersonalYear(new Date(now.getFullYear(), 0, 1))
        break
      case 'month':
        value = person.calcPersonalMonth(now, now)
        break
      case 'week':
        value = person.calcPersonalWeek(now)
        break
      case 'day':
        value = person.calcPersonalDay(now)
        break
      case 'stage':
        value = person.getLifeStage()
        break
      default:
        value = undefined
    }

    if (value === false || value === undefined || value === null || value === '') return null
    return value
  } catch {
    return null
  }
}

export function PersonalCycleCalculator({ kind }: { kind: CycleKind }) {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<number | string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(formData: FormData) {
    const next = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setResult(compute(kind, next))
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
          Calcular
        </Button>
      </form>

      {submitted && result !== null ? (
        <NumberResult value={result} intro={KIND_HINT[kind]} />
      ) : submitted ? (
        <p className="mt-4 text-sm text-foreground/60">
          Revisa la fecha ingresada para poder calcular este número.
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para calcular este número.
        </p>
      )}
    </div>
  )
}
