'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

function resolveError(status: number): string {
  if (status === 401) return 'La contraseña no es correcta.'
  if (status === 429) return 'Demasiados intentos. Espera un minuto e inténtalo de nuevo.'
  return 'No fue posible validar la contraseña. Inténtalo de nuevo.'
}

export function PagePasswordGate({ pageId }: { pageId: string }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRefreshing, startRefresh] = useTransition()
  const isPending = isSubmitting || isRefreshing

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!password) return

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/paginas/${encodeURIComponent(pageId)}/desbloquear/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (!response.ok) {
        setError(resolveError(response.status))
        return
      }

      startRefresh(() => router.refresh())
    } catch {
      setError(resolveError(0))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Card className="bg-[linear-gradient(135deg,#fff7ed,#f2efe7)]">
        <CardTitle>Contenido solo disponible para miembros</CardTitle>
        <CardDescription>Ingresa la contraseña para ver esta página.</CardDescription>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              type="password"
              name="password"
              aria-label="Contraseña"
              autoComplete="off"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" disabled={isPending || !password}>
              {isPending ? 'Validando…' : 'Entrar'}
            </Button>
          </form>
          {error ? (
            <p role="alert" className="mt-3 text-sm font-medium text-[hsl(var(--danger))]">
              {error}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
