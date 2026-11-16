import 'server-only'

import sanitizeHtmlLib from 'sanitize-html'
import { SITE } from '@/lib/seo'
import { STORE_URL } from '@/lib/site-config'

// Dominio canónico (con www). No se toma de NEXT_PUBLIC_APP_URL: con esa
// variable sin www, todos los enlaces internos del contenido salían apuntando
// a una URL que redirige.
const APP_URL = SITE.url
const STORE_ORIGIN = STORE_URL.replace(/\/$/, '')
// Único iframe permitido: PDFs de nuestro CDN (bloque PDF del editor).
const PDF_IFRAME_HOST = 'cdn.tienda.numerologia-cotidiana.com'
const PDF_IFRAME_SRC = /^https:\/\/cdn\.tienda\.numerologia-cotidiana\.com\/[^?#]+\.pdf$/i
const LEGACY_STORE_ORIGINS = [
  'https://tienda.numerologia-cotidiana.com',
  'http://tienda.numerologia-cotidiana.com',
  'https://www.tienda.numerologia-cotidiana.com',
  'http://www.tienda.numerologia-cotidiana.com'
]
const LEGACY_APP_ORIGINS = [
  'https://numerologia-cotidiana.com',
  'http://numerologia-cotidiana.com',
  'https://www.numerologia-cotidiana.com',
  'http://www.numerologia-cotidiana.com',
  'https://stage.numerologia-cotidiana.com',
  'http://stage.numerologia-cotidiana.com',
  'https://app.numerologia-cotidiana.com',
  'http://app.numerologia-cotidiana.com'
]

function rewriteContentUrls(dirty: string): string {
  let rewritten = dirty

  for (const origin of LEGACY_STORE_ORIGINS) {
    rewritten = rewritten.replaceAll(origin, STORE_ORIGIN)
  }

  for (const origin of LEGACY_APP_ORIGINS) {
    rewritten = rewritten.replaceAll(origin, APP_URL)
  }

  return rewritten
    .replaceAll(`${STORE_ORIGIN}/product/`, `${STORE_ORIGIN}/productos/`)
    .replaceAll(`${STORE_ORIGIN}/producto/`, `${STORE_ORIGIN}/productos/`)
}

// Allowlist pensada para contenido editorial (posts/pages del API). Solo se
// permiten etiquetas y atributos de artículo; scripts, estilos y eventos
// inline se descartan. sanitize-html ya bloquea esquemas peligrosos
// (javascript:, etc.) por defecto.
const ARTICLE_OPTIONS: sanitizeHtmlLib.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'br', 'hr',
    'strong', 'em', 'b', 'i', 'u', 's', 'small', 'sub', 'sup',
    'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'code', 'pre', 'iframe'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    iframe: ['src', 'title', 'loading']
  },
  allowedIframeHostnames: [PDF_IFRAME_HOST],
  exclusiveFilter: (frame) =>
    frame.tag === 'iframe' && !PDF_IFRAME_SRC.test(frame.attribs.src ?? ''),
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  transformTags: {
    // Los títulos del contenido nunca compiten con el <h1> de la página.
    h1: 'h2',
    a: transformLink
  }
}

const APP_HOSTS = new Set(['www.numerologia-cotidiana.com', 'numerologia-cotidiana.com'])
const STORE_HOST = new URL(STORE_ORIGIN).hostname

// Quita lo que el editor del WordPress dejó pegado al enlace: espacios,
// caracteres invisibles y comillas escapadas al inicio o al final.
function cleanHref(href: string): string {
  const cleaned = href
    .replace(/[\u200B-\u200F\u202A-\u202E\uFEFF]/g, '')
    .trim()
    .replace(/^(?:\\|"|'|&quot;)+|(?:\\|"|'|&quot;)+\/?$/g, '')
    .trim()
  // Enlace al propio sitio escrito sin protocolo.
  return /^(?:www\.)?numerologia-cotidiana\.com(?:\/|$)/i.test(cleaned)
    ? `${APP_URL}/${cleaned.replace(/^[^/]*\/?/, '')}`
    : cleaned
}

function linkHost(href: string): string | null {
  if (!/^https?:\/\//i.test(href)) return null
  try {
    return new URL(href).hostname.toLowerCase()
  } catch {
    return null
  }
}

// Enlaces internos: se siguen y abren en la misma pestaña (antes todos salían
// con nofollow y target="_blank", así que el contenido no pasaba autoridad a
// las páginas que enlaza). La tienda es nuestra: pestaña nueva, sin nofollow.
// Cualquier otro destino externo conserva nofollow.
function transformLink(tagName: string, attribs: sanitizeHtmlLib.Attributes) {
  const next: sanitizeHtmlLib.Attributes = { ...attribs }
  delete next.target
  delete next.rel
  const href = cleanHref(attribs.href ?? '')
  if (href) next.href = href
  const host = linkHost(href)

  if (host === null || APP_HOSTS.has(host)) return { tagName, attribs: next }
  if (host === STORE_HOST) {
    return { tagName, attribs: { ...next, rel: 'noopener', target: '_blank' } }
  }
  return {
    tagName,
    attribs: { ...next, rel: 'noopener noreferrer nofollow', target: '_blank' }
  }
}

/**
 * Limpia HTML proveniente del API antes de inyectarlo con
 * dangerouslySetInnerHTML. Server-only para no enviar la librería al cliente.
 */
export function sanitizeArticleHtml(dirty: string | null | undefined): string {
  if (!dirty) return ''
  return sanitizeHtmlLib(rewriteContentUrls(dirty), ARTICLE_OPTIONS)
}
