'use client'

import { useMemo } from 'react'

import { useSessionStore } from '@/stores/session-store'

export type UserDefaults = {
  fullName: string
  birthDate: string
}

function readString(obj: Record<string, unknown> | undefined, key: string): string {
  const value = obj?.[key]
  return typeof value === 'string' ? value.trim() : ''
}

function isYyyyMmDd(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

// Prefiere datos del perfil editado por el usuario; usa metadata.customer
// (dejada por el webhook de la tienda) como respaldo cuando el perfil está vacío.
export function useUserDefaults(): UserDefaults {
  const user = useSessionStore((state) => state.user)

  return useMemo(() => {
    if (!user) return { fullName: '', birthDate: '' }

    const meta = user.metadata ?? {}
    const profile = (meta as Record<string, unknown>).profile as
      | Record<string, unknown>
      | undefined
    const customer = (meta as Record<string, unknown>).customer as
      | Record<string, unknown>
      | undefined

    const first = readString(profile, 'first_name') || readString(customer, 'first_name')
    const last = readString(profile, 'last_name') || readString(customer, 'last_name')
    const composed = [first, last].filter(Boolean).join(' ')
    const fullName =
      composed ||
      readString(profile, 'display_name') ||
      readString(profile, 'nickname')

    const rawBirth = readString(profile, 'birth_date') || readString(customer, 'birth_date')
    const birthDate = isYyyyMmDd(rawBirth) ? rawBirth : ''

    return { fullName, birthDate }
  }, [user])
}
