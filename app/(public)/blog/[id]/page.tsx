import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleContent } from '@/components/content/article-content'
import { SampleArticle } from '@/components/content/sample-article'
import { PremiumGate } from '@/components/memberships/premium-gate'
import type { ContentItem } from '@/lib/api/contracts'
import { ApiError } from '@/lib/api/errors'
import { getPostById, getPosts } from '@/lib/api/posts'
import { getTags } from '@/lib/api/taxonomy'
import { getSamplePost, SAMPLE_POSTS } from '@/lib/blog/sample-posts'

export function generateStaticParams() {
  return SAMPLE_POSTS.map((post) => ({ id: post.slug }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const sample = getSamplePost(params.id)
  if (!sample) return { title: 'Artículo' }

  return {
    title: sample.title,
    description: sample.excerpt,
    alternates: { canonical: `/blog/${sample.slug}` },
    openGraph: {
      type: 'article',
      title: sample.title,
      description: sample.excerpt,
      url: `/blog/${sample.slug}`,
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
    return res.data
      .filter((tag) => wanted.has(tag.id))
      .map((tag) => ({ name: tag.name }))
  } catch {
    return []
  }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const sample = getSamplePost(params.id)
  if (sample) {
    return <SampleArticle post={sample} />
  }

  try {
    const post = await getPostById(params.id)
    const [relatedPosts, tags] = await Promise.all([
      loadRelatedPosts(post.id, post.category_id),
      resolveTagNames(post.tag_ids ?? [])
    ])
    return (
      <ArticleContent content={{ ...post, tags }} relatedPosts={relatedPosts} />
    )
  } catch (error) {
    if (error instanceof ApiError && error.status === 403) {
      return <PremiumGate detail={error.problem.detail} returnTo={`/blog/${params.id}`} />
    }
    if (error instanceof ApiError && error.status === 404) {
      notFound()
    }
    throw error
  }
}
