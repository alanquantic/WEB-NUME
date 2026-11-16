import { describe, expect, it, vi } from 'vitest'

vi.mock('server-only', () => ({}))

import { sanitizeArticleHtml } from '@/lib/sanitize'

describe('enlaces dentro del contenido', () => {
  it('los enlaces internos apuntan a www, se siguen y abren en la misma pestaña', () => {
    for (const origin of [
      'https://numerologia-cotidiana.com',
      'http://numerologia-cotidiana.com',
      'https://www.numerologia-cotidiana.com'
    ]) {
      const html = sanitizeArticleHtml(
        `<a href="${origin}/numero-personal/" target="_blank" rel="nofollow">Número personal</a>`
      )
      expect(html).toBe(
        '<a href="https://www.numerologia-cotidiana.com/numero-personal/">Número personal</a>'
      )
    }
  })

  it('los enlaces relativos y de correo no reciben nofollow ni pestaña nueva', () => {
    expect(sanitizeArticleHtml('<a href="/pinaculo/">Pináculo</a>')).toBe(
      '<a href="/pinaculo/">Pináculo</a>'
    )
    expect(sanitizeArticleHtml('<a href="mailto:legal@numerologia-cotidiana.com">Correo</a>')).toBe(
      '<a href="mailto:legal@numerologia-cotidiana.com">Correo</a>'
    )
  })

  it('la tienda abre en pestaña nueva sin nofollow', () => {
    expect(
      sanitizeArticleHtml('<a href="https://tienda.numerologia-cotidiana.com/productos/agenda">Agenda</a>')
    ).toBe(
      '<a href="https://tienda.numerologia-cotidiana.com/productos/agenda" rel="noopener" target="_blank">Agenda</a>'
    )
  })

  it('los enlaces externos conservan nofollow y pestaña nueva', () => {
    expect(sanitizeArticleHtml('<a href="https://example.com/libro">Libro</a>')).toBe(
      '<a href="https://example.com/libro" rel="noopener noreferrer nofollow" target="_blank">Libro</a>'
    )
  })

  it('limpia espacios, caracteres invisibles y comillas pegados al enlace', () => {
    expect(
      sanitizeArticleHtml(
        '<a href="https://www.numerologia-cotidiana.com/tarea-no-aprendida/ ‎">Volver</a>'
      )
    ).toContain('href="https://www.numerologia-cotidiana.com/tarea-no-aprendida/"')
    expect(
      sanitizeArticleHtml('<a href="numerologia-cotidiana.com/numero-de-la-personalidad/&quot;">Ver</a>')
    ).toContain('href="https://www.numerologia-cotidiana.com/numero-de-la-personalidad/"')
  })

  it('los títulos h1 del contenido bajan a h2', () => {
    expect(sanitizeArticleHtml('<h1>Título</h1><p>Texto</p>')).toBe('<h2>Título</h2><p>Texto</p>')
  })
})
