import { describe, expect, it, vi } from 'vitest'

vi.mock('server-only', () => ({}))

import { sanitizeArticleHtml } from '@/lib/sanitize'
import { storeProductUrl } from '@/lib/site-config'

describe('enlaces de productos', () => {
  it('genera enlaces del catálogo con la ruta de la tienda actual', () => {
    expect(storeProductUrl('mi-proposito-y-camino-de-vida')).toBe(
      'https://tienda.numerologia-cotidiana.com/productos/mi-proposito-y-camino-de-vida'
    )
  })

  it('actualiza enlaces antiguos del contenido y conserva parámetros y anclas', () => {
    for (const origin of ['http://www.tienda.numerologia-cotidiana.com', 'https://tienda.numerologia-cotidiana.com']) {
      for (const path of ['product', 'producto', 'productos']) {
        const html = sanitizeArticleHtml(`<a href="${origin}/${path}/mi-energia?ref=blog#detalle">Ver producto</a>`)
        expect(html).toContain('href="https://tienda.numerologia-cotidiana.com/productos/mi-energia?ref=blog#detalle"')
      }
    }
  })

  it('conserva enlaces ajenos a la tienda', () => {
    expect(sanitizeArticleHtml('<a href="https://example.com/product/libro">Libro</a>')).toContain(
      'href="https://example.com/product/libro"'
    )
  })
})
