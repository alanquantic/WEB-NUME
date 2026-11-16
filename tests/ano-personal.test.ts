import { describe, expect, it } from 'vitest'

import { getLegadoBySlug, getLegadoSlugs } from '@/lib/legado/data'
import {
  aniosVigentes,
  descripcionAnoPersonal,
  etiquetaAnios,
  inicioDeAnio,
  tituloAnoPersonal,
  vigenciaAnoPersonal
} from '@/lib/personales/anio'
import { getPersonalCategoria, getPersonalEntryBySlug } from '@/lib/personales/data'
import { personalPagePath } from '@/lib/personales/routes'
import Person from '@/resources/person'

const NOVIEMBRE_2026 = new Date(2026, 10, 16)
const ENERO_2027 = new Date(2027, 0, 2)
const OCTUBRE_2027 = new Date(2027, 9, 31)

describe('año vigente de Año Personal', () => {
  it('anuncia también el año siguiente en noviembre y diciembre', () => {
    expect(aniosVigentes(NOVIEMBRE_2026)).toEqual([2026, 2027])
    expect(etiquetaAnios(NOVIEMBRE_2026)).toBe('2026 y 2027')
    expect(etiquetaAnios(new Date(2026, 11, 31))).toBe('2026 y 2027')
  })

  it('anuncia solo el año en curso de enero a octubre', () => {
    expect(etiquetaAnios(ENERO_2027)).toBe('2027')
    expect(etiquetaAnios(OCTUBRE_2027)).toBe('2027')
  })

  it('arma título, descripción y vigencia con el año', () => {
    expect(tituloAnoPersonal(5, NOVIEMBRE_2026)).toBe(
      'Año Personal 5 en 2026 y 2027: significado y claves'
    )
    expect(tituloAnoPersonal(5, ENERO_2027)).toBe('Año Personal 5 en 2027: significado y claves')
    expect(descripcionAnoPersonal(4, 'Año para crear abundancia tomando acciones.', ENERO_2027)).toBe(
      'Año para crear abundancia tomando acciones. Conoce la lección y las claves de tu Año Personal 4 en 2027.'
    )
    expect(vigenciaAnoPersonal(5, NOVIEMBRE_2026)).toBe(
      'Aplica si vives tu Año Personal 5 en 2026 o si lo inicias en 2027.'
    )
    expect(vigenciaAnoPersonal(5, ENERO_2027)).toBe('Aplica si 2027 es tu Año Personal 5.')
  })
})

describe('serie de Año Personal en URL fija', () => {
  const categoria = getPersonalCategoria('ano-personal')

  it('tiene los 11 números, en orden y sin año en la URL', () => {
    expect(categoria?.numeros.map((item) => item.numero)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22])
    for (const item of categoria?.numeros ?? []) {
      expect(item.slug).toBe(`ano-personal-${item.numero}`)
      expect(item.bloques.length).toBeGreaterThan(0)
      expect(getPersonalEntryBySlug(item.slug)?.entry.numero).toBe(item.numero)
    }
  })

  it('enlaza todos los resultados posibles de la calculadora', () => {
    expect(personalPagePath('ano-personal', 5)).toBe('/ano-personal-5')
    expect(personalPagePath('ano-personal', 2)).toBe('/ano-personal-2')
    expect(personalPagePath('ano-personal', '22')).toBe('/ano-personal-22')
    expect(personalPagePath('ano-personal', 10)).toBeNull()
  })

  it('mantiene abiertos el 2 y el 22, que ya eran públicos', () => {
    const abiertos = categoria?.numeros.filter((item) => item.abierto).map((item) => item.numero)
    expect(abiertos).toEqual([2, 22])
  })

  it('ya no publica el 2 y el 22 en su URL de 2015', () => {
    expect(getLegadoBySlug('ano-personal-2-para-2015')).toBeNull()
    expect(getLegadoBySlug('ano-personal-22-para-2015')).toBeNull()
    expect(getLegadoSlugs().some((slug) => slug.startsWith('ano-personal-2'))).toBe(false)
    expect(getPersonalEntryBySlug('ano-personal-5-para-2026')).toBeNull()
  })
})

describe('cálculo del Año Personal por año', () => {
  it('usa el año pedido en cualquier zona horaria', () => {
    expect(inicioDeAnio(2027).getUTCFullYear()).toBe(2027)
    const person = new Person({ birthDate: '1990-05-15' })
    // 2027 + 5 + 15 = 2047 → 2 + 0 + 4 + 7 = 13 → 4
    expect(person.calcPersonalYear(inicioDeAnio(2027))).toBe(4)
    expect(person.calcPersonalYear(inicioDeAnio(2026))).toBe(3)
  })
})
