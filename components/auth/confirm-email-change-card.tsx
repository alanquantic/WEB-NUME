'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { apiRoute } from '@/lib/api/route-url'
import { useSessionStore } from '@/stores/session-store'

type Status = 'confirming' | 'done' | 'error'

const linkClassName =
  'inline-flex h-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-semibold text-white transition hover:opacity-90'

export function ConfirmEmailChangeCard({ token }: { token: string }) {
  const clearSession = useSessionStore((state) => state.clearSession)
  const [status, setStatus] = useState<Status>('confirming')
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  // Token de un solo uso: en StrictMode el efecto corre dos veces.
  const sentRef = useRef(false)

  useEffect(() => {
    if (sentRef.current) return
    sentRef.current = true
    // Quitamos el token de la URL (historial, Referer).
    window.history.replaceState(window.history.state, '', window.location.pathname)

    void (async () => {
      try {
        const response = await fetch(apiRoute('/api/auth/confirm-email-change'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })
        const data = (await response.json().catch(() => null)) as
          | { message?: string; email?: string }
          | null

        if (!response.ok) {
          setError(data?.message ?? 'No fue posible confirmar el cambio. Intenta de nuevo.')
          setStatus('error')
          return
        }

        // Las sesiones se cerraron en la API y las cookies en la ruta.
        clearSession()
        setEmail(data?.email ?? null)
        setStatus('done')
      } catch {
        setError('No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.')
        setStatus('error')
      }
    })()
  }, [token, clearSession])

  if (status === 'confirming') {
    return (
      <Card className="mx-auto max-w-md" aria-busy="true">
        <CardTitle>Confirmando tu nuevo correo…</CardTitle>
        <CardDescription>Esto solo toma un momento.</CardDescription>
      </Card>
    )
  }

  if (status === 'done') {
    return (
      <Card className="mx-auto max-w-md">
        <CardTitle>¡Correo actualizado!</CardTitle>
        <CardDescription>
          {email ? (
            <>
              Tu cuenta ahora usa <strong className="break-all">{email}</strong>.{' '}
            </>
          ) : null}
          Por seguridad cerramos tus sesiones: inicia sesión con tu nuevo correo.
        </CardDescription>
        <CardContent>
          <Link href="/login" className={linkClassName}>
            Iniciar sesión
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardTitle>No pudimos cambiar tu correo</CardTitle>
      <CardDescription role="alert">{error}</CardDescription>
      <CardContent>
        <Link href="/perfil/datos" className={linkClassName}>
          Ir a mis datos
        </Link>
      </CardContent>
    </Card>
  )
}
