// Mapa entre taxonomia del blog (categorias/tags) y categorias de la tienda,
// para el sidebar de "Productos relacionados" en el post.
//
// Se prioriza el match por TAG del post (senal mas fuerte), luego por CATEGORIA
// del post. Los valores son nombres de categoria en TIENDA-NUME
// (`Reportes Numerologicos`, `Licencias`, `Agenda Numerologica`, `Membresias`).

const RAW_TAG_TO_STORE_CATEGORIES: Record<string, string[]> = {
  Miembros: ['Membresías'],
  Consultores: ['Licencias'],
  Cursos: ['Reportes Numerológicos'],
}

const RAW_BLOG_CATEGORY_TO_STORE_CATEGORIES: Record<string, string[]> = {
  'Horóscopos Numerológicos': ['Agenda Numerológica'],
  'Proyecciones Semanales': ['Agenda Numerológica'],
  Amor: ['Reportes Numerológicos'],
  'Significados de los números': ['Reportes Numerológicos'],
  'Secretos revelados': ['Reportes Numerológicos'],
  'El Blog de la Numerología': ['Reportes Numerológicos'],
}

const STOP_WORDS = new Set([
  'a',
  'al',
  'como',
  'con',
  'de',
  'del',
  'el',
  'en',
  'es',
  'la',
  'las',
  'los',
  'mi',
  'mis',
  'o',
  'para',
  'por',
  'que',
  'se',
  'su',
  'sus',
  'te',
  'tu',
  'tus',
  'un',
  'una',
  'y',
  'numerologia',
  'numerologico',
  'numerologica',
  'numerologicos',
  'numerologicas'
])

function normalize(value: string | null | undefined): string | null {
  if (!value) return null
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
}

function normalizeCategoryMap(
  source: Record<string, string[]>
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(source).map(([key, values]) => [normalize(key) ?? key, values])
  )
}

const TAG_TO_STORE_CATEGORIES = normalizeCategoryMap(RAW_TAG_TO_STORE_CATEGORIES)
const BLOG_CATEGORY_TO_STORE_CATEGORIES = normalizeCategoryMap(
  RAW_BLOG_CATEGORY_TO_STORE_CATEGORIES
)

/**
 * Dado el nombre de la categoria del post y sus tags, devuelve la lista
 * ordenada de categorias de la tienda a consultar. Sin duplicados.
 */
export function resolveStoreCategories(
  categoryName: string | null | undefined,
  tagNames: string[] = []
): string[] {
  const result: string[] = []
  const seen = new Set<string>()

  const push = (values: string[] | undefined) => {
    if (!values) return
    for (const value of values) {
      if (!seen.has(value)) {
        seen.add(value)
        result.push(value)
      }
    }
  }

  for (const tag of tagNames) {
    const key = normalize(tag)
    if (key) push(TAG_TO_STORE_CATEGORIES[key])
  }

  const catKey = normalize(categoryName)
  if (catKey) push(BLOG_CATEGORY_TO_STORE_CATEGORIES[catKey])

  return result
}

/**
 * Extrae keywords utiles desde el titulo del post para buscar productos
 * relacionados por nombre, descripcion o categoria en la tienda.
 */
export function extractProductKeywords(
  title: string | null | undefined,
  limit = 5
): string[] {
  const normalized = normalize(title)
  if (!normalized) return []

  const keywords: string[] = []
  const seen = new Set<string>()

  for (const token of normalized.split(/[^a-z0-9]+/)) {
    if (!token) continue
    if (STOP_WORDS.has(token)) continue
    if (token.length < 4 && !/^\d+$/.test(token)) continue
    if (seen.has(token)) continue

    seen.add(token)
    keywords.push(token)

    if (keywords.length >= limit) break
  }

  return keywords
}
