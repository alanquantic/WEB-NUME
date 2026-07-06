import { calculateLifePath } from '@/lib/numerology/life-path'
import { reduceNumerologyNumber } from '@/lib/numerology/reduce-number'
import Person from '@/resources/person'

export function calculateMaturity(fullName: string, birthDate: string): number | null {
  const normalized = fullName.replace(/\s+/g, ' ').trim()
  if (!normalized || !birthDate) return null

  try {
    const [name = '', ...rest] = normalized.split(' ')
    const person = new Person({ name, lastName: rest.join(' ') })
    const expression = person.calcName()
    const lifePath = calculateLifePath({ birthDate }).lifePathNumber
    return reduceNumerologyNumber(lifePath + expression)
  } catch {
    return null
  }
}
