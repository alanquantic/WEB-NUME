import { notFound } from 'next/navigation'

import { ArticleContent } from '@/components/content/article-content'
import { PremiumGate } from '@/components/memberships/premium-gate'
import { ApiError } from '@/lib/api/errors'
import { getPostById } from '@/lib/api/posts'

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
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

