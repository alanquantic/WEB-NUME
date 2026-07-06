import type { Metadata } from 'next'

import { PostCard } from '@/components/content/post-card'
import { EmptyState } from '@/components/ui/empty-state'
import type { ContentItem } from '@/lib/api/contracts'
import { getPosts } from '@/lib/api/posts'
import { getTags } from '@/lib/api/taxonomy'

export const metadata: Metadata = {
  title: 'Tag'
}

async function loadName(id: number): Promise<string> {
  try {
    return (await getTags(1, 100)).data.find((tag) => tag.id === id)?.name.trim() ?? 'Tag'
  } catch {
    return 'Tag'
  }
}

async function loadPosts(id: number): Promise<ContentItem[]> {
  if (Number.isNaN(id)) return []
  try {
    return (await getPosts({ tag_id: id, page: 1, limit: 12 })).data
  } catch {
    return []
  }
}

export default async function TagDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const [name, posts] = await Promise.all([loadName(id), loadPosts(id)])

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia">Tag</p>
      <h1 className="mt-1 font-display text-4xl font-semibold">#{name}</h1>

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
            description="Todavía no hay artículos con esta etiqueta."
          />
        </div>
      )}
    </div>
  )
}
