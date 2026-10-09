import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  AnoPersonalNumberView,
  getAnoPersonalEntry,
  getAnoPersonalNumbers,
} from '@/app/(public)/anopersonalnumbers/page'

type PageProps = {
  params: {
    numero: string
  }
}

export function generateStaticParams() {
  return getAnoPersonalNumbers().map((numero) => ({ numero }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getAnoPersonalEntry(params.numero)

  if (!entry) {
    return {
      title: 'Año personal'
    }
  }

  return {
    title: `Año Personal ${entry.anio}`
  }
}

export default function Page({ params }: PageProps) {
  const anoPersonalJson = getAnoPersonalEntry(params.numero)

  if (!anoPersonalJson) {
    notFound()
  }

  return <AnoPersonalNumberView entry={anoPersonalJson} />
}
