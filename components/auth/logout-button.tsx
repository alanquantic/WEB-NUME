'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/stores/session-store'

export function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const clearSession = useSessionStore((state) => state.clearSession)

  function handleLogout() {
    startTransition(async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      } catch {
        // aunque falle la llamada al backend, limpiamos la sesión local igual
      }
      clearSession()
      router.push('/')
      router.refresh()
    })
  }

  return (
    <Button type="button" variant="secondary" onClick={handleLogout} disabled={isPending}>
      {isPending ? 'Cerrando sesión…' : 'Cerrar sesión'}
    </Button>
  )
}
