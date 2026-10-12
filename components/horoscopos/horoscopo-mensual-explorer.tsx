'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { useState } from 'react'

export function HoroscopoMensualExplorer({
  anio,
  numeros,
  meses
}: {
  anio: number
  numeros: string[]
  meses: string[]
}) {
  const [numero, setNumero] = useState<string | null>(null)

  return (
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
              onClick={() => setNumero(value)}
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

      {numero ? (
        <div className="space-y-3 border-t border-border/60 pt-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            Año Personal {numero} · elige un mes
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
            {meses.map((mes) => {
              const href = `/ano-${numero}-${mes.toLowerCase()}/` as Route
              return (
                <Link
                  key={mes}
                  href={href}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background px-3 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
                >
                  {mes.slice(0, 3).toUpperCase()}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </section>
  )
}
