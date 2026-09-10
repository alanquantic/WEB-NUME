import type { Metadata } from 'next'

import { CompatibilityCalculator } from '@/components/calculators/compatibility-calculator'
import { ToolPage } from '@/components/content/tool-page'
import { JsonLd } from '@/components/seo/json-ld'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  webPageJsonLd
} from '@/lib/seo'

const TITLE = 'Calculadora de Compatibilidad Numerológica — Numerología Cotidiana'
const DESCRIPTION =
  'Compara los caminos de vida de dos personas y descubre su afinidad numerológica. Calculadora gratis con fortalezas, retos y consejos.'
const PATH = '/calculadoras/compatibilidad'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION }
}

const HOWTO = howToJsonLd({
  name: 'Cómo calcular tu compatibilidad numerológica',
  description: DESCRIPTION,
  totalTimeIso: 'PT2M',
  steps: [
    { name: 'Ingresa la fecha de nacimiento de la persona 1', text: 'Escribe día, mes y año.' },
    { name: 'Ingresa la fecha de la persona 2', text: 'Escribe día, mes y año.' },
    { name: 'Pulsa Calcular compatibilidad', text: 'Obtén el vínculo, fortalezas, retos y consejos para la pareja.' }
  ]
})

const FAQ = faqPageJsonLd([
  {
    question: '¿Qué es la compatibilidad numerológica?',
    answer:
      'Es la afinidad entre dos personas medida a partir de sus caminos de vida. Muestra fortalezas, retos y áreas de crecimiento del vínculo.'
  },
  {
    question: '¿Sirve solo para parejas o también para socios y amigos?',
    answer:
      'Aunque se popularizó para el vínculo amoroso, la compatibilidad numerológica también aplica a socios, familia, amigos y equipos de trabajo.'
  },
  {
    question: '¿Un puntaje bajo significa que la relación no puede funcionar?',
    answer:
      'No. Un puntaje bajo indica que la pareja tendrá más retos, pero también más aprendizaje. La numerología ofrece pistas, no sentencias.'
  }
])

const WEBPAGE = webPageJsonLd({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  speakableSelectors: ['h1', '[data-speakable]']
})

const BREADCRUMBS = breadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Calculadoras', path: '/calculadoras' },
  { name: 'Compatibilidad', path: PATH }
])

export default function CompatibilityPage() {
  return (
    <>
      <JsonLd data={WEBPAGE} />
      <JsonLd data={HOWTO} />
      <JsonLd data={FAQ} />
      <JsonLd data={BREADCRUMBS} />
      <ToolPage
        toolKey="compatibilidad"
        title="Compatibilidad"
        description="Descubre la afinidad numerológica entre dos personas comparando sus números de camino de vida."
      >
        <CompatibilityCalculator />
      </ToolPage>
    </>
  )
}
