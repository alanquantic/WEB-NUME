'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

export type HoroscopoMesContenido = {
  titulo?: string
  parrafos?: string[]
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
  /** Solo llega con datos cuando el usuario tiene membresía activa (gating en servidor). */
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

          {!isMember ? (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-primary/30 bg-[hsl(var(--secondary)/0.4)] px-6 py-10 text-center">
              <h3 className="font-display text-2xl font-semibold text-primary">
                Contenido exclusivo para miembros
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-8 text-foreground/72">
                El horóscopo mensual de tu año personal es parte del contenido premium. Hazte
                miembro para leer la guía completa de cada mes.
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
          ) : entrada && (entrada.parrafos?.length || entrada.titulo) ? (
            <div className="mt-4">
              {entrada.titulo ? (
                <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {entrada.titulo}
                </h3>
              ) : null}
              <div className="mt-4 space-y-4 text-base leading-8 text-foreground/78">
                {(entrada.parrafos ?? []).map((parrafo, index) => (
                  <p key={index}>{parrafo}</p>
                ))}
              </div>
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
