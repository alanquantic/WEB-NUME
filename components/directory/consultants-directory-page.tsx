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

function getUniqueValues(
  consultants: ConsultantDirectoryItem[],
  select: (consultant: ConsultantDirectoryItem) => string | null | undefined
) {
  return Array.from(
    new Set(
      consultants
        .map(select)
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value))
    )
  ).sort((a, b) => a.localeCompare(b, 'es'))
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
    <div className="bg-[linear-gradient(180deg,#fff8ee_0%,#f7ecdd_28%,#fbf4e8_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <section
          className="overflow-hidden rounded-[2.6rem] border border-[#e7d1b9] bg-[#693061] shadow-[0_28px_70px_rgba(105,48,97,0.18)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(105,48,97,0.18), rgba(105,48,97,0.28)), url('/images/directory-hero-banner.png')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="flex min-h-[320px] items-center justify-center px-8 py-16 text-center md:min-h-[400px] md:px-12 md:py-20">
            <div className="max-w-3xl rounded-[2rem] bg-white/96 px-8 py-8 shadow-[0_20px_55px_rgba(105,48,97,0.18)] backdrop-blur-sm md:px-12 md:py-10">
              <h1 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
                Consultores e Instructores Numerológicos
              </h1>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-consultor-certificado.png"
                  alt="Consultor Certificado"
                  className="h-16 w-auto object-contain md:h-20"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-instructor-certificado.png"
                  alt="Instructor Certificado"
                  className="h-16 w-auto object-contain md:h-20"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2.2rem] border border-[#e7d1b9] bg-white shadow-[0_18px_40px_rgba(105,48,97,0.08)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/directory-group-268.png"
            alt="Consultores e instructores numerológicos"
            className="h-auto w-full object-cover"
          />
        </section>

        <section id="directory-filter" className="mt-8 rounded-[2.2rem] border border-[#e7d1b9] bg-[#AD91A9] p-6 shadow-[0_18px_40px_rgba(105,48,97,0.08)]">
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <h2 className="font-display text-3xl font-semibold text-[#693061] md:text-4xl">
              Descubre y contacta a uno de nuestros expertos certificados.
            </h2>
          </div>

          <AutoSubmitForm action={pathname} className="space-y-5">
            {forcedConsultantCategory ? (
              <input type="hidden" name="consultant_category" value={forcedConsultantCategory} />
            ) : null}
            {filters.has_next_course ? (
              <input type="hidden" name="has_next_course" value="true" />
            ) : null}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-around lg:gap-8">
              <label className="grid gap-3 text-sm font-medium text-[#693061] lg:w-full lg:max-w-[24rem]">
                <span className="flex items-center justify-center gap-3 text-center text-xl font-extrabold text-[#ebcbae] md:justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    decoding="async"
                    src="/images/directory-loupe.png"
                    alt="lupa"
                    data-pin-no-hover="true"
                    className="h-9 w-9 object-contain"
                  />
                  Estoy buscando:
                </span>
                <select
                  name="tier"
                  defaultValue={filters.tier ?? ''}
                  className="h-[3.75rem] w-full rounded-[1rem] border border-[#eadbc8] bg-white px-5 text-base text-[#5a344e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b38a25]"
                >
                  <option value="">Todas</option>
                  {tiers.map((tier) => (
                    <option key={tier.slug} value={tier.slug}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-3 text-sm font-medium text-[#693061] lg:w-full lg:max-w-[24rem]">
                <span className="flex items-center justify-center gap-3 text-center text-xl font-extrabold text-[#ebcbae] md:justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/directory-worldwide.png" alt="" className="h-9 w-9 object-contain" />
                  País
                </span>
                <select
                  name="nationality"
                  defaultValue={nationalityCode ?? ''}
                  className="h-[3.75rem] w-full rounded-[1rem] border border-[#eadbc8] bg-white px-5 text-base text-[#5a344e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b38a25]"
                >
                  <option value="">Todos</option>
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
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#693061]">Resultados</h2>
              <p className="mt-1 text-base text-[#7c685f]">
                {total === 0
                  ? 'No encontramos consultores con esos filtros.'
                  : `Mostrando ${showingFrom}-${showingTo} de ${total} perfiles.`}
              </p>
            </div>
            {page > totalPages ? (
              <Link
                href={buildHref(pathname, { ...filters, page: totalPages })}
                className="text-sm font-semibold text-[#693061] hover:underline"
              >
                Ir a la última página disponible
              </Link>
            ) : null}
          </div>

          {consultants.data.length === 0 ? (
            <div className="mt-6 rounded-[2rem] border border-dashed border-[#d8c2ab] bg-[#fff7ea] px-6 py-10 text-center shadow-[0_14px_28px_rgba(105,48,97,0.06)]">
              <p className="font-display text-2xl font-semibold text-[#693061]">Sin coincidencias por ahora</p>
              <p className="mt-2 text-sm leading-6 text-[#7d6b63]">
                Ajusta la búsqueda o limpia los filtros para volver a ver el directorio completo.
              </p>
              {hasActiveFilters ? (
                <Link
                  href={resetHref}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-b from-[#dea924] to-[#b38a25] px-5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Ver todos los consultores
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {consultants.data.map((consultant) => (
                <ConsultantCard key={consultant.id} consultant={consultant} hrefBase={hrefBase} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-[1.85rem] border border-[#e7d1b9] bg-[#fff7ea] px-5 py-4 shadow-[0_12px_28px_rgba(105,48,97,0.08)]">
              {page > 1 ? (
                <Link
                  href={previousHref}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[#693061] transition hover:bg-[#f7ecdd]"
                >
                  Anterior
                </Link>
              ) : (
                <span className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-full bg-white/70 px-4 text-sm font-semibold text-[#693061]/35">
                  Anterior
                </span>
              )}

              <p className="text-sm text-[#7c685f]">
                Página {Math.min(page, totalPages)} de {totalPages}
              </p>

              {page < totalPages ? (
                <Link
                  href={nextHref}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-[#693061] px-4 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Siguiente
                </Link>
              ) : (
                <span className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-full bg-[#693061]/35 px-4 text-sm font-semibold text-white/80">
                  Siguiente
                </span>
              )}
            </nav>
          ) : null}
        </section>
      </div>
    </div>
  )
}
