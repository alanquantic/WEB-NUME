import Link from 'next/link'

import { ToolPage } from '@/components/content/tool-page'
import type { HoroscopoMesContenido } from '@/lib/horoscopos/data'

const TIENDA_URL = 'https://tienda.numerologia-cotidiana.com/'

type Props = {
  numero: string
  mes: string
  anio: number
  entrada: HoroscopoMesContenido | null
  isMember: boolean
}

const TEASER_MAX = 340
const TEASER_MIN = 180

function makeTeaser(parrafos?: string[]): string {
  const first = parrafos?.[0]?.trim()
  if (!first) return ''
  const sentences = first.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? [first]
  let out = ''
  for (const s of sentences) {
    if (out && out.length + s.length > TEASER_MAX) break
    out += s
    if (out.length >= 240) break
  }
  out = out.trim()
  if (out.length < TEASER_MIN && first.length > out.length) {
    let cut = first.slice(0, TEASER_MAX)
    const lastSpace = cut.lastIndexOf(' ')
    if (lastSpace > TEASER_MIN) cut = cut.slice(0, lastSpace)
    out = cut.trim()
  }
  if (out.length > TEASER_MAX + 40) {
    let cut = out.slice(0, TEASER_MAX)
    const lastSpace = cut.lastIndexOf(' ')
    if (lastSpace > TEASER_MIN) cut = cut.slice(0, lastSpace)
    out = cut.trim()
  }
  if (out.length < first.length) out = `${out.replace(/[\s.,;:–—-]+$/, '')}…`
  return out
}

export function HoroscopoMesView({ numero, mes, anio, entrada, isMember }: Props) {
  const title = `Año Personal ${numero} · ${mes} ${anio}`
  const description = `Horóscopo numerológico del mes de ${mes} ${anio} para quienes están en Año Personal ${numero}.`

  return (
    <ToolPage
      toolKey="significadodelosnumeros"
      title={title}
      description={description}
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Horóscopos', path: '/horoscopo-personal-2027' },
        { name: `Año ${numero} · ${mes}` }
      ]}
    >
      <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Año Personal {numero} · {mes} {anio}
        </p>

        {entrada ? (
          <div className="mt-4 space-y-5">
            {entrada.energia ? (
              <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {entrada.energia}
              </h2>
            ) : null}
            {entrada.mesPersonal ? (
              <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary">
                Año {numero} · Mes Personal {entrada.mesPersonal}
              </span>
            ) : null}

            {isMember ? (
              <>
                {entrada.parrafos?.length ? (
                  <div className="space-y-4 text-base leading-8 text-foreground/78">
                    {entrada.parrafos.map((parrafo, index) => (
                      <p key={index}>{parrafo}</p>
                    ))}
                  </div>
                ) : null}

                {entrada.energiaActiva?.length ? (
                  <div className="rounded-[1.5rem] border border-border/60 bg-secondary/40 p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-primary">
                      Energía Activa
                    </h3>
                    <ul className="mt-3 space-y-2.5 text-base leading-7 text-foreground/78">
                      {entrada.energiaActiva.map((item, index) => (
                        <li key={index} className="flex gap-2.5">
                          <span aria-hidden className="mt-1 text-primary">
                            📌
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {entrada.mesExcelente?.length ? (
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">
                      Mes excelente para
                    </h3>
                    <div className="mt-3 space-y-3 text-base leading-8 text-foreground/78">
                      {entrada.mesExcelente.map((parrafo, index) => (
                        <p key={index}>{parrafo}</p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {entrada.parrafos?.length ? (
                  <div className="relative">
                    <p className="text-base leading-8 text-foreground/78">
                      {makeTeaser(entrada.parrafos)}
                    </p>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-card"
                    />
                  </div>
                ) : null}

                <div className="rounded-[1.5rem] border border-dashed border-primary/30 bg-[hsl(var(--secondary)/0.4)] px-6 py-9 text-center">
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    Sigue leyendo con tu membresía
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-base leading-8 text-foreground/72">
                    Hazte miembro para desbloquear el horóscopo completo de {mes}: el resto de la
                    lectura, la <strong>Energía Activa</strong> del mes y para qué es un{' '}
                    <strong>mes excelente</strong>.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={TIENDA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
                    >
                      Ir a la tienda
                    </a>
                    <Link
                      href={`/login?next=/ano-${numero}-${mes.toLowerCase()}`}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background px-7 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
                    >
                      Ya soy miembro
                    </Link>
                  </div>
                </div>
              </>
            )}

            <div className="border-t border-border/60 pt-5 text-sm text-foreground/72">
              <Link
                href="/horoscopo-personal-2027"
                className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                Ver todos los meses del Año Personal {numero}
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-base leading-8 text-foreground/72">
            El horóscopo de {mes} para el Año Personal {numero} estará disponible muy pronto.{' '}
            <Link
              href="/horoscopo-personal-2027"
              className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Explora el resto del horóscopo mensual.
            </Link>
          </p>
        )}
      </section>
    </ToolPage>
  )
}
