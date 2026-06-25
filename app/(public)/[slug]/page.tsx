import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContentPageTemplate } from '@/components/content/content-page-template'
import { PageInProgress } from '@/components/content/page-in-progress'
import {
  COMING_SOON_PAGES,
  type ComingSoonSlug
} from '@/lib/coming-soon-pages'
import { CONTENT_PAGE_TEMPLATES } from '@/lib/content-page-templates'

type PageProps = {
  params: {
    slug: string
  }
}

function getPageConfig(slug: string) {
  if (!(slug in COMING_SOON_PAGES)) return null
  return COMING_SOON_PAGES[slug as ComingSoonSlug]
}

export function generateStaticParams() {
  return Object.keys(COMING_SOON_PAGES).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const config = getPageConfig(params.slug)

  if (!config) {
    return {
      title: 'Página no encontrada'
    }
  }

  return {
    title: `${config.title} | Nume`,
    description: config.description ?? 'Página en progreso dentro de Numerología Cotidiana.'
  }
}

export default function ComingSoonPage({ params }: PageProps) {
  const config = getPageConfig(params.slug)

  if (!config) {
    notFound()
  }

  const template = CONTENT_PAGE_TEMPLATES[params.slug]

  if (template) {
    return (
      <ContentPageTemplate banner={template.banner} sidebar={template.sidebar}>
        {template.content}
      </ContentPageTemplate>
    )
  }

  return <PageInProgress title={config.title} description={config.description} />
}
