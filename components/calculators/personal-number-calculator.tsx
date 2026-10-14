'use client'

import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import type { Route } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { personalPagePath } from '@/lib/personales/routes'
import Person from '@/resources/person'
import { useUserDefaults } from '@/stores/user-defaults'

export function PersonalNumberCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const defaults = useUserDefaults()
  const resultHref = result === null ? null : personalPagePath('numero-personal', result)
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  useEffect(() => {
    if (defaults.birthDate) {
      setBirthDate((current) => current || defaults.birthDate)
    }
  }, [defaults.birthDate])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const [year, month, day] = birthDate.split('-').map(Number)
    const date = new Date(0)
    date.setUTCFullYear(year, month - 1, day)

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) ||
      year < 1 ||
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day ||
      birthDate > today
    ) {
      setResult(null)
      setError('Ingresa una fecha de nacimiento válida que no sea futura.')
      return
    }

    setError('')
    const value = new Person({ birthDate: date }).calcPersonalNumber()
    setResult(typeof value === 'number' ? value : null)
  }

  function clear() {
    setBirthDate('')
    setError('')
    setResult(null)
  }

  return (
    <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-primary">
        Calcula tu número personal
      </h2>
      <p className="mt-3 text-sm leading-6 text-foreground/70">
        Ingresa tu fecha de nacimiento para conocer tu número personal y descubrir su significado.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label htmlFor="personal-birth-date" className="flex-1 text-sm font-medium text-foreground/80">
          Fecha de nacimiento
          <Input
            id="personal-birth-date"
            name="birthDate"
            type="date"
            required
            min="0001-01-01"
            max={today}
            value={birthDate}
            onChange={(event) => {
              setBirthDate(event.target.value)
              setError('')
              setResult(null)
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'personal-date-error' : undefined}
            className="mt-2"
          />
        </label>
        <Button type="submit">Calcular mi número personal</Button>
        <Button type="button" variant="ghost" className="border border-border" onClick={clear}>
          Borrar
        </Button>
      </form>

      {error ? (
        <p id="personal-date-error" role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}
      <div aria-live="polite" aria-atomic="true">
        {result !== null && resultHref ? (
          <div className="mt-6 rounded-2xl bg-primary-soft px-6 py-7 text-center">
            <p className="font-display text-xl font-semibold text-primary">
              Tu número personal es <span className="mt-2 block text-5xl">{result}</span>
            </p>
            <Link
              href={resultHref as Route}
              className="mt-5 inline-flex font-display text-xl font-semibold italic text-primary underline-offset-4 hover:underline"
            >
              ¿Qué significa?
            </Link>
          </div>
        ) : null}
      </div>
      <p className="mt-4 text-sm text-foreground/60">
        Se obtiene reduciendo tu día de nacimiento, conservando los números maestros 11 y 22.
      </p>
    </section>
  )
}
