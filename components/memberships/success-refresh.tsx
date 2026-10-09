'use client'

import type { Route } from 'next'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { track } from '@/lib/analytics'
import { useSessionStore } from '@/stores/session-store'

const FIRED_KEY = 'nume_subscribe_fired'

export function SuccessRefresh() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const loadSession = useSessionStore((state) => state.loadSession)

  function resolveNextPath(value: string | null): Route {
    if (!value || !value.startsWith('/')) {
      return '/perfil/suscripcion'
    }

    return value as Route
  }

  useEffect(() => {
    async function refreshSession() {
      await loadSession()

      // Reportar la conversión una única vez por session_id para evitar doble
      // conteo si el usuario refresca esta página.
      const transactionId =
        searchParams.get('session_id') ||
        searchParams.get('subscription_id') ||
        searchParams.get('id') ||
        ''
      if (transactionId && typeof sessionStorage !== 'undefined') {
        const fired = sessionStorage.getItem(FIRED_KEY)
        if (fired !== transactionId) {
          const value = Number(searchParams.get('value')) || 0
          const currency = searchParams.get('currency') || 'MXN'
          const planId = searchParams.get('plan_id') || ''
          const planName = searchParams.get('plan_name') || 'Membresía'
          track('subscribe', {
            transaction_id: transactionId,
            membership_id: planId,
            membership_name: planName,
            value,
            currency
          })
          sessionStorage.setItem(FIRED_KEY, transactionId)
        }
      }

      const nextPath = resolveNextPath(searchParams.get('next'))
      router.replace(nextPath)
      router.refresh()
    }

    void refreshSession()
  }, [loadSession, router, searchParams])

  return <p className="text-sm text-[hsl(var(--foreground))/0.7]">Actualizando tu sesión...</p>
}
