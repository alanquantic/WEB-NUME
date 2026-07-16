'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import perfilesData from '@/components/jsons/significados/perfil-cumpleanos.json'
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon
} from '@/components/ui/icons'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Universal from '@/resources/universal'
import { reduceNumber } from '@/resources/utils'

type PerfilCumpleanos = {
  numero: number
  titulo: string
  planeta?: string
  color?: string
  palabrasClave?: string
  puntoDebil?: string
  descripcion: string[]
  reto: string[]
  cualidades: string[]
  debilidades: string[]
  afirmacion?: string
}

const PERFILES = perfilesData as Record<string, PerfilCumpleanos>

const SHARE_LINKS = [
  { id: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { id: 'whatsapp', label: 'WhatsApp', Icon: WhatsappIcon },
  { id: 'telegram', label: 'Telegram', Icon: TelegramIcon },
  { id: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon }
] as const

type ShareNetwork = (typeof SHARE_LINKS)[number]['id']

const DAYS: readonly number[] = Array.from({ length: 31 }, (_, index) => index + 1)
const MONTHS: readonly string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

type BirthdayResult = {
  energy: number
  dayNumber: number
  year: number
  monthName: string
}

function buildShareHref(network: ShareNetwork, url: string, text: string): string {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  switch (network) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    default:
      return url
  }
}

function ClaveChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-2.5">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-foreground/82">{value}</p>
    </div>
  )
}

