'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get('email') ?? '')
    setError(null)

    startTransition(async () => {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null
        setError(data?.message ?? 'No fue posible procesar la solicitud. Intenta de nuevo.')
        return
      }

      setSent(true)
    })
  }

  if (sent) {
    return (
      <Card className="mx-auto max-w-md">
        <CardTitle>Revisa tu correo</CardTitle>
        <CardDescription>
          Si el correo está registrado, recibirás un enlace para restablecer tu contraseña. El
          enlace es válido durante 30 minutos.
        </CardDescription>
        <CardContent>
          <p className="text-sm text-[hsl(var(--foreground))/0.72]">
            ¿No llegó? Revisa tu carpeta de spam o{' '}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-semibold text-[hsl(var(--primary))] underline-offset-2 hover:underline"
            >
              intenta de nuevo
            </button>
            .
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardTitle>¿Olvidaste tu contraseña?</CardTitle>
      <CardDescription>
        Escribe el correo con el que te registraste y te enviaremos un enlace para crear una
        contraseña nueva.
      </CardDescription>
      <CardContent>
        <form action={handleSubmit} className="grid gap-4">
          <Input type="email" name="email" placeholder="correo@ejemplo.com" required />
          {error ? <p className="text-sm text-[hsl(var(--danger))]">{error}</p> : null}
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Enviando...' : 'Enviar enlace'}
          </Button>
          <p className="text-center text-sm text-[hsl(var(--foreground))/0.72]">
            <Link
              href="/login"
              className="font-semibold text-[hsl(var(--primary))] underline-offset-2 hover:underline"
            >
              Volver a iniciar sesión
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
