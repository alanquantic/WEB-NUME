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
  // Sin año en la URL: el contenido no cambia de un año a otro y así la
  // página conserva su posición en Google. El año va en el título (anio.ts).
  'ano-personal': (numero) => `ano-personal-${numero}`,
  'nombre-activo': (numero) => `nombre-activo-numero-${numero}`,
  'numero-del-nombre': (numero) => `significado-${numero}-elpoderdelnombre`
}

// El sitio original no publica todas las combinaciones: el mes 2 no existe;
// para ese caso se usa el fallback que decida quien enlaza.
const NUMEROS_DISPONIBLES: Record<PersonalCategoriaKey, readonly number[]> = {
  'numero-personal': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  alma: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'dia-personal': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  semana: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'mes-personal': [1, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'ano-personal': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'nombre-activo': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
  'numero-del-nombre': [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22]
}

// Los Años Personales 2 y 22 se quedaron en el WordPress con el slug de 2015
// y llegaron como páginas heredadas (components/jsons/legado). Son la misma
// serie: lib/personales/data.ts los suma a la categoría y lib/legado/data.ts
// deja de publicarlos en su URL vieja (que redirige a la nueva).
export const ANO_PERSONAL_HEREDADOS: Readonly<Record<number, string>> = {
  2: 'ano-personal-2-para-2015',
  22: 'ano-personal-22-para-2015'
}

/** Slug de la página de contenido de una categoría y número (sin validar). */
export function personalSlug(categoria: PersonalCategoriaKey, numero: number): string {
  return SLUG_BUILDERS[categoria](numero)
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
  return `/${personalSlug(categoria, parsed)}`
}
