'use client'

import { useEffect } from 'react'

import { useSessionStore } from '@/stores/session-store'

export function SessionBootstrap() {
  const isHydrated = useSessionStore((state) => state.isHydrated)
  const loadSession = useSessionStore((state) => state.loadSession)

  useEffect(() => {
    if (!isHydrated) {
      void loadSession()
    }
  }, [isHydrated, loadSession])

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible' && !useSessionStore.getState().isLoading) {
        void loadSession()
      }
    }
    const timer = window.setInterval(refresh, 5 * 60_000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [loadSession])

  return null
}

