'use client'

import type { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useSessionStore } from '@/stores/session-store'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const loadSession = useSessionStore((state) => state.loadSession)

  function resolveNextPath(value: string | null): Route {
    if (!value || !value.startsWith('/')) {
      return '/perfil'
    }

    return value as Route
  }

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')
    setError(null)

    startTransition(async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        setError('No se pudo iniciar sesión. Revisa tus credenciales.')
        return
      }

      await loadSession()
      const nextPath = resolveNextPath(searchParams.get('next'))
      router.push(nextPath)
      router.refresh()
    })
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardTitle>Accede a tu cuenta</CardTitle>
      <CardDescription>
        Tu sesión queda centralizada en cookies seguras y el cliente solo conserva el estado
        visible del usuario.
      </CardDescription>
      <CardContent>
        <form action={handleSubmit} className="grid gap-4">
          <Input type="email" name="email" placeholder="correo@ejemplo.com" required />
          <Input type="password" name="password" placeholder="••••••••" required />
          {error ? <p className="text-sm text-[hsl(var(--danger))]">{error}</p> : null}
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
