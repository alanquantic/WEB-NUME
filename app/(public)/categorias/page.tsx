import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { EmptyState } from '@/components/ui/empty-state'
import type { Category } from '@/lib/api/contracts'
import { getCategories } from '@/lib/api/taxonomy'

export const metadata: Metadata = {
  title: 'Categorías'
}

async function loadCategories(): Promise<Category[]> {
  try {
    return (await getCategories(1, 100)).data
  } catch {
    return []
  }
}

export default async function CategoriesPage() {
  const categories = await loadCategories()

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Categorías</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">
        Explora los temas del blog de numerología.
      </p>

      {categories.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categorias/${category.id}` as Route}
              className="group rounded-[1.6rem] border border-border/80 bg-card p-5 shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="block font-display text-lg font-semibold text-foreground group-hover:text-primary">
                {category.name.trim()}
              </span>
              <span className="mt-2 block text-sm font-semibold text-primary">Ver artículos →</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Muy pronto"
            description="Las categorías estarán disponibles en breve."
          />
        </div>
      )}
    </div>
  )
}
