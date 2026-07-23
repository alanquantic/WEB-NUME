'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type ResetPasswordFormProps = {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    const password = String(formData.get('password') ?? '')
    const confirmPassword = String(formData.get('confirm_password') ?? '')
    setError(null)

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    startTransition(async () => {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null
        setError(data?.message ?? 'No fue posible actualizar la contraseña. Intenta de nuevo.')
        return
      }

      setDone(true)
    })
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-md">
        <CardTitle>Contraseña actualizada</CardTitle>
        <CardDescription>
          Tu contraseña se cambió correctamente y cerramos las sesiones anteriores. Ya puedes
          iniciar sesión con tu contraseña nueva.
        </CardDescription>
        <CardContent>
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Iniciar sesión
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardTitle>Crea una contraseña nueva</CardTitle>
      <CardDescription>
        Escribe tu nueva contraseña. Debe tener al menos 8 caracteres.
      </CardDescription>
      <CardContent>
        <form action={handleSubmit} className="grid gap-4">
          <Input
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            minLength={8}
            required
          />
          <Input
            type="password"
            name="confirm_password"
            placeholder="Confirma tu contraseña"
            minLength={8}
            required
          />
          {error ? <p className="text-sm text-[hsl(var(--danger))]">{error}</p> : null}
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Guardando...' : 'Guardar contraseña'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
