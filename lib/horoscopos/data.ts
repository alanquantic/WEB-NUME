import horoscopoData from '@/components/jsons/horoscopo-mensual-2026.json'
import type { HoroscopoContenido, HoroscopoMesContenido } from '@/components/horoscopos/horoscopo-mensual-explorer'

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
