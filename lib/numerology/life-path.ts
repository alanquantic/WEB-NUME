import { normalizeDateDigits } from '@/lib/numerology/normalize'
import { reduceNumerologyNumber } from '@/lib/numerology/reduce-number'
import type { LifePathInput, LifePathResult } from '@/lib/numerology/types'

export function calculateLifePath(input: LifePathInput): LifePathResult {
  const digits = normalizeDateDigits(input.birthDate)
  const reducedFrom = digits.split('').reduce((sum, digit) => sum + Number(digit), 0)
  const lifePathNumber = reduceNumerologyNumber(reducedFrom)

  return {
    lifePathNumber,
    reducedFrom,
    explanationKey: `life-path-${lifePathNumber}`
  }
}

