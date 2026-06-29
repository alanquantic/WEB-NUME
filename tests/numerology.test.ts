import { describe, expect, it } from 'vitest'

import { calculateCompatibility } from '@/lib/numerology/compatibility'
import { calculateExpression } from '@/lib/numerology/expression'
import { calculateLifePath } from '@/lib/numerology/life-path'
import { calculateMaturity } from '@/lib/numerology/maturity'
import { reduceNumerologyNumber } from '@/lib/numerology/reduce-number'
import { reduceNumber } from '@/resources/utils'
import Universal from '@/resources/universal'

describe('reduceNumerologyNumber (lib, maestros 11/22/33)', () => {
  it('mantiene los números maestros', () => {
    expect(reduceNumerologyNumber(11)).toBe(11)
    expect(reduceNumerologyNumber(22)).toBe(22)
    expect(reduceNumerologyNumber(33)).toBe(33)
  })

  it('reduce los números normales', () => {
    expect(reduceNumerologyNumber(10)).toBe(1)
    expect(reduceNumerologyNumber(39)).toBe(3)
    expect(reduceNumerologyNumber(4)).toBe(4)
  })

  it('38 se reduce a 11 (maestro)', () => {
    expect(reduceNumerologyNumber(38)).toBe(11)
  })
})

describe('reduceNumber (resources, maestros 11/22)', () => {
  it('mantiene 11 y 22, pero reduce 33', () => {
    expect(reduceNumber(11)).toBe(11)
    expect(reduceNumber(22)).toBe(22)
    expect(reduceNumber(33)).toBe(6)
  })

  it('2026 se reduce a 1', () => {
    expect(reduceNumber(2026)).toBe(1)
  })
})

describe('calculateLifePath', () => {
  it('1990-07-07 da 33 (maestro)', () => {
    expect(calculateLifePath({ birthDate: '1990-07-07' }).lifePathNumber).toBe(33)
  })

  it('2000-01-01 da 4', () => {
    expect(calculateLifePath({ birthDate: '2000-01-01' }).lifePathNumber).toBe(4)
  })

  it('1987-12-25 da 8', () => {
    expect(calculateLifePath({ birthDate: '1987-12-25' }).lifePathNumber).toBe(8)
  })
})

describe('calculateExpression', () => {
  it('"Ab" da expresión 3, alma 1, personalidad 2', () => {
    expect(calculateExpression('Ab')).toEqual({ expression: 3, soul: 1, personality: 2 })
  })

  it('cadena vacía devuelve null', () => {
    expect(calculateExpression('   ')).toBeNull()
  })

  it('es determinista', () => {
    expect(calculateExpression('Laura Rodriguez')).toEqual(calculateExpression('Laura Rodriguez'))
  })
})

describe('calculateMaturity', () => {
  it('"Ab" + 2000-01-01 da 7 (camino 4 + expresión 3)', () => {
    expect(calculateMaturity('Ab', '2000-01-01')).toBe(7)
  })
})

describe('calculateCompatibility', () => {
  it('33 y 4 son Pareja Complementaria (PC)', () => {
    const result = calculateCompatibility('1990-07-07', '2000-01-01')
    expect(result?.numberA).toBe(33)
    expect(result?.numberB).toBe(4)
    expect(result?.category).toBe('PC')
  })

  it('sin fechas devuelve null', () => {
    expect(calculateCompatibility('', '2000-01-01')).toBeNull()
  })
})

describe('Universal', () => {
  it('el año universal 2026 es 1', () => {
    expect(new Universal().calcUniversalYear(2026)).toBe(1)
  })
})
