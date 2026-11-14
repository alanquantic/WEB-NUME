import { describe, expect, it } from 'vitest'

import {
  fromMexicoInputValue,
  getBannerScheduleStatus,
  toMexicoInputValue,
  validateBannerWindow
} from '@/lib/banner-schedule'

describe('fechas de banners en hora de México', () => {
  it('convierte el valor del input a ISO con offset -06:00', () => {
    expect(fromMexicoInputValue('2026-11-17T23:59')).toBe('2026-11-17T23:59:00-06:00')
    expect(fromMexicoInputValue('')).toBeNull()
    expect(fromMexicoInputValue('17/11/2026')).toBeNull()
  })

  it('el 17 nov 23:59 en México es el 18 nov 05:59 UTC', () => {
    const iso = fromMexicoInputValue('2026-11-17T23:59')!
    expect(new Date(iso).toISOString()).toBe('2026-11-18T05:59:00.000Z')
  })

  it('ida y vuelta: ISO de la API -> input sin cambiar la hora', () => {
    expect(toMexicoInputValue('2026-11-18T05:59:00.000Z')).toBe('2026-11-17T23:59')
    expect(toMexicoInputValue(null)).toBe('')
    // Julio: México ya no cambia de horario, sigue siendo UTC-6.
    expect(toMexicoInputValue('2026-07-01T18:00:00.000Z')).toBe('2026-07-01T12:00')
  })
})

describe('estado de vigencia', () => {
  const now = new Date('2026-11-15T12:00:00Z')
  const base = { is_active: true, starts_at: null, ends_at: null }

  it('sin fechas y activo = vigente', () => {
    expect(getBannerScheduleStatus(base, now)).toBe('live')
  })

  it('desactivado gana sobre las fechas', () => {
    expect(getBannerScheduleStatus({ ...base, is_active: false }, now)).toBe('inactive')
  })

  it('programado, vigente y vencido según la ventana', () => {
    expect(getBannerScheduleStatus({ ...base, starts_at: '2026-11-16T00:00:00Z' }, now)).toBe(
      'scheduled'
    )
    expect(
      getBannerScheduleStatus(
        { ...base, starts_at: '2026-11-13T06:00:00Z', ends_at: '2026-11-18T05:59:00Z' },
        now
      )
    ).toBe('live')
    expect(getBannerScheduleStatus({ ...base, ends_at: '2026-11-15T12:00:00Z' }, now)).toBe(
      'expired'
    )
  })

  it('valida que el fin sea posterior al inicio', () => {
    expect(validateBannerWindow('2026-11-17T00:00:00Z', '2026-11-13T00:00:00Z')).toMatch(
      /posterior/
    )
    expect(validateBannerWindow(null, '2026-11-13T00:00:00Z')).toBeNull()
  })
})
