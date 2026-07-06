'use client'

import { useMemo, useState } from 'react'
import type { Route } from 'next'
import Link from 'next/link'

import Person from '@/resources/person'

type CalculatorOption = {
  id: string
  label: string
  href: string
}

type FormState = {
  concept: string
  fullName: string
  birthDate: string
}

type PageSidebarWidgetProps = {
  title?: string
}

const CALCULATOR_OPTIONS: readonly CalculatorOption[] = [
  { id: 'name', label: 'Número de tu Nombre', href: '/numerodelnombre' },
  { id: 'soul', label: 'Número del Alma', href: '/numerodelalma' },
  { id: 'expression', label: 'Expresión del Alma', href: '/numerodeexpresiondelalma' },
  { id: 'personal', label: 'Número Personal', href: '/numerologia' },
  { id: 'stage', label: 'Etapa de Vida', href: '/etapapersonal' },
  { id: 'personality', label: 'Número de la Personalidad', href: '/numerologia' },
  { id: 'year', label: 'Año Personal', href: '/anopersonal' },
  { id: 'month', label: 'Mes Personal', href: '/mespersonal' },
  { id: 'week', label: 'Semana Personal', href: '/semanapersonal' },
  { id: 'day', label: 'Día Personal', href: '/diapersonal' }
] as const

const INITIAL_FORM_STATE: FormState = {
  concept: '',
  fullName: '',
  birthDate: ''
}

function parseDateInput(value: string): Date {
  const [year, month, day] = value.split('-').map((part) => parseInt(part, 10))
  return new Date(Date.UTC(year, month - 1, day, 12))
}

function sanitizeName(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim()
}

function splitFullName(fullName: string): { name: string; lastName: string } {
  const normalizedName = sanitizeName(fullName)
  const [name = '', ...rest] = normalizedName.split(' ')

  return {
    name,
    lastName: rest.join(' ')
  }
}

function normalizeValue(value: number | string | false | null | undefined): string {
  if (value === false || value === null || value === undefined || value === '') {
    return 'Sin resultado'
  }

  return String(value)
}

function resolveCalculation(concept: string, person: Person): string {
  switch (concept) {
    case 'name':
      return normalizeValue(person.calcName())
    case 'soul':
      return normalizeValue(person.calcSoulNumber())
    case 'expression':
      return normalizeValue(person.calcSoulExpresion())
    case 'personal':
      return normalizeValue(person.calcPersonalNumber())
    case 'stage':
      return normalizeValue(person.getLifeStage())
    case 'personality':
      return normalizeValue(person.calcPersonalityNumber())
    case 'year':
      return normalizeValue(person.calcPersonalYear(new Date()))
    case 'month':
      return normalizeValue(person.calcPersonalMonth(new Date(), new Date()))
    case 'week':
      return normalizeValue(person.calcPersonalWeek(new Date()))
    case 'day':
      return normalizeValue(person.calcPersonalDay(new Date()))
    default:
      return 'Sin resultado'
  }
}

function CalculatorIcon() {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white shadow-[0_16px_34px_hsl(var(--primary)/0.26)]">
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
        <path d="M8 7.5h8" strokeLinecap="round" />
        <path d="M8 11h2" strokeLinecap="round" />
        <path d="M11 11h2" strokeLinecap="round" />
        <path d="M14 11h2" strokeLinecap="round" />
        <path d="M8 14.5h2" strokeLinecap="round" />
        <path d="M11 14.5h2" strokeLinecap="round" />
        <path d="M14 14.5h2" strokeLinecap="round" />
        <path d="M8 18h2" strokeLinecap="round" />
        <path d="M11 18h5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function PageSidebarWidget({ title = 'Concepto Numerológico' }: PageSidebarWidgetProps) {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE)
  const [result, setResult] = useState('Resultado:')

  const selectedOption = useMemo(
    () => CALCULATOR_OPTIONS.find((option) => option.id === formState.concept) ?? null,
    [formState.concept]
  )

  const isFormComplete =
    formState.concept.trim().length > 0 &&
    formState.fullName.trim().length > 0 &&
    formState.birthDate.trim().length > 0

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value
    }))
  }

  const handleCalculate = () => {
    if (!isFormComplete) {
      return
    }

    const birthDate = parseDateInput(formState.birthDate)
    const { name, lastName } = splitFullName(formState.fullName)
    const person = new Person({
      name,
      lastName,
      birthDate
    })

    setResult(resolveCalculation(formState.concept, person))
  }

  return (
    <aside className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,hsl(var(--secondary)/0.96),hsl(var(--background)/0.98))] p-5 shadow-panel">
      <div className="mb-4">
        <CalculatorIcon />
      </div>

      <div className="rounded-[1.6rem] border border-border/80 bg-[hsl(var(--primary))/0.04] p-4">
        <h2 className="text-center font-display text-[1.02rem] font-semibold text-primary">
          {title}
        </h2>

        <div className="mt-4 space-y-3">
          <select
            value={formState.concept}
            onChange={(event) => handleChange('concept', event.target.value)}
            className="h-11 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
          >
            <option value="">-- Selecciona --</option>
            {CALCULATOR_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <div>
            <label className="mb-1.5 block text-center text-sm font-medium text-primary/84">
              Nombre completo
            </label>
            <input
              type="text"
              value={formState.fullName}
              onChange={(event) => handleChange('fullName', event.target.value)}
              placeholder="Tu nombre completo"
              className="h-11 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-[hsl(var(--gray))] outline-none transition focus:border-primary/40"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div>
              <label className="mb-1.5 block text-center text-sm font-medium text-primary/84">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={formState.birthDate}
                onChange={(event) => handleChange('birthDate', event.target.value)}
                className="h-11 w-full rounded-2xl border border-border bg-white px-4 text-xs text-foreground outline-none transition focus:border-primary/40"
              />
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              disabled={!isFormComplete}
              className="self-end inline-flex h-11 items-center justify-center rounded-2xl bg-[hsl(var(--accent))] px-3 text-sm font-semibold text-[hsl(var(--foreground))] shadow-[0_12px_28px_hsl(var(--accent)/0.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Calcular
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="flex h-11 items-center rounded-2xl border border-border bg-white px-4 text-sm font-medium text-foreground/82">
              {result}
            </div>

            <Link
              href={(selectedOption?.href ?? '/numerologia') as Route}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-brand px-6 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
