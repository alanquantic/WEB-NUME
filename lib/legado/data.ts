import legadoData from '@/components/jsons/legado/paginas.json'
import type { PersonalBloque } from '@/lib/personales/data'

// Páginas heredadas del WordPress original que no tenían equivalente en el
// sitio nuevo. Se sirven en su URL original (/{slug}) para conservar el SEO.
// Generadas por "API NUME/scripts/convert-legado.cjs" desde el REST del WP.
export type LegadoPagina = {
  /** Slug con los números como N; agrupa páginas hermanas (p.ej. talentos-profesionales-numero-N). */
  familia: string
  numero: number | null
  /** Etiqueta corta para navegar entre hermanas: el número o la letra. */
  clave: string | number | null
  slug: string
  titulo: string
  etiqueta: string
  subtitulo: string
  bloques: PersonalBloque[]
}

const PAGINAS = (legadoData as { paginas: LegadoPagina[] }).paginas

const BY_SLUG = new Map(PAGINAS.map((pagina) => [pagina.slug, pagina]))

const BY_FAMILIA = new Map<string, LegadoPagina[]>()
for (const pagina of PAGINAS) {
  const hermanas = BY_FAMILIA.get(pagina.familia) ?? []
  hermanas.push(pagina)
  BY_FAMILIA.set(pagina.familia, hermanas)
}

export function getLegadoSlugs(): string[] {
  return PAGINAS.map((pagina) => pagina.slug)
}

export function getLegadoBySlug(slug: string): LegadoPagina | null {
  return BY_SLUG.get(slug) ?? null
}

/** Páginas de la misma familia (incluida la actual), solo si todas tienen clave. */
export function getLegadoHermanas(pagina: LegadoPagina): LegadoPagina[] {
  const hermanas = BY_FAMILIA.get(pagina.familia) ?? []
  if (hermanas.length < 2 || hermanas.some((item) => item.clave == null)) return []
  return hermanas
}

/** Descripción para metadata: subtítulo del origen o arranque del primer bloque de texto. */
export function getLegadoDescripcion(pagina: LegadoPagina, maxLen = 155): string {
  if (pagina.subtitulo.trim()) return pagina.subtitulo.trim()
  const bloque = pagina.bloques.find(
    (item): item is Extract<PersonalBloque, { tipo: 'html' | 'laura' | 'descripcion' }> =>
      item.tipo === 'html' || item.tipo === 'laura' || item.tipo === 'descripcion'
  )
  const texto = (bloque?.html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;|&#822[01];/gi, '"')
    .replace(/&#821[67];/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
  if (texto.length <= maxLen) return texto
  const corte = texto.slice(0, maxLen)
  const finPalabra = corte.lastIndexOf(' ')
  return `${corte.slice(0, finPalabra > 0 ? finPalabra : maxLen)}…`
}
