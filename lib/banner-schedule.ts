import type { Banner } from '@/lib/api/banners'

// Las fechas de los banners se capturan en hora del centro de México.
// CDMX y Monterrey usan UTC-6 todo el año desde que México eliminó el horario
// de verano (oct-2022), así que el offset es fijo.
export const BANNER_TIME_ZONE = 'America/Mexico_City'
const MEXICO_OFFSET = '-06:00'

export type BannerScheduleStatus = 'inactive' | 'scheduled' | 'live' | 'expired'

/** "2026-11-17T23:59" (input datetime-local, hora de México) -> ISO con offset. */
export function fromMexicoInputValue(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed)) return null
  return `${trimmed}:00${MEXICO_OFFSET}`
}

/** ISO -> "YYYY-MM-DDTHH:mm" en hora de México, para un input datetime-local. */
export function toMexicoInputValue(iso: string | null | undefined): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: BANNER_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '00'
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`
}

/** "17 nov 2026, 23:59" en hora de México. */
export function formatMexicoDateTime(iso: string | null | undefined): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: BANNER_TIME_ZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(date)
}

export function getBannerScheduleStatus(
  banner: Pick<Banner, 'is_active' | 'starts_at' | 'ends_at'>,
  now: Date = new Date()
): BannerScheduleStatus {
  if (!banner.is_active) return 'inactive'
  const time = now.getTime()
  if (banner.starts_at && new Date(banner.starts_at).getTime() > time) return 'scheduled'
  if (banner.ends_at && new Date(banner.ends_at).getTime() <= time) return 'expired'
  return 'live'
}

export const BANNER_STATUS_LABEL: Record<BannerScheduleStatus, string> = {
  inactive: 'Inactivo',
  scheduled: 'Programado',
  live: 'Vigente',
  expired: 'Vencido'
}

/** Mensaje de error si la ventana es inválida; null si está bien. */
export function validateBannerWindow(startsAt: string | null, endsAt: string | null): string | null {
  if (startsAt && endsAt && new Date(endsAt).getTime() <= new Date(startsAt).getTime()) {
    return 'La fecha de fin debe ser posterior a la de inicio.'
  }
  return null
}
