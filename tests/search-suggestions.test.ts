import { describe, expect, it } from 'vitest'
import type { SearchResultItem } from '@/lib/api/search'
import { combineSuggestions, quickSuggestions, searchResultHref } from '@/lib/search/suggestions'

function result(overrides: Partial<SearchResultItem>): SearchResultItem {
  return { id: 1, type: 'post', title: 'Una guía', slug: 'una-guia', status: 'published',
    requires_membership: false, published_at: null, created_at: '', rank: 1, excerpt: null, ...overrides }
}

describe('sugerencias del buscador', () => {
  it('encuentra herramientas sin acentos, con mayúsculas y palabras en otro orden', () => {
    expect(quickSuggestions(' PINACULO ')[0]?.href).toBe('/pinaculo')
    expect(quickSuggestions('personal año')[0]?.href).toBe('/ano-personal')
    expect(quickSuggestions('tema inexistente')).toEqual([])
  })

  it('ofrece accesos iniciales y conserva los resultados del servidor sin accesos coincidentes', () => {
    expect(quickSuggestions('')).toHaveLength(5)
    expect(combineSuggestions('energía', [result({ title: 'La energía del día' })]))
      .toEqual([{ title: 'La energía del día', href: '/una-guia', kind: 'Artículo' }])
  })

  it('enlaza artículos en la raíz y páginas del CMS por ID', () => {
    expect(searchResultHref(result({ slug: 'numero-del-alma' }))).toBe('/numero-del-alma')
    expect(searchResultHref(result({ type: 'page', id: 42, slug: 'mi-guia' }))).toBe('/paginas/42')
  })

  it('evita duplicar destinos entre herramientas y resultados y limita las sugerencias', () => {
    const items = combineSuggestions('pinaculo', [result({ slug: 'pinaculo' })])
    expect(items).toHaveLength(1)
    expect(items[0].kind).toBe('Artículo')
    expect(combineSuggestions('', Array.from({ length: 12 }, (_, id) => result({ id, slug: `guia-${id}` }))))
      .toHaveLength(8)
  })
})
