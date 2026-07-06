import type { Metadata } from 'next'

import { PostCard } from '@/components/content/post-card'
import { EmptyState } from '@/components/ui/empty-state'
import type { ContentItem } from '@/lib/api/contracts'
import { getPosts } from '@/lib/api/posts'
import { getCategories } from '@/lib/api/taxonomy'

export const metadata: Metadata = {
  title: 'Categoría'
}

async function loadName(id: number): Promise<string> {
  try {
    return (
      (await getCategories(1, 100)).data.find((category) => category.id === id)?.name.trim() ??
      'Categoría'
    )
  } catch {
    return 'Categoría'
  }
}

async function loadPosts(id: number): Promise<ContentItem[]> {
  if (Number.isNaN(id)) return []
  try {
    return (await getPosts({ category_id: id, page: 1, limit: 12 })).data
  } catch {
    return []
  }
}

export default async function CategoryDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const [name, posts] = await Promise.all([loadName(id), loadPosts(id)])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia">Categoría</p>
      <h1 className="mt-1 font-display text-4xl font-semibold">{name}</h1>

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
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
