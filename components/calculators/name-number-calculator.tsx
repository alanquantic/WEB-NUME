'use client'

import { startTransition, useEffect, useState } from 'react'

import { NumberResult } from '@/components/calculators/number-result'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { personalPagePath } from '@/lib/personales/routes'
import Person from '@/resources/person'

export type NameKind = 'expression' | 'soul' | 'personality' | 'active' | 'hereditary'

const KIND_HINT: Record<NameKind, string> = {
  expression: 'La suma de todas las letras de tu nombre: tu destino y talentos.',
  soul: 'El valor de las vocales: lo que tu alma anhela.',
  personality: 'El valor de las consonantes: cómo te perciben los demás.',
  active: 'La energía de tu primer nombre, el que usas a diario.',
  hereditary: 'La energía de tus apellidos, tu herencia familiar.'
}

const KIND_LABEL: Record<NameKind, string> = {
  expression: 'Número del nombre',
  soul: 'Número del alma',
  personality: 'Expresión del alma',
  active: 'Nombre activo',
  hereditary: 'Nombre hereditario'
}

// Página de la calculadora de cada tipo (para el link guardado en Mi carta).
const KIND_PATH: Record<NameKind, string> = {
  expression: '/numerodelnombre',
  soul: '/numerodelalma',
  personality: '/numerodeexpresiondelalma',
  active: '/nombreactivo',
  hereditary: '/nombrehereditario'
}

function compute(kind: NameKind, fullName: string): number | null {
  const normalized = fullName.replace(/\s+/g, ' ').trim()
  if (!normalized) return null

  try {
    const [first = '', ...rest] = normalized.split(' ')
    const last = rest.join(' ')

    if (kind === 'active') return new Person({ name: first }).calcName()
    if (kind === 'hereditary') return new Person({ name: '', lastName: last }).calcName()

    const person = new Person({ name: first, lastName: last })
    if (kind === 'soul') return person.calcSoulNumber()
    if (kind === 'personality') return person.calcSoulExpresion()
    return person.calcName()
  } catch {
    return null
  }
}

export function NameNumberCalculator({ kind }: { kind: NameKind }) {
  const [fullName, setFullName] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Precarga desde Mi carta: /ruta?nombre=<nombre completo>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nombre = params.get('nombre')
    if (!nombre) return
    setFullName(nombre)
    startTransition(() => {
      setResult(compute(kind, nombre))
      setSubmitted(true)
    })
  }, [kind])

  function handleSubmit(formData: FormData) {
    const next = String(formData.get('fullName') ?? '')
    startTransition(() => {
      setResult(compute(kind, next))
      setSubmitted(true)
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

      {submitted && result !== null ? (
        <NumberResult
          value={result}
          intro={KIND_HINT[kind]}
          saveLabel={KIND_LABEL[kind]}
          saveDetail={fullName.trim() ? `Nombre: ${fullName.trim()}` : undefined}
          saveHref={
            fullName.trim()
              ? `${KIND_PATH[kind]}?nombre=${encodeURIComponent(fullName.trim())}`
              : undefined
          }
          verMasHref={kind === 'active' ? personalPagePath('nombre-activo', result) : null}
        />
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Escribe tu nombre completo para calcular este número.
        </p>
      )}
    </div>
  )
}
