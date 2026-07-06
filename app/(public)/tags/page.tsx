import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'

import { EmptyState } from '@/components/ui/empty-state'
import type { Tag } from '@/lib/api/contracts'
import { getTags } from '@/lib/api/taxonomy'

export const metadata: Metadata = {
  title: 'Tags'
}

async function loadTags(): Promise<Tag[]> {
  try {
    return (await getTags(1, 100)).data
  } catch {
    return []
  }
}

export default async function TagsPage() {
  const tags = await loadTags()

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold">Tags</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">
        Navega por etiquetas para encontrar contenido específico.
      </p>

      {tags.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.id}` as Route}
              className="header-chip rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-primary-soft hover:text-primary"
            >
              <span className="relative z-10">#{tag.name.trim()}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState title="Muy pronto" description="Las etiquetas estarán disponibles en breve." />
        </div>
      )}
    </div>
  )
}
