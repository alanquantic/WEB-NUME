import { SOCIAL_LINKS } from '@/lib/site-config'

export const SITE = {
  name: 'Numerología Cotidiana',
  url: 'https://www.numerologia-cotidiana.com',
  description:
    'Descubre tu mapa numerológico, tu pináculo personal y las energías del día con Numerología Cotidiana de Laura L. Rodríguez.',
  logo: 'https://www.numerologia-cotidiana.com/images/logo_favicon.png',
  author: 'Laura L. Rodríguez'
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
    sameAs: SOCIAL_LINKS.map((social) => social.href)
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
    dateModified: input.datePublished,
    author: { '@type': 'Person', name: input.author ?? SITE.author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.logo }
    },
    mainEntityOfPage: absoluteUrl(input.path)
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  }
}
