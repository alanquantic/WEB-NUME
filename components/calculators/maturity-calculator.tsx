'use client'

import { startTransition, useState } from 'react'

import { NumberResult } from '@/components/calculators/number-result'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { calculateMaturity } from '@/lib/numerology/maturity'

export function MaturityCalculator() {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(formData: FormData) {
    const name = String(formData.get('fullName') ?? '')
    const date = String(formData.get('birthDate') ?? '')
    startTransition(() => {
      setResult(calculateMaturity(name, date))
      setSubmitted(true)
    })
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <form action={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground/80">
          Nombre completo
          <Input
            name="fullName"
            type="text"
            required
            placeholder="Tu nombre completo"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-2"
          />
        </label>
        <label className="text-sm font-medium text-foreground/80">
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
        <div className="sm:col-span-2">
          <Button type="submit">Calcular madurez</Button>
        </div>
      </form>

      {submitted && result !== null ? (
        <NumberResult
          value={result}
          intro="Tu número de madurez revela hacia dónde madura tu propósito en la segunda mitad de la vida."
          saveLabel="Número de la madurez"
        />
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Combina tu nombre y tu fecha de nacimiento para obtener tu número de madurez.
        </p>
      )}
    </div>
  )
}
