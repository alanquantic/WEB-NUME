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

  return null
}

