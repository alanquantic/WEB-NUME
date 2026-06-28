'use client'

import { startTransition, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { calculateExpression, type ExpressionResult } from '@/lib/numerology/expression'
import { getMeaning } from '@/lib/numerology/meanings'

const TILES = [
  { key: 'expression', label: 'Expresión', hint: 'Tu destino y talentos' },
  { key: 'soul', label: 'Alma', hint: 'Tu motivación interna' },
  { key: 'personality', label: 'Personalidad', hint: 'Cómo te perciben' }
] as const

export function ExpressionCalculator() {
  const [fullName, setFullName] = useState('')
  const [result, setResult] = useState<ExpressionResult | null>(null)

  function handleSubmit(formData: FormData) {
    const nextName = String(formData.get('fullName') ?? '')
    startTransition(() => {
      setResult(calculateExpression(nextName))
    })
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <form action={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1 text-sm font-medium text-foreground/80">
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
        <Button type="submit" className="sm:w-auto">
          Calcular
        </Button>
      </form>

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {TILES.map((tile) => {
            const value = result[tile.key]
            const meaning = getMeaning(value)
            return (
              <div
                key={tile.key}
                className="flex flex-col items-center rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.85),hsl(var(--primary)/0.1))] p-5 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-semibold text-white shadow-glow">
                  {value}
                </span>
                <p className="mt-3 font-display text-lg font-semibold text-primary">{tile.label}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/55">
                  {tile.hint}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/75">{meaning.title}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Escribe tu nombre completo para descubrir tus números del nombre.
        </p>
      )}
    </div>
  )
}
