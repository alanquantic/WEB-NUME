'use client'

import { useState } from 'react'

import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon
} from '@/components/ui/icons'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Universal from '@/resources/universal'
import { reduceNumber } from '@/resources/utils'

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

export function BirthdaySection() {
  const [day, setDay] = useState(1)
  const [monthIndex, setMonthIndex] = useState(0)
  const [result, setResult] = useState<BirthdayResult | null>(null)

  const handleCalculate = () => {
    const year = new Date().getFullYear()
    const universal = new Universal()
    const energy = universal.calcUniversalDay({ day, month: monthIndex + 1, year })
    setResult({ energy, dayNumber: reduceNumber(day), year })
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
    </section>
  )
}
