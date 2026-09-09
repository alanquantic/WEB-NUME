import { SOCIAL_LINKS } from '@/lib/site-config'

export const SITE = {
  name: 'Numerología Cotidiana',
  url: 'https://www.numerologia-cotidiana.com',
  description:
    'Descubre tu mapa numerológico, tu pináculo personal y las energías del día con Numerología Cotidiana de Laura L. Rodríguez.',
  logo: 'https://www.numerologia-cotidiana.com/images/logo_favicon.png',
  author: 'Laura L. Rodríguez',
  authorImage: 'https://www.numerologia-cotidiana.com/images/mini-laura.png',
  authorRole: 'Numeróloga y autora de Numerología Cotidiana'
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    founder: personJsonLd(),
    sameAs: SOCIAL_LINKS.map((social) => social.href)
  }
}

// Person schema completo para E-E-A-T. Los LLMs y Google lo usan para validar
// la autoridad de la autora del contenido de numerología.
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.author,
    jobTitle: SITE.authorRole,
    url: SITE.url,
    image: SITE.authorImage,
    sameAs: SOCIAL_LINKS.map((social) => social.href),
    knowsAbout: [
      'Numerología',
      'Numerología pitagórica',
      'Numerología cotidiana',
      'Pináculo personal',
      'Camino de vida',
      'Año personal'
    ]
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'es',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/busqueda?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

type ArticleJsonLdInput = {
  title: string
  description: string
  path: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
}

export function articleJsonLd(input: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: [absoluteUrl(input.image)],
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: input.author
      ? { '@type': 'Person', name: input.author }
      : personJsonLd(),
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.logo }
    },
    mainEntityOfPage: absoluteUrl(input.path)
  }
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {})
    }))
  }
}

// FAQPage schema — aumenta CTR en SERP (rich result) y es la principal señal
// que usan ChatGPT/Perplexity para citar respuestas directas.
export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// HowTo schema — ideal para páginas de calculadora (paso 1: escribe tu nombre,
// paso 2: ingresa fecha, paso 3: pulsa calcular).
export function howToJsonLd(input: {
  name: string
  description: string
  steps: { name: string; text: string }[]
  totalTimeIso?: string // p.ej. 'PT1M'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    ...(input.totalTimeIso ? { totalTime: input.totalTimeIso } : {}),
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  }
}

// WebPage con Speakable — le dice a asistentes de voz (Google Assistant) qué
// partes leer en voz alta cuando alguien pregunta por el tema.
export function webPageJsonLd(input: {
  title: string
  description: string
  path: string
  speakableSelectors?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: 'es',
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
    ...(input.speakableSelectors && input.speakableSelectors.length > 0
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: input.speakableSelectors
          }
        }
      : {})
  }
}
