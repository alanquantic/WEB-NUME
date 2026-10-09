import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'

import { PostCard } from '@/components/content/post-card'
import { EmptyState } from '@/components/ui/empty-state'
import type { Category, ContentItem } from '@/lib/api/contracts'
import { getPosts } from '@/lib/api/posts'
import { getCategories } from '@/lib/api/taxonomy'
import { categoryPath, categorySegments } from '@/lib/categorias/paths'

const PAGE_SIZE = 12

type PageProps = {
  params: { segments: string[] }
}

// /categoria/{...path}/page/{n} → { path, page }
function parseSegments(segments: string[]): { path: string[]; page: number } | null {
  const n = segments.length
  if (n >= 3 && segments[n - 2] === 'page') {
    const page = Number(segments[n - 1])
    if (!Number.isInteger(page) || page < 1) return null
    return { path: segments.slice(0, -2), page }
  }
  return { path: segments, page: 1 }
}

async function findCategory(slug: string): Promise<Category | null> {
  try {
    return (await getCategories(1, 100)).data.find((category) => category.slug === slug) ?? null
  } catch {
    return null
  }
}

async function loadPosts(id: number, page: number): Promise<{ posts: ContentItem[]; total: number }> {
  try {
    const res = await getPosts({ category_id: id, page, limit: PAGE_SIZE })
    return { posts: res.data, total: res.pagination?.total ?? res.data.length }
  } catch {
    return { posts: [], total: 0 }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const parsed = parseSegments(params.segments)
  const category = parsed ? await findCategory(parsed.path[parsed.path.length - 1]) : null
  if (!parsed || !category) return { title: 'Categoría' }
  const name = category.name.trim()
  return {
    title: parsed.page > 1 ? `${name} · Página ${parsed.page}` : name,
    description: `Artículos de numerología en la categoría ${name}.`,
    alternates: { canonical: categoryPath(category.slug, parsed.page) }
  }
}

export default async function CategoriaPage({ params }: PageProps) {
  const parsed = parseSegments(params.segments)
  if (!parsed || !parsed.path.length) notFound()

  const slug = parsed.path[parsed.path.length - 1]
  const category = await findCategory(slug)
  if (!category) notFound()

  // Una subcategoría pedida sin su padre (o con otro) va a su URL canónica.
  if (parsed.path.join('/') !== categorySegments(slug).join('/')) {
    permanentRedirect(categoryPath(slug, parsed.page))
  }

  const { posts, total } = await loadPosts(category.id, parsed.page)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  if (parsed.page > totalPages) notFound()

  const page = parsed.page
  const name = category.name.trim()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia">Categoría</p>
      <h1 className="mt-1 font-display text-4xl font-semibold">{name}</h1>

      {posts.length > 0 ? (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-between gap-4"
              aria-label={`Paginación de ${name}`}
            >
              {page > 1 ? (
                <Link
                  href={categoryPath(category.slug, page - 1) as Route}
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-primary-soft hover:text-primary"
                >
                  ← Anteriores
                </Link>
              ) : (
                <span />
              )}

              <span className="text-sm font-medium text-foreground/60">
                Página {page} de {totalPages}
              </span>

              {page < totalPages ? (
                <Link
                  href={categoryPath(category.slug, page + 1) as Route}
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-primary-soft hover:text-primary"
                >
                  Siguientes →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Sin publicaciones aún"
            description="Todavía no hay artículos en esta categoría."
          />
        </div>
      )}
    </div>
  )
}
