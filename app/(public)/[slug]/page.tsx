import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GuiaPersonalView } from '@/components/content/guia-personal-view'
import { PersonalPageView } from '@/components/content/personal-page-view'
import { getServerSessionUser } from '@/lib/auth/session'
import {
  GUIA_META,
  getGuiaBySlug,
  getGuiaSlugs,
  getPersonalCategoria,
  getPersonalEntryBySlug,
  getPersonalSlugs
} from '@/lib/personales/data'
import type { PersonalCategoriaKey } from '@/lib/personales/routes'

// Categorías exclusivas para miembros: se envía solo un preview al cliente y
// el resto queda tras el muro de membresía (validación por servidor, patrón
// de /horoscopos — el contenido completo nunca llega a no-miembros).
const GATED_CATEGORIES = new Set<PersonalCategoriaKey>(['mes-personal', 'ano-personal'])
const PREVIEW_BLOCKS = 2

type PageProps = {
  params: {
    slug: string
  }
}

// Solo se generan las páginas "personales" y guías conocidas; cualquier otro
// slug de primer nivel responde 404 (las rutas estáticas existentes tienen
// prioridad sobre este segmento dinámico).
export const dynamicParams = false

export function generateStaticParams() {
  return [...getPersonalSlugs(), ...getGuiaSlugs()].map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const result = getPersonalEntryBySlug(params.slug)
  if (result) {
    return {
      title: result.entry.titulo,
      description: result.entry.subtitulo || result.categoria.descripcion
    }
  }

  const guia = getGuiaBySlug(params.slug)
  if (guia) {
    return {
      title: guia.titulo,
      description: GUIA_META[params.slug]?.descripcion
    }
  }

  return {
    title: 'Numerología Cotidiana'
  }
}

export default async function Page({ params }: PageProps) {
  const result = getPersonalEntryBySlug(params.slug)
  if (result) {
    let locked = false
    if (GATED_CATEGORIES.has(result.categoria.key)) {
      const user = await getServerSessionUser()
      locked = !user?.has_active_membership
    }
    const entry = locked
      ? { ...result.entry, bloques: result.entry.bloques.slice(0, PREVIEW_BLOCKS) }
      : result.entry
    return <PersonalPageView categoria={result.categoria} entry={entry} locked={locked} />
  }

  const guia = getGuiaBySlug(params.slug)
  const meta = GUIA_META[params.slug]
  if (guia && meta) {
    const categoria = getPersonalCategoria(meta.categoria)
    if (categoria) {
      return (
        <GuiaPersonalView
          guia={guia}
          categoria={categoria}
          descripcion={meta.descripcion}
          toolKey={meta.toolKey}
        />
      )
    }
  }

  notFound()
}
