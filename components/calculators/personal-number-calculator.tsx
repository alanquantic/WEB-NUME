'use client'

import { useEffect, useState, type FormEvent } from 'react'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { reduceBirthDay } from '@/lib/horoscopos/birthdate'
import { personalPagePath } from '@/lib/personales/routes'
import { useUserDefaults } from '@/stores/user-defaults'

export function PersonalNumberCalculator() {
  const router = useRouter()
  const defaults = useUserDefaults()
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState('')
  const today = new Date()
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  useEffect(() => {
    if (defaults.birthDate) setBirthDate((current) => current || defaults.birthDate)
  }, [defaults.birthDate])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const [year, month, day] = birthDate.split('-').map(Number)
    const date = new Date(0)
    date.setUTCFullYear(year, month - 1, day)
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) || year < 1 ||
      date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day || birthDate > maxDate
    ) {
      setError('Ingresa una fecha de nacimiento válida que no sea futura.')
      return
    }
    const path = personalPagePath('numero-personal', reduceBirthDay(day))
    if (path) router.push(path as Route)
  }

  return (
    <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-primary">Calcula tu número personal</h2>
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
            max={maxDate}
            value={birthDate}
            onChange={(event) => { setBirthDate(event.target.value); setError('') }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'personal-date-error' : undefined}
            className="mt-2"
          />
        </label>
        <Button type="submit">Calcular mi número personal</Button>
      </form>
      {error ? <p id="personal-date-error" role="alert" className="mt-3 text-sm text-red-600">{error}</p> : null}
      <p className="mt-4 text-sm text-foreground/60">
        Se obtiene reduciendo tu día de nacimiento, conservando los números maestros 11 y 22.
      </p>
    </section>
  )
}
