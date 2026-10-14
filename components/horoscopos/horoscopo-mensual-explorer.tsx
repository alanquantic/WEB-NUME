'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { useState } from 'react'

const YEAR_IMAGES: Record<string, string> = {
  "1": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581807/nume-media/paginas-legado/Ano-1-scaled-bab313eb.png",
  "11": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581807/nume-media/paginas-legado/Ano-11-scaled-d721937f.png",
  "3": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581807/nume-media/paginas-legado/Ano-3-scaled-5bbacf00.png",
  "4": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581807/nume-media/paginas-legado/Ano-4-scaled-a7340a57.png",
  "5": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581808/nume-media/paginas-legado/Ano-5-scaled-c9de0e88.png",
  "6": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581808/nume-media/paginas-legado/Ano-6-scaled-0b366827.png",
  "7": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581808/nume-media/paginas-legado/Ano-7-scaled-ff2ff8e9.png",
  "8": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581808/nume-media/paginas-legado/Ano-8-scaled-e6812b73.png",
  "9": "https://res.cloudinary.com/du66hxu3k/image/upload/v1791581809/nume-media/paginas-legado/Ano-9-scaled-be1695ef.png"
}

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
          Selecciona el número de tu año personal y consulta el mes que te interesa. Vuelve a pulsarlo para ver todos los años.{' '}
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
              onClick={() => setNumero((current) => current === value ? null : value)}
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

      <div className="grid gap-x-6 gap-y-10 border-t border-border/60 pt-6 sm:grid-cols-2">
        {(numero ? numeros.filter((value) => value === numero) : numeros).map((value) => (
          <article key={value} className="min-w-0 space-y-4" aria-label={`Año Personal ${value}`}>
            <Link href={`/ano-personal/${value}` as Route} className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={YEAR_IMAGES[value]}
                alt={`Año Personal ${value}: consulta tu lección anual`}
                width={2560}
                height={963}
                loading="lazy"
                className="aspect-[2560/963] h-auto w-full object-contain"
              />
            </Link>
            <h3 className="text-center font-display text-lg font-semibold text-primary">
              Horóscopo del Mes
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {meses.map((mes) => (
                <Link
                  key={mes}
                  href={`/ano-${value}-${mes.toLowerCase()}/` as Route}
                  aria-label={`${mes} ${anio}, Año Personal ${value}`}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-border/80 bg-background text-xs font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
                >
                  {mes.slice(0, 3).toUpperCase()}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
