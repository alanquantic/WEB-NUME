'use client'

import { startTransition, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  calculateCompatibility,
  type CompatibilityResult
} from '@/lib/numerology/compatibility'

export function CompatibilityCalculator() {
  const [dateA, setDateA] = useState('')
  const [dateB, setDateB] = useState('')
  const [result, setResult] = useState<CompatibilityResult | null>(null)

  function handleSubmit(formData: FormData) {
    const a = String(formData.get('dateA') ?? '')
    const b = String(formData.get('dateB') ?? '')
    startTransition(() => {
      setResult(calculateCompatibility(a, b))
    })
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <form action={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground/80">
          Fecha de la persona 1
          <Input
            name="dateA"
            type="date"
            required
            value={dateA}
            onChange={(event) => setDateA(event.target.value)}
            className="mt-2"
          />
        </label>
        <label className="text-sm font-medium text-foreground/80">
          Fecha de la persona 2
          <Input
            name="dateB"
            type="date"
            required
            value={dateB}
            onChange={(event) => setDateB(event.target.value)}
            className="mt-2"
          />
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Calcular compatibilidad</Button>
        </div>
      </form>

      {result ? (
        <div className="mt-6 rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.85),hsl(var(--primary)/0.12))] p-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-semibold text-white shadow-glow">
              {result.numberA}
            </span>
            <span className="font-display text-2xl text-primary">+</span>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-semibold text-white shadow-glow">
              {result.numberB}
            </span>
          </div>
          <p className="mt-4 font-display text-2xl font-semibold text-primary">{result.label}</p>
          <p className="mt-2 text-sm leading-7 text-foreground/75">{result.description}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa dos fechas de nacimiento para ver su afinidad numerológica.
        </p>
      )}
    </div>
  )
}
