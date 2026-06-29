import 'server-only'

import sanitizeHtmlLib from 'sanitize-html'

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
    'code', 'pre'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading']
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  // Fuerza enlaces seguros: se abren en nueva pestaña sin filtrar referrer y
  // sin transmitir autoridad SEO a destinos no confiables.
  transformTags: {
    a: sanitizeHtmlLib.simpleTransform('a', {
      rel: 'noopener noreferrer nofollow',
      target: '_blank'
    })
  }
}

/**
 * Limpia HTML proveniente del API antes de inyectarlo con
 * dangerouslySetInnerHTML. Server-only para no enviar la librería al cliente.
 */
export function sanitizeArticleHtml(dirty: string | null | undefined): string {
  if (!dirty) return ''
  return sanitizeHtmlLib(dirty, ARTICLE_OPTIONS)
}
