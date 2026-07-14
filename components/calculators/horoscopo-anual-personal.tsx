'use client'

import { startTransition, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Person from '@/resources/person'

function buildYearOptions() {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 21 }, (_, index) => currentYear - 10 + index)
}

function computePersonalYear(birthDate: string, yearToCalculate: string): number | null {
  if (!birthDate || !yearToCalculate) return null

  try {
    const person = new Person({ birthDate })
    const targetYear = Number(yearToCalculate)
    const value = person.calcPersonalYear(new Date(targetYear, 0, 1))

    if (value === false || value === undefined || value === null) return null
    return value
  } catch {
    return null
  }
}

export function HoroscopoAnualPersonal() {
  const yearOptions = buildYearOptions()
  const currentYear = String(new Date().getFullYear())

  const [birthDate, setBirthDate] = useState('')
  const [yearToCalculate, setYearToCalculate] = useState(currentYear)
  const [result, setResult] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(formData: FormData) {
    const nextBirthDate = String(formData.get('birthDate') ?? '')
    const nextYearToCalculate = String(formData.get('yearToCalculate') ?? '')

    startTransition(() => {
      setResult(computePersonalYear(nextBirthDate, nextYearToCalculate))
      setSubmitted(true)
    })
  }

  function handleReset() {
    startTransition(() => {
      setBirthDate('')
      setYearToCalculate(currentYear)
      setResult(null)
      setSubmitted(false)
    })
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <form action={handleSubmit} className="flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-[1fr_220px_auto_auto] sm:items-end">
          <label className="text-sm font-medium text-foreground/80">
            Ingresa tu fecha de nacimiento…
            <Input
              name="birthDate"
              type="date"
              required
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="mt-2"
            />
          </label>

          <label className="text-sm font-medium text-foreground/80">
            Escoge el Año de tu interés…
            <select
              name="yearToCalculate"
              required
              value={yearToCalculate}
              onChange={(event) => setYearToCalculate(event.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <Button type="submit" className="sm:w-auto">
            Calcular
          </Button>

          <Button type="button" variant="secondary" onClick={handleReset} className="sm:w-auto">
            Borrar
          </Button>
        </div>
      </form>

      {submitted && result !== null ? (
        <p className="mt-6 text-center font-display text-3xl font-semibold text-primary sm:text-4xl">
          Tú Año Personal es: {result}
        </p>
      ) : submitted ? (
        <p className="mt-4 text-sm text-foreground/60">
          Revisa la fecha y el año seleccionado para poder calcular tu Año Personal.
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
        </p>
      )}
    </div>
  )
}
