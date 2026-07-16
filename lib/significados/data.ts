import data from '@/components/jsons/significados/pinaculo.json'

export type SignificadoBloque = {
  titulo?: string
  tipo: 'parrafos' | 'lista'
  contenido: string[]
}

export type SignificadoNumero = {
  numero: number
  titulo?: string
  afirmacion?: string
  bloques: SignificadoBloque[]
}

export type SignificadoConcepto = {
  slug: string
  nombre: string
  etiqueta?: string
  subtitulo?: string
  pregunta?: string
  explicacion: string[]
  calculo?: string[]
  numeros: SignificadoNumero[]
}

const conceptos = (data as { conceptos: SignificadoConcepto[] }).conceptos

export function getConceptos(): SignificadoConcepto[] {
  return conceptos
}

export function getConcepto(slug: string): SignificadoConcepto | null {
  return conceptos.find((concepto) => concepto.slug === slug) ?? null
}

export function getSignificadoEntry(slug: string, numero: string | number) {
  const concepto = getConcepto(slug)
  if (!concepto) return null

  const parsed = typeof numero === 'string' ? Number(numero) : numero
  if (!Number.isFinite(parsed)) return null

  const entry = concepto.numeros.find((item) => item.numero === parsed)
  if (!entry) return null

  return { concepto, numero: entry }
}

export function getSignificadoParams() {
  return conceptos.flatMap((concepto) =>
    concepto.numeros.map((item) => ({
      concepto: concepto.slug,
      numero: String(item.numero),
    })),
  )
}
