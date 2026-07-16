import Link from 'next/link'
import type { UrlObject } from 'url'

import { ContentRowActions } from '@/components/admin/content-row-actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AdminContentListItem, ApiListResponse, PostStatus } from '@/lib/api/contracts'
import type { ContentKind } from '@/lib/api/content.client'
import { excerptFromHtml } from '@/lib/format'
import { cn } from '@/lib/utils'

const statusLabels: Record<PostStatus, string> = {
  draft: 'Borrador',
  published: 'Publicado',
  scheduled: 'Programado',
  archived: 'Archivado'
}

const statusValues: PostStatus[] = ['draft', 'published', 'scheduled', 'archived']

const selectClassName = cn(
  'h-11 min-w-0 w-full rounded-2xl border border-[hsl(var(--border))] bg-white px-4 text-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]'
)

export type ContentListSearchParams = {
  page?: string
  search?: string
  status?: string
}

type ContentListViewProps = {
  kind: ContentKind
  result: ApiListResponse<AdminContentListItem>
  searchParams: ContentListSearchParams
}

function buildPageHref(
  basePath: string,
  searchParams: ContentListSearchParams,
  page: number
): UrlObject {
  const query: Record<string, string> = { page: String(page) }
  if (searchParams.search) query.search = searchParams.search
  if (searchParams.status) query.status = searchParams.status
  return { pathname: basePath, query }
}

export function ContentListView({ kind, result, searchParams }: ContentListViewProps) {
  const isPost = kind === 'posts'
  const basePath = isPost ? '/perfil/posts' : '/perfil/pages'
  const newHref = isPost ? '/perfil/posts/nuevo' : '/perfil/pages/nuevo'
  const heading = isPost ? 'Posts' : 'Páginas'
  const newLabel = isPost ? 'Nuevo post' : 'Nueva página'
  const publicBasePath = isPost ? '/blog' : '/paginas'

  const page = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1
  const totalPages = Math.max(1, Math.ceil(result.pagination.total / result.pagination.limit))

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">{heading}</h1>
            <p className="mt-2 text-sm text-[hsl(var(--foreground))/0.72]">
              {result.pagination.total} en total. Gestiona borradores, publicaciones y programados.
            </p>
          </div>
          <Link
            href={newHref}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {newLabel}
          </Link>
        </div>

        <form method="get" className="mt-6 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[1fr_200px_auto]">
          <Input name="search" placeholder="Buscar por título o slug" defaultValue={searchParams.search ?? ''} />
          <select name="status" className={selectClassName} defaultValue={searchParams.status ?? ''}>
            <option value="">Todos los estados</option>
            {statusValues.map((value) => (
              <option key={value} value={value}>
                {statusLabels[value]}
              </option>
            ))}
          </select>
          <Button type="submit">Filtrar</Button>
        </form>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        {result.data.length === 0 ? (
          <p className="text-sm text-[hsl(var(--foreground))/0.72]">
            No hay contenido con los filtros aplicados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] text-left text-[hsl(var(--foreground))/0.6]">
                  <th className="px-3 py-3 font-semibold">Título</th>
                  <th className="px-3 py-3 font-semibold">Estado</th>
                  <th className="px-3 py-3 font-semibold">Membresía</th>
                  <th className="px-3 py-3 font-semibold">Actualizado</th>
                  <th className="px-3 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {result.data.map((item) => (
                  <tr key={item.id} className="border-b border-[hsl(var(--border))/0.6]">
                    <td className="px-3 py-3">
                      <div className="flex items-start gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[hsl(var(--secondary))]">
                          {item.featured_image_url ? (
                            <img
                              src={item.featured_image_url}
                              alt={`Vista previa de ${item.title}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--foreground))/0.4]">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <span className="block font-medium">{item.title}</span>
                          <span className="block text-xs text-[hsl(var(--foreground))/0.5]">
                            /{item.slug}
                          </span>
                          {item.content_html ? (
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[hsl(var(--foreground))/0.65]">
                              {excerptFromHtml(item.content_html, 120)}
                            </p>
                          ) : null}
                          {item.status === 'published' ? (
                            <Link
                              href={`${publicBasePath}/${item.slug}`}
                              target="_blank"
                              className="mt-2 inline-flex text-xs font-semibold text-[hsl(var(--primary))] hover:underline"
                            >
                              Ver publicación
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge>{statusLabels[item.status]}</Badge>
                    </td>
                    <td className="px-3 py-3">{item.requires_membership ? 'Sí' : 'No'}</td>
                    <td className="px-3 py-3 text-[hsl(var(--foreground))/0.7]">
                      {new Date(item.updated_at).toLocaleDateString('es-MX')}
                    </td>
                    <td className="px-3 py-3">
                      <ContentRowActions kind={kind} id={item.id} title={item.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-[hsl(var(--foreground))/0.6]">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link
                href={buildPageHref(basePath, searchParams, page - 1)}
                className="rounded-full bg-[hsl(var(--secondary))] px-4 py-2 font-semibold"
              >
                Anterior
              </Link>
            ) : null}
            {page < totalPages ? (
              <Link
                href={buildPageHref(basePath, searchParams, page + 1)}
                className="rounded-full bg-[hsl(var(--secondary))] px-4 py-2 font-semibold"
              >
                Siguiente
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
