import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { EmptyState } from '@/components/ui/empty-state'
import { SearchIcon } from '@/components/ui/icons'
import { searchContent, type SearchResultItem } from '@/lib/api/search'
import { excerptFromHtml, formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Búsqueda',
  description: 'Busca artículos y guías de numerología en Numerología Cotidiana.'
}

const LIMIT = 12

function resultHref(item: SearchResultItem): Route {
  const base = item.type === 'page' ? '/paginas' : '/blog'
  return `${base}/${item.slug}` as Route
}

function pageHref(query: string, page: number): Route {
  return `/busqueda?q=${encodeURIComponent(query)}&page=${page}` as Route
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q?: string; page?: string }
}) {
  const q = (searchParams.q ?? '').trim()
  const page = Math.max(1, Number(searchParams.page) || 1)

  let results: SearchResultItem[] = []
  let total = 0
  let failed = false

  if (q) {
    try {
      const response = await searchContent({ query: q, page, limit: LIMIT })
      results = response.data
      total = response.pagination.total
    } catch {
      failed = true
    }
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Búsqueda</h1>
      <p className="mt-3 text-base leading-7 text-foreground/72">
        Encuentra artículos y guías de numerología para tu día a día.
      </p>

      <form action="/busqueda" className="mt-6 flex w-full items-center gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="¿Qué quieres buscar?"
          aria-label="Buscar"
          className="h-12 w-full rounded-full border border-border bg-muted/50 px-5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white"
        >
          <SearchIcon width={18} height={18} />
        </button>
      </form>

      <div className="mt-8">
        {!q ? (
          <EmptyState
            title="Escribe algo para empezar"
            description="Busca por tema, número o título: por ejemplo «número de la madurez» o «numerología de pareja»."
          />
        ) : failed ? (
          <EmptyState
            title="No pudimos completar la búsqueda"
            description="Hubo un problema al consultar el servidor. Inténtalo de nuevo en unos segundos."
          />
        ) : results.length === 0 ? (
          <EmptyState
            title={`Sin resultados para «${q}»`}
            description="Prueba con otras palabras, o explora el blog y las calculadoras desde el menú."
          />
        ) : (
          <>
            <p className="text-sm text-foreground/60">
              {total} {total === 1 ? 'resultado' : 'resultados'} para «{q}»
            </p>

            <ul className="mt-4 space-y-4">
              {results.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <Link
                    href={resultHref(item)}
                    className="block rounded-2xl border border-border/70 bg-card p-5 shadow-panel transition hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-fuchsia">
                      <span>{item.type === 'page' ? 'Página' : 'Artículo'}</span>
                      {item.published_at ? (
                        <span className="text-foreground/45">{formatDate(item.published_at)}</span>
                      ) : null}
                    </div>
                    <h2 className="mt-1 font-display text-xl font-semibold">{item.title}</h2>
                    {item.excerpt ? (
                      <p className="mt-2 text-sm leading-6 text-foreground/70">
                        {excerptFromHtml(item.excerpt, 180)}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 ? (
              <div className="mt-8 flex items-center justify-between">
                {page > 1 ? (
                  <Link
                    href={pageHref(q, page - 1)}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-primary-soft hover:text-primary"
                  >
                    ← Anterior
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-sm text-foreground/55">
                  Página {page} de {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={pageHref(q, page + 1)}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-primary-soft hover:text-primary"
                  >
                    Siguiente →
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
