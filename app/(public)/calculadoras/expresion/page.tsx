import type { Metadata } from 'next'

import { ExpressionCalculator } from '@/components/calculators/expression-calculator'
import { ToolPage } from '@/components/content/tool-page'
import { JsonLd } from '@/components/seo/json-ld'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  webPageJsonLd
} from '@/lib/seo'

const TITLE = 'Calculadora de Número de Expresión — Numerología Cotidiana'
const DESCRIPTION =
  'Calcula tu número de Expresión, del Alma y de Personalidad a partir de tu nombre completo. Interpretación numerológica gratuita.'
const PATH = '/calculadoras/expresion'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: 'article' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION }
}

const HOWTO = howToJsonLd({
  name: 'Cómo calcular tu número de expresión',
  description: DESCRIPTION,
  totalTimeIso: 'PT1M',
  steps: [
    {
      name: 'Escribe tu nombre completo',
      text: 'Ingresa tu nombre y apellidos tal como aparecen en tu acta de nacimiento.'
    },
    { name: 'Pulsa Calcular', text: 'La herramienta asigna un valor a cada letra y suma vocales, consonantes y total.' },
    { name: 'Lee tus tres números', text: 'Obtén tu Expresión, tu número del Alma y tu Personalidad.' }
  ]
})

const FAQ = faqPageJsonLd([
  {
    question: '¿Qué es el número de expresión en numerología?',
    answer:
      'Es la suma numerológica del nombre completo. Representa el destino, los talentos y la manera en que la persona se proyecta al mundo.'
  },
  {
    question: '¿Cuál es la diferencia entre el número del Alma y el número de Expresión?',
    answer:
      'El número del Alma se calcula solo con las vocales y refleja la motivación interna. El número de Expresión considera todo el nombre y muestra el destino global.'
  },
  {
    question: '¿Debo usar mi nombre completo tal como está en mi acta?',
    answer:
      'Sí. La numerología pitagórica trabaja con el nombre legal de nacimiento porque contiene la vibración original de la persona.'
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
  { name: 'Expresión', path: PATH }
])

export default function ExpressionPage() {
  return (
    <>
      <JsonLd data={WEBPAGE} />
      <JsonLd data={HOWTO} />
      <JsonLd data={FAQ} />
      <JsonLd data={BREADCRUMBS} />
      <ToolPage
        toolKey="expresion"
        title="Número de expresión"
        description="A partir de tu nombre completo obtienes tres claves: tu Expresión (destino), tu número del Alma (motivación) y tu Personalidad (cómo te perciben)."
      >
        <ExpressionCalculator />
      </ToolPage>
    </>
  )
}
