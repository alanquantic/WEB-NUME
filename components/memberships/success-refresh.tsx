'use client'

import type { Route } from 'next'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useSessionStore } from '@/stores/session-store'

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
      const nextPath = resolveNextPath(searchParams.get('next'))
      router.replace(nextPath)
      router.refresh()
    }

    void refreshSession()
  }, [loadSession, router, searchParams])

  return <p className="text-sm text-[hsl(var(--foreground))/0.7]">Actualizando tu sesión...</p>
}
