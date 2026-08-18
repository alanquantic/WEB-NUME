import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { ArrowRight, Sparkles } from 'lucide-react'

import { StoreProductsSlider } from '@/components/content/store-products-slider'
import { SparkleField } from '@/components/ui/sparkle-field'
import { getRelatedProducts } from '@/lib/api/products'
import { getMeaning } from '@/lib/numerology/meanings'
import { getPersonalResumen } from '@/lib/personales/data'
import type { PersonalCategoriaKey } from '@/lib/personales/routes'
import Person from '@/resources/person'

// Landing personalizada: los datos llegan por query desde el botón
// "Quiero saber más" del home, así que no debe indexarse.
export const metadata: Metadata = {
  title: 'Mi mapa numerológico',
  description:
    'Tus resultados numerológicos en un solo lugar: energía de hoy, esencia, misión y año personal 2026.',
  robots: { index: false }
}

type Resultados = {
  nombrePila: string
  nacimiento: Date
  personalNumber: number | string
  soulNumber: number | string
  personalYear: number | string
  personalDay: number | string
  personalWeek: number | string
  personalMonth: number | string
}

function sanitizeName(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim()
}

function parseDateInput(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null
  const [year, month, day] = [match[1], match[2], match[3]].map((part) => parseInt(part, 10))
  const date = new Date(Date.UTC(year, month - 1, day, 12))
  if (Number.isNaN(date.getTime()) || date.getUTCMonth() !== month - 1) return null
  return date
}

function normalizeValue(value: number | string | false | null | undefined): number | string {
  if (value === false || value === null || value === undefined || value === '') return '?'
  return value
}

function calcularResultados(nombre: string, nacimiento: string): Resultados | null {
  const fullName = sanitizeName(nombre)
  const birthDate = parseDateInput(nacimiento)
  if (!fullName || !birthDate) return null

  const [name = '', ...rest] = fullName.split(' ')
  const person = new Person({ name, lastName: rest.join(' '), birthDate })
  const now = new Date()

  return {
    nombrePila: name,
    nacimiento: birthDate,
    personalNumber: normalizeValue(person.calcPersonalNumber()),
    soulNumber: normalizeValue(person.calcSoulNumber()),
    personalYear: normalizeValue(person.calcPersonalYear(new Date(now.getFullYear(), 0, 1))),
    personalDay: normalizeValue(person.calcPersonalDay(now)),
    personalWeek: normalizeValue(person.calcPersonalWeek(now)),
    personalMonth: normalizeValue(person.calcPersonalMonth(now, now))
  }
}

/**
 * Descripción corta del número: primero el contenido real de las páginas
 * "personales" (libro); si esa combinación no existe, el significado genérico.
 */
function descripcionCorta(
  categoria: PersonalCategoriaKey,
  value: number | string,
  maxLen: number
): string | null {
  const resumen = getPersonalResumen(categoria, value, maxLen)
  if (resumen) return resumen
  const parsed = typeof value === 'string' ? Number(value) : value
  if (!Number.isFinite(parsed)) return null
  return getMeaning(parsed).description
}

