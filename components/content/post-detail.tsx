import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'

import { ArticleContent } from '@/components/content/article-content'
import { SampleArticle } from '@/components/content/sample-article'
import { PremiumGate } from '@/components/memberships/premium-gate'
import type { ContentItem } from '@/lib/api/contracts'
import { ApiError } from '@/lib/api/errors'
import { getPostById, getPosts } from '@/lib/api/posts'
import { getTags } from '@/lib/api/taxonomy'
import { postPath } from '@/lib/blog/paths'
import { getSamplePost } from '@/lib/blog/sample-posts'
import { excerptFromHtml } from '@/lib/format'

// Detalle de un post del blog servido en /{slug} (la API acepta id o slug).
// Devuelve null si el post no existe, para que la ruta pueda responder 404.

type Post = Awaited<ReturnType<typeof getPostById>>

async function fetchPost(slug: string): Promise<Post | 'forbidden' | null> {
  try {
    return await getPostById(slug)
  } catch (error) {
    if (error instanceof ApiError && error.status === 403) return 'forbidden'
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) return null
    throw error
  }
}

export async function getPostMetadata(slug: string): Promise<Metadata | null> {
  const post = await fetchPost(slug).catch(() => null)
  if (post && post !== 'forbidden') {
    const description = excerptFromHtml(post.content_html, 155)
    const path = postPath(post.slug)
    return {
      title: post.title,
      description,
      alternates: { canonical: path },
      openGraph: {
        type: 'article',
        title: post.title,
        description,
        url: path,
        publishedTime: post.published_at ?? undefined,
        images: post.featured_image_url ? [post.featured_image_url] : undefined
      }
    }
  }
  if (post === 'forbidden') return { title: 'Artículo para miembros' }

  const sample = getSamplePost(slug)
  if (!sample) return null
  return {
    title: sample.title,
    description: sample.excerpt,
    alternates: { canonical: postPath(sample.slug) },
    openGraph: {
      type: 'article',
      title: sample.title,
      description: sample.excerpt,
      url: postPath(sample.slug),
      publishedTime: sample.date
    }
  }
}

async function loadRelatedPosts(
  postId: string,
  categoryId: number | null | undefined
): Promise<ContentItem[]> {
  if (!categoryId) return []
  try {
    const res = await getPosts({ category_id: categoryId, page: 1, limit: 4 })
    return res.data.filter((item) => item.id !== postId).slice(0, 3)
  } catch {
    return []
  }
}

async function resolveTagNames(tagIds: number[]): Promise<{ name: string }[]> {
  if (tagIds.length === 0) return []
  try {
    const res = await getTags(1, 200)
    const wanted = new Set(tagIds)
    return res.data.filter((tag) => wanted.has(tag.id)).map((tag) => ({ name: tag.name }))
  } catch {
    return []
  }
}

export async function PostDetail({ slug }: { slug: string }) {
  const post = await fetchPost(slug)

  if (post === 'forbidden') {
    return <PremiumGate returnTo={postPath(slug)} />
  }

  if (!post) {
    const sample = getSamplePost(slug)
    if (sample) return <SampleArticle post={sample} />
    notFound()
  }

  // Pedido por id u otro alias: a la URL canónica del post.
  if (post.slug !== slug) permanentRedirect(postPath(post.slug))

  const [relatedPosts, tags] = await Promise.all([
    loadRelatedPosts(post.id, post.category_id),
    resolveTagNames(post.tag_ids ?? [])
  ])
  return <ArticleContent content={{ ...post, tags }} relatedPosts={relatedPosts} />
}