function BirthdayProfile({ numero, monthName }: { numero: number; monthName: string }) {
  const perfil = PERFILES[String(numero)]
  if (!perfil) return null

  const claves = [
    perfil.palabrasClave ? { label: 'Palabras clave', value: perfil.palabrasClave } : null,
    perfil.planeta ? { label: 'Planeta', value: perfil.planeta } : null,
    perfil.color ? { label: 'Color', value: perfil.color } : null,
    perfil.puntoDebil ? { label: 'Punto débil', value: perfil.puntoDebil } : null
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-panel">
      {/* Encabezado del perfil */}
      <div className="flex flex-col gap-5 border-b border-border/70 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.5),hsl(var(--card)))] p-6 sm:flex-row sm:items-center sm:p-8">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-4xl font-semibold text-white shadow-glow">
          {numero}
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Si naciste un día como este…
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Tu Número Personal es {numero}
          </h3>
          {perfil.titulo ? (
            <p className="mt-1 text-base italic leading-7 text-foreground/72">“{perfil.titulo}”</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        {claves.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {claves.map((clave) => (
              <ClaveChip key={clave.label} label={clave.label} value={clave.value} />
            ))}
          </div>
        ) : null}

        {perfil.descripcion.length > 0 ? (
          <div className="space-y-4">
            <h4 className="font-display text-xl font-semibold text-primary">Tu esencia</h4>
            <div className="space-y-4 text-base leading-8 text-foreground/78">
              {perfil.descripcion.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {perfil.cualidades.length > 0 ? (
            <div className="space-y-3 rounded-2xl border border-border/70 bg-background/60 p-5">
              <h4 className="font-display text-lg font-semibold text-primary">Tus cualidades</h4>
              <ul className="grid gap-2 text-sm leading-6 text-foreground/78">
                {perfil.cualidades.map((item, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {perfil.debilidades.length > 0 ? (
            <div className="space-y-3 rounded-2xl border border-border/70 bg-background/60 p-5">
              <h4 className="font-display text-lg font-semibold text-fuchsia">Tus retos</h4>
              <ul className="grid gap-2 text-sm leading-6 text-foreground/78">
                {perfil.debilidades.map((item, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {perfil.reto.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-display text-xl font-semibold text-primary">Tu lección</h4>
            <div className="space-y-4 text-base leading-8 text-foreground/78">
              {perfil.reto.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : null}

        {perfil.afirmacion ? (
          <blockquote className="rounded-2xl border border-primary/16 bg-[linear-gradient(135deg,hsl(var(--secondary)/0.4),hsl(var(--card)))] p-5 text-center font-display text-lg italic leading-8 text-primary">
            “{perfil.afirmacion}”
          </blockquote>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={`/significadodelosnumeros/numero-personal/${numero}` as Route}
            className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
          >
            Ver el significado completo del {numero}
          </Link>
          <Link
            href={`/significadodelosnumeros/karma/${reduceNumber(MONTHS.indexOf(monthName) + 1)}` as Route}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background px-7 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
          >
            Tu Karma de {monthName}
          </Link>
        </div>
      </div>
    </div>
  )
}

export function BirthdaySection() {
  const [day, setDay] = useState(1)
  const [monthIndex, setMonthIndex] = useState(0)
  const [result, setResult] = useState<BirthdayResult | null>(null)

  const handleCalculate = () => {
    const year = new Date().getFullYear()
    const universal = new Universal()
    const energy = universal.calcUniversalDay({ day, month: monthIndex + 1, year })
    setResult({ energy, dayNumber: reduceNumber(day), year, monthName: MONTHS[monthIndex] })
  }

  const shareUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://www.numerologia-cotidiana.com'
  const shareText = result
    ? `Mi energía de cumpleaños en Numerología Cotidiana es ${result.energy}. ✨ Descubre la tuya:`
    : 'Descubre tu Proyección Numerológica en Numerología Cotidiana ✨'

  const handleShare = (network: ShareNetwork) => {
    const href = buildShareHref(network, shareUrl, shareText)
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,hsl(var(--secondary)/0.86),hsl(var(--primary)/0.92))] px-5 py-8 shadow-panel sm:px-6 md:px-12 md:py-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-[2.2rem] font-semibold text-gradient-brand sm:text-[2.65rem]">
                Feliz cumpleaños
              </h2>
              <p className="mt-3 max-w-md text-[1rem] leading-7 text-foreground/78 sm:text-[1.125rem] sm:leading-8">
                Descubre la Proyección Numerológica para tu año o el de alguien más y
                compártesela.
              </p>

              <div
                data-calculator-slot="cumpleanos"
                className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-end"
              >
                <label className="flex flex-col gap-1 text-base font-medium text-foreground/82">
                  Día de nacimiento
                  <select
                    value={day}
                    onChange={(event) => setDay(Number(event.target.value))}
                    className="h-11 rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary"
                  >
                    {DAYS.map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-base font-medium text-foreground/82">
                  Mes de nacimiento
                  <select
                    value={monthIndex}
                    onChange={(event) => setMonthIndex(Number(event.target.value))}
                    className="h-11 rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary"
                  >
                    {MONTHS.map((monthName, index) => (
                      <option key={monthName} value={index}>{monthName}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-foreground transition hover:opacity-90"
                >
                  Ver
                </button>
              </div>

              {result ? (
                <div className="mt-6 inline-flex items-center gap-4 rounded-[1.5rem] border border-white/40 bg-white/70 px-5 py-4 backdrop-blur">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-semibold text-white shadow-glow">
                    {result.energy}
                  </span>
                  <div className="text-sm leading-6 text-foreground/82">
                    <p className="font-semibold text-foreground">
                      Tu energía de cumpleaños {result.year}
                    </p>
                    <p>
                      Número de tu día: <span className="font-semibold">{result.dayNumber}</span>
                    </p>
                  </div>
                </div>
              ) : null}

              <p className="mt-6 text-base font-semibold text-foreground/82">
                Compártelo con alguien especial
              </p>
              <ul className="mt-3 flex gap-3">
                {SHARE_LINKS.map(({ id, label, Icon }, index) => (
                  <ScrollReveal key={id} delay={120 + index * 55} distance={16} duration={500}>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleShare(id)}
                        aria-label={`Compartir en ${label}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-white transition hover:scale-105 hover:opacity-90"
                      >
                        <Icon width={18} height={18} />
                      </button>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="overflow-hidden rounded-[1.75rem] shadow-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/feliz-cumpleanos.png"
                alt="Ilustración de feliz cumpleaños"
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {result ? (
        <BirthdayProfile numero={result.dayNumber} monthName={result.monthName} />
      ) : null}
    </section>
  )
}
