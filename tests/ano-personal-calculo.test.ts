import { describe, expect, it } from 'vitest'

import { aniosVigentes, inicioDeAnio } from '@/lib/personales/anio'
import Person from '@/resources/person'

describe('años vigentes del Año Personal', () => {
  it('incluye el año siguiente en noviembre y diciembre', () => {
    expect(aniosVigentes(new Date(2026, 10, 1))).toEqual([2026, 2027])
    expect(aniosVigentes(new Date(2026, 11, 31))).toEqual([2026, 2027])
  })

  it('solo el año en curso de enero a octubre', () => {
    expect(aniosVigentes(new Date(2027, 0, 1))).toEqual([2027])
    expect(aniosVigentes(new Date(2027, 9, 31))).toEqual([2027])
  })
})

describe('cálculo del Año Personal por año', () => {
  const person = new Person({ birthDate: '1990-05-15' })

  it('usa el año pedido en cualquier zona horaria', () => {
    expect(inicioDeAnio(2027).getUTCFullYear()).toBe(2027)
    // 2026 + 5 + 15 = 2046 → 12 → 3;  2027 + 5 + 15 = 2047 → 13 → 4
    expect(person.calcPersonalYear(inicioDeAnio(2026))).toBe(3)
    expect(person.calcPersonalYear(inicioDeAnio(2027))).toBe(4)
  })

  it('la medianoche local del 1 de enero no sirve al este de Greenwich', () => {
    // Con TZ=Europe/Madrid esta fecha cae en el 31 de diciembre UTC.
    const medianocheLocal = new Date(2026, 0, 1)
    const esperado = medianocheLocal.getTimezoneOffset() < 0 ? 2025 : 2026
    expect(medianocheLocal.getUTCFullYear()).toBe(esperado)
  })
})
