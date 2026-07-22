'use client'

import { startTransition, useEffect, useState } from 'react'

import { NumberResult } from '@/components/calculators/number-result'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { personalPagePath, type PersonalCategoriaKey } from '@/lib/personales/routes'
import Person from '@/resources/person'

export type CycleKind = 'year' | 'month' | 'week' | 'day' | 'stage'

const KIND_HINT: Record<CycleKind, string> = {
  year: 'Tu tema central durante este año.',
  month: 'La energía que acompaña tu mes actual.',
  week: 'El enfoque de la semana de la fecha elegida.',
  day: 'La vibración del día elegido.',
  stage: 'La etapa de vida que atraviesas ahora.'
}

const KIND_LABEL: Record<CycleKind, string> = {
  year: 'Año personal',
  month: 'Mes personal',
  week: 'Semana personal',
  day: 'Día personal',
  stage: 'Etapa personal'
}

// Etiqueta del campo de fecha objetivo; solo semana y día lo usan.
const TARGET_FIELD_LABEL: Partial<Record<CycleKind, string>> = {
  week: 'Escoge el día y semana de tu interés...',
  day: 'Escoge el día de tu interés'
}

// Categoría de páginas de contenido a la que enlaza el "Ver más" del resultado.
const VER_MAS_CATEGORIA: Partial<Record<CycleKind, PersonalCategoriaKey>> = {
  year: 'ano-personal',
  month: 'mes-personal',
  week: 'semana',
  day: 'dia-personal'
}

// Página de la calculadora de cada ciclo (para el link guardado en Mi carta).
const CALCULATOR_PATH: Record<CycleKind, string> = {
  year: '/anopersonal',
  month: '/mespersonal',
  week: '/semanapersonal',
  day: '/diapersonal',
  stage: '/etapapersonal'
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function todayIso(): string {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/** "YYYY-MM-DD" → Date en UTC mediodía (evita corrimientos de zona horaria). */
function parseDateUtc(value: string): Date {
  const [year, month, day] = value.split('-').map((part) => parseInt(part, 10))
  return new Date(Date.UTC(year, month - 1, day, 12))
}

function formatShortDate(value: string): string {
  const [year, month, day] = value.split('-')
  return day && month && year ? `${day}/${month}/${year}` : value
}

function compute(kind: CycleKind, birthDate: string, targetDate: string): number | string | null {
  try {
    const person = new Person({ birthDate })
    const now = new Date()
    const target = targetDate ? parseDateUtc(targetDate) : now
    let value: number | string | false | undefined

    switch (kind) {
      case 'year':
        value = person.calcPersonalYear(new Date(now.getFullYear(), 0, 1))
        break
      case 'month':
        value = person.calcPersonalMonth(now, now)
        break
      case 'week':
        value = person.calcPersonalWeek(target)
        break
      case 'day':
        value = person.calcPersonalDay(target)
        break
      case 'stage':
        value = person.getLifeStage()
        break
      default:
        value = undefined
    }

    if (value === false || value === undefined || value === null || value === '' || value === 'false') {
      return null
    }
    return value
  } catch {
    return null
  }
}

export function PersonalCycleCalculator({ kind }: { kind: CycleKind }) {
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState(todayIso())
  const [result, setResult] = useState<number | string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const hasTargetField = Boolean(TARGET_FIELD_LABEL[kind])

  // Precarga desde Mi carta: /ruta?nacimiento=YYYY-MM-DD[&fecha=YYYY-MM-DD]
  // deja los datos guardados en el formulario y muestra el cálculo directo.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nacimiento = params.get('nacimiento')
    if (!nacimiento) return
    const fecha = params.get('fecha')
    const nextTarget = fecha && TARGET_FIELD_LABEL[kind] ? fecha : todayIso()

    setBirthDate(nacimiento)
    setTargetDate(nextTarget)
    startTransition(() => {
      setResult(compute(kind, nacimiento, nextTarget))
      setSubmitted(true)
    })
  }, [kind])

  function handleSubmit(formData: FormData) {
    const nextBirthDate = String(formData.get('birthDate') ?? '')
    const nextTargetDate = hasTargetField
      ? String(formData.get('targetDate') ?? todayIso())
      : todayIso()
    startTransition(() => {
      setResult(compute(kind, nextBirthDate, nextTargetDate))
      setSubmitted(true)
    })
  }

  const verMasCategoria = VER_MAS_CATEGORIA[kind]
  const verMasHref =
    result !== null && verMasCategoria ? personalPagePath(verMasCategoria, result) : null

  const saveDetail = birthDate
    ? [
        `Nacimiento: ${formatShortDate(birthDate)}`,
        ...(hasTargetField ? [`Fecha: ${formatShortDate(targetDate)}`] : [])
      ].join(' · ')
    : undefined
  const saveHref = birthDate
    ? `${CALCULATOR_PATH[kind]}?nacimiento=${birthDate}${
        hasTargetField ? `&fecha=${targetDate}` : ''
      }`
    : undefined

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
        {hasTargetField ? (
          <label className="flex-1 text-sm font-medium text-foreground/80">
            {TARGET_FIELD_LABEL[kind]}
            <Input
              name="targetDate"
              type="date"
              required
              value={targetDate}
              onChange={(event) => setTargetDate(event.target.value)}
              className="mt-2"
            />
          </label>
        ) : null}
        <Button type="submit" className="sm:w-auto">
          Calcular
        </Button>
      </form>

      {submitted && result !== null ? (
        <NumberResult
          value={result}
          intro={KIND_HINT[kind]}
          saveLabel={KIND_LABEL[kind]}
          saveDetail={saveDetail}
          saveHref={saveHref}
          verMasHref={verMasHref}
        />
      ) : submitted ? (
        <p className="mt-4 text-sm text-foreground/60">
          Revisa la fecha ingresada para poder calcular este número.
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa tu fecha de nacimiento para calcular este número.
        </p>
      )}
    </div>
  )
}
