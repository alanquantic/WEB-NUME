// Mapa entre taxonomia del blog (categorias/tags) y categorias de la tienda,
// para el sidebar de "Productos relacionados" en el post.
//
// Se prioriza el match por TAG del post (senal mas fuerte), luego por CATEGORIA
// del post. Los valores son nombres de categoria en TIENDA-NUME
// (`Reportes Numerologicos`, `Licencias`, `Agenda Numerologica`, `Membresias`).

const TAG_TO_STORE_CATEGORIES: Record<string, string[]> = {
  Miembros: ['Membresías'],
  Consultores: ['Licencias'],
  Cursos: ['Reportes Numerológicos'],
}

const BLOG_CATEGORY_TO_STORE_CATEGORIES: Record<string, string[]> = {
  'Horóscopos Numerológicos': ['Agenda Numerológica'],
  'Proyecciones Semanales': ['Agenda Numerológica'],
  Amor: ['Reportes Numerológicos'],
  'Significados de los números': ['Reportes Numerológicos'],
  'Secretos revelados': ['Reportes Numerológicos'],
  'El Blog de la Numerología': ['Reportes Numerológicos'],
}

function normalize(value: string | null | undefined): string | null {
  if (!value) return null
  return value.trim().normalize('NFC')
}

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
