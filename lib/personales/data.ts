import almaData from '@/components/jsons/personales/alma.json'
import anoPersonalData from '@/components/jsons/personales/ano-personal.json'
import diaPersonalData from '@/components/jsons/personales/dia-personal.json'
import mesPersonalData from '@/components/jsons/personales/mes-personal.json'
import numeroPersonalData from '@/components/jsons/personales/numero-personal.json'
import semanaData from '@/components/jsons/personales/semana.json'

import type { PersonalCategoriaKey } from '@/lib/personales/routes'

// Bloques generados por "API NUME/scripts/convert-personales.cjs" a partir del
// contenido Elementor del sitio WordPress original. El HTML viene ya limpio
// (solo etiquetas de prosa y enlaces), pero igual se sanitiza al renderizar.
export type PersonalBloque =
  | { tipo: 'titulo'; texto: string }
  | { tipo: 'html'; html: string }
  | { tipo: 'laura'; pre: string; titulo: string; html: string }
  | { tipo: 'frases'; titulo: string; frases: string[] }
  | { tipo: 'imagen'; src: string; alt: string }
  | { tipo: 'galeria'; items: { src: string; alt?: string }[] }
  | { tipo: 'descripcion'; icono: string; titulo: string; html: string }
  | { tipo: 'carrusel'; items: { src: string; caption?: string }[] }
  | { tipo: 'separador' }

export type PersonalNumero = {
  numero: number
  slug: string
  titulo: string
  etiqueta: string
  subtitulo: string
  bloques: PersonalBloque[]
}

export type PersonalCategoria = {
  key: PersonalCategoriaKey
  nombre: string
  etiqueta: string
  descripcion: string
  numeros: PersonalNumero[]
}

const numerosDe = (data: unknown): PersonalNumero[] =>
  (data as { numeros: PersonalNumero[] }).numeros

const CATEGORIAS: PersonalCategoria[] = [
  {
    key: 'numero-personal',
    nombre: 'Número Personal',
    etiqueta: 'Mi esencia',
    descripcion:
      'Tu esencia y tu verdadero yo: características, fortalezas, amor y vocación de cada Número Personal.',
    numeros: numerosDe(numeroPersonalData)
  },
  {
    key: 'alma',
    nombre: 'Número del Alma',
    etiqueta: 'Mi misión',
    descripcion:
      'Destino y pruebas de tu alma: la misión que viniste a cumplir según tu Número del Alma.',
    numeros: numerosDe(almaData)
  },
  {
    key: 'dia-personal',
    nombre: 'Día Personal',
    etiqueta: 'Mi energía de hoy',
    descripcion:
      'Aprovecha la energía de tu Día Personal: recomendaciones y precauciones para tu día.',
    numeros: numerosDe(diaPersonalData)
  },
  {
    key: 'semana',
    nombre: 'Semana Personal',
    etiqueta: 'Mi energía de la semana',
    descripcion:
      'La vibración de tu Semana Personal: claves para fluir con la energía de estos días.',
    numeros: numerosDe(semanaData)
  },
  {
    key: 'mes-personal',
    nombre: 'Mes Personal',
    etiqueta: 'Mi energía del mes',
    descripcion:
      'Qué aprender, qué impulsar y qué cuidar durante la vibración de tu Mes Personal.',
    numeros: numerosDe(mesPersonalData)
  },
  {
    key: 'ano-personal',
    nombre: 'Año Personal 2026',
    etiqueta: 'Mi año 2026',
    descripcion:
      'La lección que te toca vivir este 2026 según tu Año Personal: claves y aprendizajes.',
    numeros: numerosDe(anoPersonalData)
  }
]

const ENTRIES_BY_SLUG = new Map<string, { categoria: PersonalCategoria; entry: PersonalNumero }>()
for (const categoria of CATEGORIAS) {
  for (const entry of categoria.numeros) {
    ENTRIES_BY_SLUG.set(entry.slug, { categoria, entry })
  }
}

export function getPersonalCategorias(): PersonalCategoria[] {
  return CATEGORIAS
}

export function getPersonalEntryBySlug(slug: string) {
  return ENTRIES_BY_SLUG.get(slug) ?? null
}

export function getPersonalSlugs(): string[] {
  return [...ENTRIES_BY_SLUG.keys()]
}
