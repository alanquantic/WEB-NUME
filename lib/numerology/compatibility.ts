import { calculateLifePath } from '@/lib/numerology/life-path'
import { getCompatibility } from '@/resources/utils'

export type CompatibilityResult = {
  numberA: number
  numberB: number
  category: string
  label: string
  description: string
}

const CATEGORY_INFO: Record<string, { label: string; description: string }> = {
  PN: {
    label: 'Pareja Natural',
    description: 'Máxima afinidad: fluyen con naturalidad y se entienden casi sin esfuerzo.'
  },
  PC: {
    label: 'Pareja Complementaria',
    description: 'Se complementan muy bien; sus diferencias suman y enriquecen la relación.'
  },
  PD: {
    label: 'Pareja de Aprendizaje',
    description: 'Relación de crecimiento: aprenden mucho juntos si cultivan la comunicación.'
  },
  PNE: {
    label: 'Pareja de Reto',
    description: 'Vínculo desafiante que pide consciencia y respeto por los ritmos de cada uno.'
  }
}

// La tabla solo contempla 1-9, 11 y 22; el 33 se reduce a 6 para la consulta.
function toTableKey(value: number): number {
  return value === 33 ? 6 : value
}

export function calculateCompatibility(
  dateA: string,
  dateB: string
): CompatibilityResult | null {
  if (!dateA || !dateB) return null

  const numberA = calculateLifePath({ birthDate: dateA }).lifePathNumber
  const numberB = calculateLifePath({ birthDate: dateB }).lifePathNumber
  const category = getCompatibility(toTableKey(numberA), toTableKey(numberB))
  const info = CATEGORY_INFO[category] ?? {
    label: 'Sin clasificación directa',
    description:
      'No encontramos una relación directa en la tabla para estos números, pero toda combinación tiene su propio potencial.'
  }

  return {
    numberA,
    numberB,
    category,
    label: info.label,
    description: info.description
  }
}
