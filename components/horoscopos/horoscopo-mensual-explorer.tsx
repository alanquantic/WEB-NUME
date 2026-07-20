'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

export type HoroscopoMesContenido = {
  /** Frase corta de energía del mes (heading superior). */
  energia?: string
  /** Número de Mes Personal (p. ej. "2"). */
  mesPersonal?: string
  /** Cuerpo completo del horóscopo (solo miembros). */
  parrafos?: string[]
  /** Viñetas de "Energía Activa" (solo miembros). */
  energiaActiva?: string[]
  /** Bloque "Mes excelente para" (solo miembros). */
  mesExcelente?: string[]
  /** Adelanto recortado del cuerpo (se envía a no-miembros en lugar del contenido completo). */
  teaser?: string
}

export type HoroscopoContenido = Record<string, Record<string, HoroscopoMesContenido>>

const TIENDA_URL = 'https://tienda.numerologia-cotidiana.com/'

export function HoroscopoMensualExplorer({
  anio,
  numeros,
  meses,
  contenido,
  isMember,
}: {
  anio: number
  numeros: string[]
  meses: string[]
  /**
   * A miembros les llega el contenido completo; a no-miembros, una versión
   * recortada (solo energía, mes personal y teaser) generada en el servidor.
   */
  contenido: HoroscopoContenido | null
  isMember: boolean
}) {
  const [numero, setNumero] = useState<string | null>(null)
  const [mesIndex, setMesIndex] = useState<number | null>(null)
  const detalleRef = useRef<HTMLDivElement | null>(null)

  const handleSelectNumero = (value: string) => {
    setNumero(value)
    setMesIndex(null)
  }

  const handleSelectMes = (index: number) => {
    setMesIndex(index)
    requestAnimationFrame(() => {
      detalleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const mesNombre = mesIndex !== null ? meses[mesIndex] : null
  const entrada =
    numero && mesNombre && contenido
      ? contenido[numero]?.[mesNombre.toLowerCase()]
      : undefined

  return (
    <div className="space-y-8">
      {/* Paso 1: elegir número de año personal */}
      <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary">
            Elige tu Año Personal {anio}
          </h2>
          <p className="mt-2 text-base leading-8 text-foreground/72">
            Selecciona el número de tu año personal y después el mes que quieres consultar.{' '}
            <Link
              href="/horoscopoanopersonal"
              className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              ¿No conoces tu número? Calcúlalo aquí
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {numeros.map((value) => {
            const activo = value === numero
            return (
              <button
                key={value}
                type="button"
                onClick={() => handleSelectNumero(value)}
                aria-pressed={activo}
                className={
                  activo
                    ? 'flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand font-display text-lg font-semibold text-white shadow-glow'
                    : 'flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-background font-display text-lg font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft'
                }
              >
                {value}
              </button>
            )
          })}
        </div>

        {/* Paso 2: elegir mes */}
        {numero ? (
          <div className="space-y-3 border-t border-border/60 pt-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Año Personal {numero} · elige un mes
            </p>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
              {meses.map((mes, index) => {
                const activo = index === mesIndex
                return (
                  <button
                    key={mes}
                    type="button"
                    onClick={() => handleSelectMes(index)}
                    aria-pressed={activo}
                    className={
                      activo
                        ? 'inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-3 text-sm font-semibold text-white shadow-glow'
                        : 'inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background px-3 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft'
                    }
                  >
                    {mes.slice(0, 3).toUpperCase()}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </section>

      {/* Paso 3: contenido del mes seleccionado */}
      {numero && mesNombre ? (
        <section
          ref={detalleRef}
          className="scroll-mt-28 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Año Personal {numero} · {mesNombre} {anio}
          </p>

          {entrada ? (
            <div className="mt-4 space-y-5">
              {/* Preview visible para todos: energía + mes personal */}
              {entrada.energia ? (
                <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {entrada.energia}
                </h3>
              ) : null}
              {entrada.mesPersonal ? (
                <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary">
                  Año {numero} · Mes Personal {entrada.mesPersonal}
                </span>
              ) : null}

              {isMember ? (
                <>
                  {/* Cuerpo completo */}
                  {entrada.parrafos?.length ? (
                    <div className="space-y-4 text-base leading-8 text-foreground/78">
                      {entrada.parrafos.map((parrafo, index) => (
                        <p key={index}>{parrafo}</p>
                      ))}
                    </div>
                  ) : null}

                  {/* Energía Activa */}
                  {entrada.energiaActiva?.length ? (
                    <div className="rounded-[1.5rem] border border-border/60 bg-secondary/40 p-5 sm:p-6">
                      <h4 className="font-display text-lg font-semibold text-primary">
                        Energía Activa
                      </h4>
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

                  {/* Mes excelente para */}
                  {entrada.mesExcelente?.length ? (
                    <div>
                      <h4 className="font-display text-lg font-semibold text-primary">
                        Mes excelente para
                      </h4>
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
                  {/* Teaser (adelanto) para no-miembros */}
                  {entrada.teaser ? (
                    <div className="relative">
                      <p className="text-base leading-8 text-foreground/78">{entrada.teaser}</p>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-card"
                      />
                    </div>
                  ) : null}

                  {/* Muro de membresía */}
                  <div className="rounded-[1.5rem] border border-dashed border-primary/30 bg-[hsl(var(--secondary)/0.4)] px-6 py-9 text-center">
                    <h4 className="font-display text-2xl font-semibold text-primary">
                      Sigue leyendo con tu membresía
                    </h4>
                    <p className="mx-auto mt-3 max-w-md text-base leading-8 text-foreground/72">
                      Hazte miembro para desbloquear el horóscopo completo de {mesNombre}: el resto
                      de la lectura, la <strong>Energía Activa</strong> del mes y para qué es un{' '}
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
                        href="/login?next=/horoscopos"
                        className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background px-7 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
                      >
                        Ya soy miembro
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="mt-4 text-base leading-8 text-foreground/72">
              El horóscopo de {mesNombre} para el Año Personal {numero} estará disponible muy
              pronto.
            </p>
          )}
        </section>
      ) : null}
    </div>
  )
}
