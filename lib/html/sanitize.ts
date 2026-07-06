import DOMPurify from 'isomorphic-dompurify'

// Sanitiza el HTML de contenido antes de inyectarlo con dangerouslySetInnerHTML.
// Defensa en profundidad frente a XSS almacenado: aunque el contenido lo crean
// admins y el serializador de Puck ya escapa el texto, aquí bloqueamos cualquier
// etiqueta/atributo/URL peligrosa (p. ej. <script>, onerror=, javascript:).
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'blockquote',
      'hr', 'img', 'a', 'strong', 'em', 'b', 'i', 'u', 's', 'br', 'span', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
    // Solo http/https/mailto, rutas relativas y anclas.
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/|#)/i
  })
}
