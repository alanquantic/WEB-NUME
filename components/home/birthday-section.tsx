import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon
} from '@/components/ui/icons'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const SHARE_LINKS = [
  { id: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { id: 'whatsapp', label: 'WhatsApp', Icon: WhatsappIcon },
  { id: 'telegram', label: 'Telegram', Icon: TelegramIcon },
  { id: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon }
] as const

const DAYS: readonly number[] = Array.from({ length: 31 }, (_, index) => index + 1)
const MONTHS: readonly string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export function BirthdaySection() {
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
                    disabled
                    className="h-11 rounded-2xl border border-border bg-card px-4 text-base text-foreground/70"
                  >
                    {DAYS.map((day) => (
                      <option key={day}>{day}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-base font-medium text-foreground/82">
                  Mes de nacimiento
                  <select
                    disabled
                    className="h-11 rounded-2xl border border-border bg-card px-4 text-base text-foreground/70"
                  >
                    {MONTHS.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </label>
                <span className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-foreground">
                  Ver
                </span>
              </div>

              <p className="mt-6 text-base font-semibold text-foreground/82">
                Compártelo con alguien especial
              </p>
              <ul className="mt-3 flex gap-3">
                {SHARE_LINKS.map(({ id, label, Icon }, index) => (
                  <ScrollReveal key={id} delay={120 + index * 55} distance={16} duration={500}>
                    <li>
                      <button
                        type="button"
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
