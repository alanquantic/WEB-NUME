import { describe, expect, it, vi } from 'vitest'
vi.mock('server-only', () => ({}))
import { sanitizeArticleHtml } from '@/lib/sanitize'

const PDF_URL = 'https://cdn.tienda.numerologia-cotidiana.com/webnume/nume-documentos/u1/guia-1.pdf'

describe('iframe del bloque PDF', () => {
  it('conserva el HTML que genera el editor', () => {
    const html = sanitizeArticleHtml(
      `<iframe src="${PDF_URL}" title="Guía &quot;2027&quot;" loading="lazy"></iframe><p><a href="${PDF_URL}">Abrir PDF en una pestaña nueva</a></p>`
    )

    expect(html).toContain(`<iframe src="${PDF_URL}"`)
    expect(html).toContain('title="Guía &quot;2027&quot;"')
    expect(html).toContain('loading="lazy"')
    expect(html).toContain(`href="${PDF_URL}"`)
  })

  it.each([
    ['otro dominio', 'https://evil.example.com/guia.pdf'],
    ['dominio parecido', 'https://cdn.tienda.numerologia-cotidiana.com.evil.com/guia.pdf'],
    ['http sin cifrar', 'http://cdn.tienda.numerologia-cotidiana.com/guia.pdf'],
    ['archivo que no es PDF', 'https://cdn.tienda.numerologia-cotidiana.com/pagina.html'],
    ['protocolo relativo', '//evil.example.com/guia.pdf'],
    ['javascript', 'javascript:alert(1)']
  ])('quita iframes de %s', (_name, src) => {
    expect(sanitizeArticleHtml(`<iframe src="${src}"></iframe>`)).not.toContain('<iframe')
  })

  it('quita atributos peligrosos del iframe', () => {
    const html = sanitizeArticleHtml(
      `<iframe src="${PDF_URL}" srcdoc="<script>alert(1)</script>" onload="alert(1)" allow="camera"></iframe>`
    )

    expect(html).toBe(`<iframe src="${PDF_URL}"></iframe>`)
  })
})
