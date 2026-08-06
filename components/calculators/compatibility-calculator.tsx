'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  calculateCompatibility,
  type CompatibilityResult
} from '@/lib/numerology/compatibility'
import { useSessionStore } from '@/stores/session-store'
import { useUserDefaults } from '@/stores/user-defaults'

function readUserFullName(user: unknown): string {
  if (!user || typeof user !== 'object') return ''
  const meta = ((user as { metadata?: Record<string, unknown> }).metadata ??
    {}) as Record<string, unknown>
  const profile = (meta.profile ?? {}) as Record<string, string>
  const customer = (meta.customer ?? {}) as Record<string, string>
  const first = profile.first_name || customer.first_name || ''
  const last = profile.last_name || customer.last_name || ''
  return [first, last].filter(Boolean).join(' ').trim()
}

const CALCULATION_DURATION_MS = 5000

const CALCULATION_STEPS = [
  'Analizando fechas de nacimiento…',
  'Reduciendo números a un dígito…',
  'Cruzando afinidades…',
  'Revelando el vínculo numerológico…'
]

export function CompatibilityCalculator() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dateA, setDateA] = useState('')
  const [dateB, setDateB] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const defaults = useUserDefaults()
  const sessionUser = useSessionStore((state) => state.user)

  useEffect(() => {
    if (!dateA && defaults.birthDate) setDateA(defaults.birthDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaults.birthDate])

  // Si el usuario está logueado y aún no escribió nada, precargamos su nombre
  // (metadata.profile.first_name + last_name; fallback a metadata.customer.*).
  useEffect(() => {
    if (name || !sessionUser) return
    const full = readUserFullName(sessionUser)
    if (full) setName(full)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUser])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Escribe tu nombre.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Ingresa un correo electrónico válido.')
      return
    }
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones para continuar.')
      return
    }

    setResult(null)
    setIsCalculating(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setResult(calculateCompatibility(dateA, dateB))
      setIsCalculating(false)
    }, CALCULATION_DURATION_MS)
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground/80 sm:col-span-2">
          Nombre
          <Input
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2"
            placeholder="Tu nombre"
          />
        </label>
        <label className="text-sm font-medium text-foreground/80 sm:col-span-2">
          Correo electrónico
          <Input
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2"
            placeholder="tu@correo.com"
          />
        </label>
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

        <label className="sm:col-span-2 flex items-start gap-3 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(event) => setAcceptTerms(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0"
          />
          <span>
            Acepto los términos y condiciones. Consulta nuestro{' '}
            <Link
              href="/paginas/aviso-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              aviso de privacidad
            </Link>
            .
          </span>
        </label>

        {error ? (
          <p className="sm:col-span-2 text-sm font-medium text-[hsl(var(--danger))]">
            {error}
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <Button type="submit" disabled={isCalculating}>
            {isCalculating ? 'Calculando…' : 'Calcular compatibilidad'}
          </Button>
        </div>
      </form>

      {isCalculating ? (
        <CalculatingState />
      ) : result ? (
        <ResultCard result={result} />
      ) : (
        <p className="mt-4 text-sm text-foreground/60">
          Ingresa dos fechas de nacimiento para ver su afinidad numerológica.
        </p>
      )}
    </div>
  )
}

function ResultSection({
  title,
  items,
  variant
}: {
  title: string
  items: string[]
  variant: 'positive' | 'warning' | 'info'
}) {
  if (items.length === 0) return null
  const colorByVariant = {
    positive: 'text-emerald-700',
    warning: 'text-amber-700',
    info: 'text-primary'
  } as const

  return (
    <div className="rounded-[1.25rem] bg-white/60 p-5">
      <h4 className={`font-display text-base font-semibold ${colorByVariant[variant]}`}>
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/80">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className={colorByVariant[variant]}>
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ResultCard({ result }: { result: CompatibilityResult }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-[1.5rem] bg-[hsl(var(--secondary)/0.2)] p-6 text-center">
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

      {result.energy ? (
        <div className="rounded-[1.5rem] border border-border/70 bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary">
            La energía entre ustedes
          </h3>
          <p className="mt-2 text-sm leading-7 text-foreground/80">{result.energy}</p>
        </div>
      ) : null}

      {(result.strengths.length > 0 || result.challenges.length > 0 || result.advice.length > 0) ? (
        <div className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-card p-6 md:grid-cols-2">
          <ResultSection title="Fortalezas" items={result.strengths} variant="positive" />
          <ResultSection title="Retos" items={result.challenges} variant="warning" />
          <div className="md:col-span-2">
            <ResultSection title="Consejos para la pareja" items={result.advice} variant="info" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function CalculatingState() {
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const startedAt = Date.now()
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const pct = Math.min(100, (elapsed / CALCULATION_DURATION_MS) * 100)
      setProgress(pct)
      setStepIndex(
        Math.min(
          CALCULATION_STEPS.length - 1,
          Math.floor((elapsed / CALCULATION_DURATION_MS) * CALCULATION_STEPS.length)
        )
      )
      if (elapsed >= CALCULATION_DURATION_MS) window.clearInterval(tick)
    }, 100)
    return () => window.clearInterval(tick)
  }, [])

  return (
    <div className="mt-6 rounded-[1.5rem] bg-[hsl(var(--secondary)/0.2)] p-6 text-center">
      <div className="flex items-center justify-center gap-4">
        <span className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        </span>
        <span className="font-display text-2xl text-primary/60">+</span>
        <span className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow [animation-delay:150ms]">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        </span>
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-primary">Calculando compatibilidad…</p>
      <p className="mt-1 text-sm text-foreground/70">{CALCULATION_STEPS[stepIndex]}</p>
      <div
        className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-[hsl(var(--border))]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="h-full rounded-full bg-gradient-brand transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
