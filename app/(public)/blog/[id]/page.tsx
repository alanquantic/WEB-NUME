import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleContent } from '@/components/content/article-content'
import { SampleArticle } from '@/components/content/sample-article'
import { PremiumGate } from '@/components/memberships/premium-gate'
import { ApiError } from '@/lib/api/errors'
import { getPostById } from '@/lib/api/posts'
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

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const sample = getSamplePost(params.id)
  if (sample) {
    return <SampleArticle post={sample} />
  }

  try {
    const post = await getPostById(params.id)
    return <ArticleContent content={post} />
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
