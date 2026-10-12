// URLs de categorías del blog, idénticas a las del WordPress original:
//   /categoria/{slug}            y   /categoria/{slug}/page/{n}
//   /categoria/{padre}/{slug}    (subcategorías)
// Las subcategorías se declaran aquí porque la API no expone la jerarquía.
const PARENT_BY_SLUG: Record<string, string> = {
  'proyecciones-semanales': 'horoscopos-numerologicos'
}

/** Segmentos de la ruta canónica de una categoría (sin /categoria ni paginación). */
export function categorySegments(slug: string): string[] {
  const parent = PARENT_BY_SLUG[slug]
  return parent ? [parent, slug] : [slug]
}

export function categoryPath(slug: string, page = 1): string {
  const base = `/categoria/${categorySegments(slug).join('/')}`
  return page > 1 ? `${base}/page/${page}` : base
}
