import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { SamplePostCard } from '@/components/content/sample-post-card'
import { SearchIcon } from '@/components/ui/icons'
import type { Category } from '@/lib/api/contracts'
import { getCategories } from '@/lib/api/taxonomy'
import { getSamplePosts } from '@/lib/blog/sample-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos y guías de numerología para tu día a día: nombre, año personal, números maestros y más.'
}

async function loadCategories(): Promise<Category[]> {
  try {
    return (await getCategories(1, 8)).data
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = getSamplePosts()
  const categories = await loadCategories()
  const [featured, ...rest] = posts

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

      {featured ? (
        <div className="mt-8">
          <SamplePostCard post={featured} featured />
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((post) => (
          <SamplePostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
