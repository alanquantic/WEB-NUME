import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SignificadoConceptoView } from '@/components/content/significado-concepto-view'
import { getSignificadoEntry, getSignificadoParams } from '@/lib/significados/data'

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

  return {
    title: `${entry.concepto.nombre} · Número ${entry.numero.numero}`,
    description: entry.concepto.subtitulo,
  }
}

export default function Page({ params }: PageProps) {
  const entry = getSignificadoEntry(params.concepto, params.numero)

  if (!entry) {
    notFound()
  }

  return <SignificadoConceptoView concepto={entry.concepto} numero={entry.numero} />
}
