import 'server-only'
import sanitizeHtml from 'sanitize-html'

// Always rendered as React text, never as HTML. Repeated passes also remove
// markup stored as escaped HTML in imported editorial content.
export function searchExcerpt(value: string | null | undefined, max = 160): string {
  let text = value ?? ''
  for (let pass = 0; pass < 3; pass++) {
    text = sanitizeHtml(text.replace(/<(\/?(?:p|div|h[1-6]|li|br|section|blockquote))\b/gi, ' <$1'), {
      allowedTags: [],
      allowedAttributes: {},
      nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript', 'iframe', 'svg', 'code', 'pre'],
    }).replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, entity: string) => ({
      amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    })[entity] ?? '')
  }
  text = text
    .replace(/<!--[\s\S]*?(?:-->|$)/g, ' ')
    .replace(/<[^>]*(?:>|$)/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*(?:\)|$)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\/?(?:caption|gallery|embed|video|audio|vc_[\w]+|et_pb_[\w]+)\b[^\]]*(?:\]|$)/gi, ' ')
    .replace(/\b(?:src|srcset|href|class|style|alt|width|height)\s*=\s*(?:"[^"]*(?:"|$)|'[^']*(?:'|$)|[^\s>]+)/gi, ' ')
    .replace(/(?:https?:\/\/|www\.|\/\/)[^\s<>"']+/gi, ' ')
    .replace(/data:image\/[^\s<>"']+/gi, ' ')
    .replace(/\/?(?:[\w.-]+\/)*[\w.-]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?[^\s<>"']*)?/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= max) return text
  const clipped = text.slice(0, max - 1)
  const boundary = clipped.lastIndexOf(' ')
  return `${(boundary > max * 0.6 ? clipped.slice(0, boundary) : clipped).trimEnd()}…`
}
