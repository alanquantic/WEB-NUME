'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useSessionStore } from '@/stores/session-store'

export function SuccessRefresh() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const loadSession = useSessionStore((state) => state.loadSession)

  useEffect(() => {
    async function refreshSession() {
      await loadSession()
      const nextPath = searchParams.get('next') || '/perfil/suscripcion'
      router.replace(nextPath)
      router.refresh()
    }

    void refreshSession()
  }, [loadSession, router, searchParams])

  return <p className="text-sm text-[hsl(var(--foreground))/0.7]">Actualizando tu sesión...</p>
}

