import type { SearchResultItem } from '@/lib/api/search'
import { postPath } from '@/lib/blog/paths'

export type Suggestion = { title: string; href: string; kind: string; description?: string }

const SHORTCUTS: Suggestion[] = [
  { title: 'Calcula tu Pináculo', href: '/pinaculo', kind: 'Calculadora' },
  { title: 'Numerología de pareja', href: '/numerologia-de-pareja', kind: 'Calculadora' },
  { title: 'Año personal', href: '/ano-personal', kind: 'Calculadora' },
  { title: 'Numerología del nombre', href: '/numerologianombre', kind: 'Calculadora' },
  { title: 'Significado de los números', href: '/significado-los-numeros', kind: 'Guía' },
  { title: 'Centro numerológico', href: '/mi-mapa', kind: 'Herramientas' },
  { title: 'Artículos de numerología', href: '/blog', kind: 'Blog' },
]

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

export function quickSuggestions(query: string): Suggestion[] {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  return SHORTCUTS.filter((item) => words.every((word) => normalize(item.title).includes(word))).slice(0, 5)
}

export function searchResultHref(item: Pick<SearchResultItem, 'type' | 'id' | 'slug'>) {
  return item.type === 'page' ? `/paginas/${item.id}` : postPath(item.slug)
}

export function combineSuggestions(query: string, results: SearchResultItem[]): Suggestion[] {
  const items = [...results.map((item) => ({
    title: item.title,
    href: searchResultHref(item),
    kind: item.type === 'page' ? 'Página' : 'Artículo',
    description: item.excerpt || undefined,
  })), ...quickSuggestions(query)]
  return items.filter((item, index) => items.findIndex((other) => other.href === item.href) === index).slice(0, 8)
}
