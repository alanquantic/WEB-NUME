// URLs de los significados (concepto × número), idénticas a las del sitio
// WordPress original: /significado-{n}-numero{sufijo} (y la excepción de
// realización: /significado-numerorealizacion-{n}).
//
// Módulo seguro para el cliente: no importa el JSON de contenido.

const SUFIJO_POR_CONCEPTO: Record<string, string> = {
  'numero-personal': 'numeropersonal',
  karma: 'numerokarma',
  'vida-pasada': 'numerovidapasada',
  personalidad: 'numeropersonalidad',
  'reto-meta': 'numeroreto',
  pareja: 'numeropareja',
  'subconsciente-positivo': 'numerosubconscientepositivo',
  'subconsciente-negativo': 'numerosubconscientenegativo',
  destino: 'numerodestino',
  sombra: 'numerosombra',
  'ser-inferior': 'numeroserinferior',
  'numero-ausente': 'numeroausente',
  triplicidad: 'numerotriplicidad'
}

const CONCEPTO_POR_SUFIJO = Object.fromEntries(
  Object.entries(SUFIJO_POR_CONCEPTO).map(([concepto, sufijo]) => [sufijo, concepto])
)

export function significadoPath(concepto: string, numero: number | string): string {
  if (concepto === 'realizacion') return `/significado-numerorealizacion-${numero}`
  const sufijo = SUFIJO_POR_CONCEPTO[concepto]
  return sufijo ? `/significado-${numero}-${sufijo}` : '/significado-los-numeros'
}

/** Slug de primer nivel → { concepto, numero } (sin validar que exista la entrada). */
export function parseSignificadoSlug(slug: string): { concepto: string; numero: string } | null {
  const realizacion = /^significado-numerorealizacion-(\d+)$/.exec(slug)
  if (realizacion) return { concepto: 'realizacion', numero: realizacion[1] }
  const match = /^significado-(\d+)-([a-z]+)$/.exec(slug)
  const concepto = match ? CONCEPTO_POR_SUFIJO[match[2]] : undefined
  return match && concepto ? { concepto, numero: match[1] } : null
}
