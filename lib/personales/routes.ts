// Rutas de las páginas de contenido "personales" (Número Personal, Alma,
// Día/Semana/Mes/Año Personal) replicadas del sitio WordPress original.
//
// Este módulo es seguro para el cliente: NO importa los JSON de contenido
// (ver lib/personales/data.ts). Mantener los números disponibles en sincronía
// con components/jsons/personales/*.json (generados por el script
// "API NUME/scripts/convert-personales.cjs").

export type PersonalCategoriaKey =
  | 'numero-personal'
  | 'alma'
  | 'dia-personal'
  | 'semana'
  | 'mes-personal'
  | 'ano-personal'
  | 'nombre-activo'
  | 'numero-del-nombre'

const SLUG_BUILDERS: Record<PersonalCategoriaKey, (numero: number) => string> = {
  'numero-personal': (numero) => `numero-personal-${numero}`,
  alma: (numero) => `destino-y-pruebas-de-las-personas-con-alma-${numero}`,
  'dia-personal': (numero) => `dia-personal-${numero}`,
  semana: (numero) => `semana-${numero}`,
  'mes-personal': (numero) => `mes-personal-${numero}`,
  'ano-personal': (numero) => `ano-personal-${numero}-para-2026`,
  'nombre-activo': (numero) => `nombre-activo-numero-${numero}`,
  'numero-del-nombre': (numero) => `significado-${numero}-elpoderdelnombre`
}

// El sitio original no publica todas las combinaciones: mes 2 y año 2/22 no
// existen; para esos casos se usa el fallback que decida quien enlaza.
const NUMEROS_DISPONIBLES: Record<PersonalCategoriaKey, readonly number[]> = {
  'numero-personal': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  alma: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'dia-personal': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  semana: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'mes-personal': [1, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'ano-personal': [1, 3, 4, 5, 6, 7, 8, 9, 11],
  'nombre-activo': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'numero-del-nombre': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22]
}

/**
 * Devuelve la ruta de la página de contenido para una categoría y número
 * calculado, o `null` si ese número no tiene página (p. ej. resultados '?').
 */
export function personalPagePath(
  categoria: PersonalCategoriaKey,
  numero: number | string
): string | null {
  const parsed = typeof numero === 'string' ? Number(numero) : numero
  if (!Number.isFinite(parsed)) return null
  if (!NUMEROS_DISPONIBLES[categoria].includes(parsed)) return null
  return `/${SLUG_BUILDERS[categoria](parsed)}`
}
