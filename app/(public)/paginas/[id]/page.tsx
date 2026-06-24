import { notFound } from 'next/navigation'

import { ArticleContent } from '@/components/content/article-content'
import { PremiumGate } from '@/components/memberships/premium-gate'
import { ApiError } from '@/lib/api/errors'
import { getPageById } from '@/lib/api/pages'

export default async function PageDetailPage({ params }: { params: { id: string } }) {
  try {
    const page = await getPageById(params.id)
    return <ArticleContent content={page} />
  } catch (error) {
    if (error instanceof ApiError && error.status === 403) {
      return <PremiumGate detail={error.problem.detail} returnTo={`/paginas/${params.id}`} />
    }

    if (error instanceof ApiError && error.status === 404) {
      notFound()
    }

    throw error
  }
}

