import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleContent } from '@/components/content/article-content'
import { PagePasswordGate } from '@/components/content/page-password-gate'
import { PremiumGate } from '@/components/memberships/premium-gate'
import { ApiError } from '@/lib/api/errors'
import { getPageById, isPagePasswordRequired } from '@/lib/api/pages'

// ISR: regenera páginas del CMS cada hora.
export const revalidate = 3600

// Las páginas protegidas no se indexan, ni siquiera con el comprobante de acceso.
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const page = await getPageById(params.id)
    return page.status === 'protected' ? { robots: { index: false, follow: false } } : {}
  } catch (error) {
    return isPagePasswordRequired(error)
      ? { title: 'Contenido protegido', robots: { index: false, follow: false } }
      : {}
  }
}

export default async function PageDetailPage({ params }: { params: { id: string } }) {
  try {
    const page = await getPageById(params.id)
    return <ArticleContent content={page} />
  } catch (error) {
    if (isPagePasswordRequired(error)) {
      return <PagePasswordGate pageId={params.id} />
    }

    if (error instanceof ApiError && error.status === 403) {
      return <PremiumGate detail={error.problem.detail} returnTo={`/paginas/${params.id}`} />
    }

    if (error instanceof ApiError && error.status === 404) {
      notFound()
    }

    throw error
  }
}