function SaberMasLink({
  href,
  label,
  className
}: {
  href: string
  label: string
  /** Colores del botón (fondo/texto/sombra) según el tono de la sección. */
  className?: string
}) {
  return (
    <Link
      href={href as Route}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition hover:scale-[1.03] ${className ?? ''}`}
    >
      {label}
      <ArrowRight
        size={15}
        className="shrink-0 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  )
}

function BannerPlaceholder() {
  // Espacio reservado para un banner horizontal 1920x600; la imagen se
  // integrará después. Mantener la proporción para evitar saltos de layout.
  return (
    <section aria-label="Espacio publicitario">
      <div className="flex aspect-[1920/600] w-full items-center justify-center rounded-[2rem] border-2 border-dashed border-border bg-secondary/40">
        <span className="px-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
          Espacio para banner · 1920 × 600
        </span>
      </div>
    </section>
  )
}

function SinDatos() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">
        <span className="text-gradient-brand">Mi Mapa Numerológico</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-foreground/72">
        Para ver tus resultados necesitamos tu nombre completo y tu fecha de nacimiento. Calcula
        tu mapa desde la página de inicio y vuelve con el botón “Quiero saber más”.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
      >
        <Sparkles size={16} aria-hidden /> Calcular mi mapa
      </Link>
    </div>
  )
}

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const nombre = typeof searchParams.nombre === 'string' ? searchParams.nombre : ''
  const nacimiento = typeof searchParams.nacimiento === 'string' ? searchParams.nacimiento : ''

  const resultados = calcularResultados(nombre, nacimiento)
  if (!resultados) return <SinDatos />

  const productos = await getRelatedProducts({ limit: 10 })

  const fechaLegible = new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeZone: 'UTC'
  }).format(resultados.nacimiento)

  const nombreVisible =
    resultados.nombrePila.charAt(0).toUpperCase() + resultados.nombrePila.slice(1)

  const energia = [
    {
      label: 'Día',
      value: resultados.personalDay,
      circulo: 'bg-[hsl(var(--accent))] shadow-[0_12px_28px_hsl(var(--accent)/0.4)]',
      boton:
        'bg-[hsl(var(--accent))] text-white shadow-[0_12px_26px_hsl(var(--accent)/0.35)] hover:bg-[hsl(var(--accent)/0.9)]',
      descripcion: descripcionCorta('dia-personal', resultados.personalDay, 170),
      linkLabel: 'Quiero saber más sobre mi día personal',
      linkHref: '/diapersonal'
    },
    {
      label: 'Semana',
      value: resultados.personalWeek,
      circulo: 'bg-[hsl(var(--royal-blue))] shadow-[0_12px_28px_hsl(var(--royal-blue)/0.4)]',
      boton:
        'bg-[hsl(var(--royal-blue))] text-white shadow-[0_12px_26px_hsl(var(--royal-blue)/0.35)] hover:bg-[hsl(var(--royal-blue)/0.9)]',
      descripcion: descripcionCorta('semana', resultados.personalWeek, 170),
      linkLabel: 'Quiero saber más sobre mi semana personal',
      linkHref: '/semanapersonal'
    },
    {
      label: 'Mes',
      value: resultados.personalMonth,
      circulo: 'bg-[hsl(var(--fuchsia))] shadow-[0_12px_28px_hsl(var(--fuchsia)/0.4)]',
      boton:
        'bg-[hsl(var(--fuchsia))] text-white shadow-[0_12px_26px_hsl(var(--fuchsia)/0.35)] hover:bg-[hsl(var(--fuchsia)/0.9)]',
      descripcion: descripcionCorta('mes-personal', resultados.personalMonth, 170),
      linkLabel: 'Quiero saber más sobre mi mes personal',
      linkHref: '/mespersonal'
    }
  ]

  const descripcionEsencia = descripcionCorta('numero-personal', resultados.personalNumber, 260)
  const descripcionMision = descripcionCorta('alma', resultados.soulNumber, 260)
  const descripcionAno = descripcionCorta('ano-personal', resultados.personalYear, 260)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="relative mx-auto max-w-3xl text-center">
        <SparkleField className="text-primary" />
        <span className="relative inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <Sparkles size={14} aria-hidden /> Tus resultados
        </span>
        <h1 className="relative mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
          <span className="text-gradient-brand">Mi Mapa Numerológico</span>
        </h1>
        <p className="relative mx-auto mt-5 max-w-2xl font-display text-2xl font-semibold leading-snug text-balance sm:text-3xl">
          Te damos la bienvenida,{' '}
          <span className="text-gradient-brand">{nombreVisible}</span>
        </p>
        <p className="relative mx-auto mt-2 max-w-2xl text-base leading-7 text-foreground/72 sm:text-lg">
          Estos son tus resultados numerológicos.
        </p>
        <p className="relative mt-2 text-sm text-foreground/55">Fecha de nacimiento: {fechaLegible}</p>
      </header>

      <div className="mt-12 space-y-10">
        {/* ── Mi energía de hoy ─────────────────────────────────────────── */}
        <section
          aria-label="Mi energía de hoy"
          className="rounded-[2rem] border border-[hsl(var(--fuchsia)/0.16)] bg-[linear-gradient(135deg,hsl(var(--fuchsia)/0.14),hsl(var(--primary)/0.06)_45%,hsl(var(--royal-blue)/0.16))] p-6 shadow-[0_22px_55px_hsl(var(--primary)/0.1)] sm:p-10"
        >
          <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.03em] text-[hsl(var(--fuchsia))] sm:text-3xl">
            Mi energía de hoy
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/65">
            La vibración que acompaña tu día, tu semana y tu mes en este momento.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {energia.map((item) => (
              <article
                key={item.label}
                className="flex flex-col rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-panel sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-3xl font-semibold text-white ${item.circulo}`}
                  >
                    {item.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
                    {item.label}
                  </span>
                </div>
                {item.descripcion ? (
                  <p className="mt-4 flex-1 text-sm leading-6 text-foreground/72">
                    {item.descripcion}
                  </p>
                ) : null}
                <SaberMasLink
                  href={item.linkHref}
                  label={item.linkLabel}
                  className={`mt-4 w-full ${item.boton}`}
                />
              </article>
            ))}
          </div>
        </section>

        <BannerPlaceholder />

        {/* ── Mi esencia ────────────────────────────────────────────────── */}
        <section
          aria-label="Mi esencia"
          className="rounded-[2rem] border border-border/70 bg-primary-soft p-6 shadow-[0_22px_55px_hsl(var(--primary)/0.08)] sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center self-center rounded-full bg-gradient-brand font-display text-5xl font-semibold text-white shadow-glow sm:self-auto">
              {resultados.personalNumber}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/75">
                Número Personal
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-[0.03em] text-primary sm:text-3xl">
                Mi esencia
              </h2>
              {descripcionEsencia ? (
                <p className="mt-3 text-sm leading-7 text-foreground/75">{descripcionEsencia}</p>
              ) : null}
              <SaberMasLink
                href="/calculadoras/camino-de-vida"
                label="Quiero saber más sobre mi número personal"
                className="mt-5 bg-gradient-brand text-white shadow-[0_14px_30px_hsl(var(--primary)/0.3)]"
              />
            </div>
          </div>
        </section>

        {/* ── Mi misión ─────────────────────────────────────────────────── */}
        <section
          aria-label="Mi misión"
          className="rounded-[2rem] bg-[hsl(var(--primary))] p-6 text-white shadow-[0_24px_60px_hsl(var(--primary)/0.18)] sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center self-center rounded-full bg-white/12 font-display text-5xl font-semibold text-white shadow-[0_0_0_3px_hsl(0_0%_100%/0.18)] sm:self-auto">
              {resultados.soulNumber}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Número del Alma
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-[0.03em] sm:text-3xl">
                Mi misión
              </h2>
              {descripcionMision ? (
                <p className="mt-3 text-sm leading-7 text-white/85">{descripcionMision}</p>
              ) : null}
              <SaberMasLink
                href="/numerodelalma"
                label="Quiero saber más sobre mi número del alma"
                className="mt-5 bg-white text-primary shadow-[0_14px_30px_hsl(263_35%_10%/0.35)] hover:bg-white/92"
              />
            </div>
          </div>
        </section>

        <StoreProductsSlider
          title="De nuestra tienda"
          subtitle="Recursos para profundizar en tu lectura numerológica."
          products={productos}
        />

        {/* ── Mi año 2026 ───────────────────────────────────────────────── */}
        <section
          aria-label="Mi año personal 2026"
          className="rounded-[2rem] border border-[hsl(var(--accent)/0.25)] bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--accent)/0.16))] p-6 shadow-[0_22px_55px_hsl(var(--accent)/0.14)] sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center self-center rounded-full bg-[hsl(var(--accent))] font-display text-5xl font-semibold text-white shadow-[0_16px_38px_hsl(var(--accent)/0.4)] sm:self-auto">
              {resultados.personalYear}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--accent))]">
                Año Personal
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-[0.03em] text-[hsl(var(--accent))] sm:text-3xl">
                Mi año 2026
              </h2>
              {descripcionAno ? (
                <p className="mt-3 text-sm leading-7 text-foreground/75">{descripcionAno}</p>
              ) : null}
              <SaberMasLink
                href="/anopersonal"
                label="Quiero saber más sobre mi año personal"
                className="mt-5 bg-[hsl(var(--accent))] text-white shadow-[0_14px_30px_hsl(var(--accent)/0.4)] hover:bg-[hsl(var(--accent)/0.9)]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
