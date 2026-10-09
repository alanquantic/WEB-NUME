import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SignificadoConceptoView } from '@/components/content/significado-concepto-view'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'
import { getSignificadoEntry, getSignificadoParams } from '@/lib/significados/data'

// ISR: regenera cada 24 h por si se editan textos.
export const revalidate = 86400

type PageProps = {
  params: {
    concepto: string
    numero: string
  }
}

export function generateStaticParams() {
  return getSignificadoParams()
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getSignificadoEntry(params.concepto, params.numero)

  if (!entry) {
    return {
      title: 'Significado de los números',
    }
  }

  const path = `/significadodelosnumeros/${params.concepto}/${params.numero}`
  const title = `${entry.concepto.nombre} · Número ${entry.numero.numero}`
  const description = entry.concepto.subtitulo

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'article' }
  }
}

export default function Page({ params }: PageProps) {
  const entry = getSignificadoEntry(params.concepto, params.numero)

  if (!entry) {
    notFound()
  }

  const path = `/significadodelosnumeros/${params.concepto}/${params.numero}`
  const title = `${entry.concepto.nombre} · Número ${entry.numero.numero}`
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', path: '/' },
    { name: 'Significado de los números', path: '/significadodelosnumeros' },
    { name: entry.concepto.nombre, path: `/significadodelosnumeros/${params.concepto}` },
    { name: `Número ${entry.numero.numero}`, path }
  ])
  const webpage = webPageJsonLd({
    title,
    description: entry.concepto.subtitulo ?? title,
    path,
    speakableSelectors: ['h1', '[data-speakable]']
  })

  return (
    <>
      <JsonLd data={webpage} />
      <JsonLd data={breadcrumbs} />
      <SignificadoConceptoView concepto={entry.concepto} numero={entry.numero} />
    </>
  )
}
