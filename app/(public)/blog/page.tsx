import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { PostCard } from '@/components/content/post-card'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchIcon } from '@/components/ui/icons'
import type { Category, ContentItem } from '@/lib/api/contracts'
import { getPosts } from '@/lib/api/posts'
import { getCategories } from '@/lib/api/taxonomy'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos y guías de numerología para tu día a día: nombre, año personal, números maestros y más.'
}

const PAGE_SIZE = 12

async function loadCategories(): Promise<Category[]> {
  try {
    return (await getCategories(1, 100)).data
  } catch {
    return []
  }
}

async function loadPosts(page: number): Promise<{ posts: ContentItem[]; total: number }> {
  try {
    const res = await getPosts({ page, limit: PAGE_SIZE })
    return { posts: res.data, total: res.pagination?.total ?? res.data.length }
  } catch {
    return { posts: [], total: 0 }
  }
}

export default async function BlogPage({
  searchParams
}: {
  searchParams?: { page?: string }
}) {
  const page = Math.max(1, Number(searchParams?.page ?? '1') || 1)
  const [{ posts, total }, categories] = await Promise.all([loadPosts(page), loadCategories()])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold">Blog</h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-foreground/72">
            Guías claras para entender tu numerología y llevarla a tu día a día.
          </p>
        </div>
        <form action="/busqueda" className="flex w-full max-w-sm items-center gap-2">
          <input
            type="search"
            name="q"
            placeholder="Buscar en el blog..."
            className="h-11 w-full rounded-full border border-border bg-muted/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white"
          >
            <SearchIcon width={16} height={16} />
          </button>
        </form>
      </div>

      {categories.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-primary/30 bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary">
            Todo
          </span>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categorias/${category.id}` as Route}
              className="header-chip rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/75 hover:bg-primary-soft hover:text-primary"
            >
              <span className="relative z-10">{category.name.trim()}</span>
            </Link>
          ))}
        </div>
      ) : null}

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
              aria-label="Paginación del blog"
            >
              {hasPrev ? (
                <Link
                  href={(page - 1 === 1 ? '/blog' : `/blog?page=${page - 1}`) as Route}
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

              {hasNext ? (
                <Link
                  href={`/blog?page=${page + 1}` as Route}
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
            description="Muy pronto encontrarás aquí los artículos del blog."
          />
        </div>
      )}
    </div>
  )
}
