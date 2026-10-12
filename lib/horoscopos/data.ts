import horoscopoData from '@/components/jsons/horoscopo-mensual-2026.json'

export type HoroscopoMesContenido = {
  /** Frase corta de energía del mes (heading superior). */
  energia?: string
  /** Número de Mes Personal (p. ej. "2"). */
  mesPersonal?: string
  /** Cuerpo completo del horóscopo (solo miembros). */
  parrafos?: string[]
  /** Viñetas de "Energía Activa" (solo miembros). */
  energiaActiva?: string[]
  /** Bloque "Mes excelente para" (solo miembros). */
  mesExcelente?: string[]
  /** Adelanto recortado del cuerpo (se envía a no-miembros en lugar del contenido completo). */
  teaser?: string
}

export type HoroscopoContenido = Record<string, Record<string, HoroscopoMesContenido>>

type HoroscopoData = {
  anio: number
  numeros: string[]
  meses: string[]
  contenido: HoroscopoContenido
}

const data = horoscopoData as HoroscopoData

const SLUG_RE = /^ano-(\d+)-([a-záéíóúñ]+)$/

export function getHoroscopoAnio(): number {
  return data.anio
}

export function getHoroscopoNumeros(): string[] {
  return data.numeros
}

export function getHoroscopoMeses(): string[] {
  return data.meses
}

export function getHoroscopoMesSlugs(): string[] {
  const slugs: string[] = []
  for (const numero of data.numeros) {
    for (const mes of data.meses) {
      slugs.push(`ano-${numero}-${mes.toLowerCase()}`)
    }
  }
  return slugs
}

export function parseHoroscopoMesSlug(slug: string): { numero: string; mes: string } | null {
  const match = SLUG_RE.exec(slug)
  if (!match) return null
  const [, numero, mes] = match
  if (!data.numeros.includes(numero)) return null
  const mesCanonico = data.meses.find((m) => m.toLowerCase() === mes)
  if (!mesCanonico) return null
  return { numero, mes: mesCanonico }
}

export function getHoroscopoMesEntry(numero: string, mes: string): HoroscopoMesContenido | null {
  return data.contenido[numero]?.[mes.toLowerCase()] ?? null
}
