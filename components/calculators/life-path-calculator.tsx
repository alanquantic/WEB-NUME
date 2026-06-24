'use client'

import { startTransition, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
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
    <Card className="max-w-2xl">
      <CardTitle>Calculadora de camino de vida</CardTitle>
      <CardDescription>
        La lógica numerológica vive fuera del componente para que sea testeable y reusable.
      </CardDescription>
      <CardContent className="grid gap-4">
        <form action={handleSubmit} className="grid gap-4">
          <Input
            name="birthDate"
            type="date"
            required
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
          <Button type="submit">Calcular</Button>
        </form>
        {result ? (
          <div className="rounded-3xl bg-[hsl(var(--secondary))] p-5">
            <p className="font-display text-3xl font-semibold">{result.lifePathNumber}</p>
            <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
              Suma base: {result.reducedFrom}
            </p>
            <p className="mt-1 text-sm text-[hsl(var(--foreground))/0.72]">
              Clave interpretativa: {result.explanationKey}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
