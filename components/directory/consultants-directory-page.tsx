import type { Route } from 'next'
import Link from 'next/link'

import { AutoSubmitForm } from '@/components/directory/auto-submit-form'
import { ConsultantCard } from '@/components/directory/consultant-card'
import type { ConsultantCategory, ConsultantDirectoryItem } from '@/lib/api/contracts'
import { getConsultants } from '@/lib/api/directory'
import { COUNTRY_OPTIONS, getCountryCode } from '@/lib/countries'

const PAGE_SIZE = 12

type SearchParams = Record<string, string | string[] | undefined>

function readParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

function readPage(value: string | string[] | undefined): number {
  const parsed = Number.parseInt(readParam(value), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function normalize(value: string): string | undefined {
  const trimmed = value.trim()
  return trimmed ? trimmed : undefined
}

function buildHref(
  pathname: string,
  params: {
    search?: string
    consultant_category?: string
    nationality?: string
    tier?: string
    has_next_course?: boolean
    page?: number
  }
) {
  const query = new URLSearchParams()

  if (params.search) query.set('search', params.search)
  if (params.consultant_category) query.set('consultant_category', params.consultant_category)
  if (params.nationality) query.set('nationality', params.nationality)
  if (params.tier) query.set('tier', params.tier)
  if (params.has_next_course) query.set('has_next_course', 'true')
  if (params.page && params.page > 1) query.set('page', String(params.page))

  const queryString = query.toString()
  return (queryString ? `${pathname}?${queryString}` : pathname) as Route
}

function getUniqueTiers(consultants: ConsultantDirectoryItem[]) {
  const tiers = new Map<string, string>()

  for (const consultant of consultants) {
    for (const tier of consultant.tiers) {
      if (!tiers.has(tier.slug)) tiers.set(tier.slug, tier.label)
    }
  }

  return Array.from(tiers.entries())
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label, 'es'))
}

function readBooleanParam(value: string | string[] | undefined): boolean {
  const normalized = readParam(value).trim().toLowerCase()
  return normalized === 'true' || normalized === '1' || normalized === 'yes'
}

export async function ConsultantsDirectoryPage({
  pathname,
  title,
  description,
  searchParams,
  hrefBase,
  forcedConsultantCategory
}: {
  pathname: string
  title: string
  description: string
  searchParams?: SearchParams
  hrefBase: string
  forcedConsultantCategory?: ConsultantCategory
}) {
  const filters = {
    search: normalize(readParam(searchParams?.search)),
    consultant_category:
      forcedConsultantCategory ?? normalize(readParam(searchParams?.consultant_category)),
    nationality: normalize(readParam(searchParams?.nationality)),
    tier: normalize(readParam(searchParams?.tier)),
    has_next_course: readBooleanParam(searchParams?.has_next_course)
  }
  const nationalityCode = getCountryCode(filters.nationality) ?? filters.nationality
  const page = readPage(searchParams?.page)

  const [consultants, filterSource] = await Promise.all([
    getConsultants({
      ...filters,
      nationality: nationalityCode,
      page,
      limit: PAGE_SIZE
    }),
    getConsultants({ limit: 100 })
  ])

  const tiers = getUniqueTiers(filterSource.data)

  const total = consultants.pagination.total
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const currentCount = consultants.data.length
  const showingFrom = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const showingTo = total === 0 ? 0 : showingFrom + currentCount - 1
  const hasActiveFilters = Object.values(filters).some(Boolean)
  const previousHref = buildHref(pathname, { ...filters, page: page - 1 })
  const nextHref = buildHref(pathname, { ...filters, page: page + 1 })
  const resetHref = buildHref(pathname, {})

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-foreground">{title}</h1>
        <p className="mt-3 text-base leading-8 text-foreground/72">{description}</p>
      </header>

      <section
        id="directory-filter"
        className="mt-8 rounded-[2rem] border border-border/70 bg-card p-6 shadow-panel sm:p-8"
      >
        <AutoSubmitForm action={pathname} className="space-y-5">
          {forcedConsultantCategory ? (
            <input type="hidden" name="consultant_category" value={forcedConsultantCategory} />
          ) : null}
          {filters.has_next_course ? (
            <input type="hidden" name="has_next_course" value="true" />
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-foreground/80">
              Estoy buscando
              <select
                name="tier"
                defaultValue={filters.tier ?? ''}
                className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary"
              >
                <option value="">Todas las certificaciones</option>
                {tiers.map((tier) => (
                  <option key={tier.slug} value={tier.slug}>
                    {tier.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-foreground/80">
              País
              <select
                name="nationality"
                defaultValue={nationalityCode ?? ''}
                className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-primary"
              >
                <option value="">Todos los países</option>
                {COUNTRY_OPTIONS.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </AutoSubmitForm>
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-sm leading-6 text-foreground/65">
            {total === 0
              ? 'No encontramos perfiles con esos filtros.'
              : `Mostrando ${showingFrom}-${showingTo} de ${total} perfiles.`}
          </p>
          {page > totalPages ? (
            <Link
              href={buildHref(pathname, { ...filters, page: totalPages })}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Ir a la última página disponible
            </Link>
          ) : null}
        </div>

        {consultants.data.length === 0 ? (
          <div className="mt-6 rounded-[2rem] border border-dashed border-border/80 bg-[hsl(var(--secondary)/0.4)] px-6 py-12 text-center">
            <p className="font-display text-2xl font-semibold text-primary">
              Sin coincidencias por ahora
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/70">
              Ajusta la búsqueda o limpia los filtros para volver a ver el directorio completo.
            </p>
            {hasActiveFilters ? (
              <Link
                href={resetHref}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
              >
                Ver todos los perfiles
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {consultants.data.map((consultant) => (
              <ConsultantCard key={consultant.id} consultant={consultant} hrefBase={hrefBase} />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <nav className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-border/70 bg-card px-5 py-4 shadow-panel">
            {page > 1 ? (
              <Link
                href={previousHref}
                className="inline-flex h-10 items-center justify-center rounded-full border border-border/80 bg-background px-4 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary-soft"
              >
                Anterior
              </Link>
            ) : (
              <span className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-full border border-border/60 bg-background/60 px-4 text-sm font-semibold text-foreground/35">
                Anterior
              </span>
            )}

            <p className="text-sm text-foreground/65">
              Página {Math.min(page, totalPages)} de {totalPages}
            </p>

            {page < totalPages ? (
              <Link
                href={nextHref}
                className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-brand px-4 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
              >
                Siguiente
              </Link>
            ) : (
              <span className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-full bg-gradient-brand px-4 text-sm font-semibold text-white/70 opacity-40">
                Siguiente
              </span>
            )}
          </nav>
        ) : null}
      </section>
    </div>
  )
}
