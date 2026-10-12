'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { apiRoute } from '@/lib/api/route-url'
import { useSessionStore } from '@/stores/session-store'

type VerifyEmailCardProps = {
  token: string
}

type Status = 'verifying' | 'verified' | 'error'

const linkClassName =
  'inline-flex h-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-semibold text-white transition hover:opacity-90'

export function VerifyEmailCard({ token }: VerifyEmailCardProps) {
  const router = useRouter()
  const user = useSessionStore((state) => state.user)
  const loadSession = useSessionStore((state) => state.loadSession)
  const [status, setStatus] = useState<Status>('verifying')
  const [error, setError] = useState<string | null>(null)
  // El token es de un solo uso: en StrictMode el efecto corre dos veces y la
  // segunda llamada respondería 401, así que solo lo enviamos una vez.
  const sentRef = useRef(false)

  useEffect(() => {
    if (sentRef.current) return
    sentRef.current = true

    void (async () => {
      try {
        const response = await fetch(apiRoute('/api/auth/verify-email'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { message?: string } | null
          setError(data?.message ?? 'No fue posible confirmar tu correo. Intenta de nuevo.')
          setStatus('error')
          return
        }

        setStatus('verified')
        // Si hay sesión abierta, refrescamos el usuario para quitar el aviso.
        void loadSession()
        router.refresh()
      } catch {
        setError('No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.')
        setStatus('error')
      }
    })()
  }, [token, loadSession, router])

  if (status === 'verifying') {
    return (
      <Card className="mx-auto max-w-md" aria-busy="true">
        <CardTitle>Confirmando tu correo…</CardTitle>
        <CardDescription>Esto solo toma un momento.</CardDescription>
      </Card>
    )
  }

  if (status === 'verified') {
    return (
      <Card className="mx-auto max-w-md">
        <CardTitle>¡Correo confirmado!</CardTitle>
        <CardDescription>
          Gracias por confirmar tu correo. Ya tienes acceso completo a tu cuenta.
        </CardDescription>
        <CardContent>
          <Link href={user ? '/perfil' : '/login'} className={linkClassName}>
            {user ? 'Ir a mi perfil' : 'Iniciar sesión'}
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardTitle>No pudimos confirmar tu correo</CardTitle>
      <CardDescription role="alert">{error}</CardDescription>
      <CardContent className="grid gap-3 text-sm">
        <p>
          Desde tu perfil puedes pedir un enlace nuevo. Recuerda que cada enlace vale 24 horas y
          solo sirve una vez.
        </p>
        <Link href="/perfil" className={linkClassName}>
          Ir a mi perfil
        </Link>
      </CardContent>
    </Card>
  )
}
