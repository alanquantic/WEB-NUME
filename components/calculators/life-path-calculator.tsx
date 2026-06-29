'use client'

import { startTransition, useState } from 'react'

import { NumberResult } from '@/components/calculators/number-result'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { calculateLifePath } from '@/lib/numerology/life-path'
import type { LifePathResult } from '@/lib/numerology/types'

export function LifePathCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<LifePathResult | null>(null)

  function handleSubmit(formData: FormData) {
    const nextBirthDate = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setResult(calculateLifePath({ birthDate: nextBirthDate }))
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

      {result ? (
        <NumberResult
          value={result.lifePathNumber}
          intro="Tu número de camino de vida revela el propósito esencial con el que llegaste a esta vida."
          saveLabel="Camino de vida"
        />
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para descubrir tu número de camino de vida.
        </p>
      )}
    </div>
  )
}
