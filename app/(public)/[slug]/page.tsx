import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PersonalPageView } from '@/components/content/personal-page-view'
import { getPersonalEntryBySlug, getPersonalSlugs } from '@/lib/personales/data'

type PageProps = {
  params: {
    slug: string
  }
}

// Solo se generan las páginas "personales" conocidas; cualquier otro slug de
// primer nivel responde 404 (las rutas estáticas existentes tienen prioridad
// sobre este segmento dinámico).
export const dynamicParams = false

export function generateStaticParams() {
  return getPersonalSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const result = getPersonalEntryBySlug(params.slug)

  if (!result) {
    return {
      title: 'Numerología Cotidiana'
    }
  }

  return {
    title: result.entry.titulo,
    description: result.entry.subtitulo || result.categoria.descripcion
  }
}

export default function Page({ params }: PageProps) {
  const result = getPersonalEntryBySlug(params.slug)

  if (!result) {
    notFound()
  }

  return <PersonalPageView categoria={result.categoria} entry={result.entry} />
}
