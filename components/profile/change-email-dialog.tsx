'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiRoute } from '@/lib/api/route-url'

type ApiErrorPayload = {
  message?: string
  detail?: string
  title?: string
}

const WRONG_PASSWORD = 'contraseña actual'

// Llama al BFF y, si el access token venció, refresca y reintenta una vez.
// Un 401 por contraseña incorrecta no se reintenta (contaría doble en el límite).
async function bffPost(path: string, body: unknown): Promise<Response> {
  const send = () =>
    fetch(apiRoute(`/api/bff${path}`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    })

  const response = await send()
  if (response.status !== 401) return response

  const data = (await response.clone().json().catch(() => null)) as ApiErrorPayload | null
  if ((data?.detail ?? '').toLowerCase().includes(WRONG_PASSWORD)) return response

  const refresh = await fetch(apiRoute('/api/auth/refresh'), { method: 'POST', credentials: 'include' })
  return refresh.ok ? send() : response
}

export function ChangeEmailDialog({ currentEmail }: { currentEmail: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDialog()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function closeDialog() {
    setOpen(false)
    setNewEmail('')
    setPassword('')
    setError(null)
    setSentTo(null)
    setLoading(false)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // El diálogo vive dentro del formulario del perfil (en el árbol de React):
    // sin esto, el submit también dispararía el guardado del perfil.
    event.stopPropagation()
    setError(null)

    const email = newEmail.trim().toLowerCase()
    if (email === currentEmail.toLowerCase()) {
      setError('Ese ya es el correo de tu cuenta.')
      return
    }

    setLoading(true)
    try {
      const response = await bffPost('/auth/change-email', {
        new_email: email,
        current_password: password
      })
      const data = (await response.json().catch(() => null)) as
        | (ApiErrorPayload & { pending_email?: string })
        | null

      if (!response.ok) {
        setError(
          response.status === 429
            ? 'Ya pediste varios cambios. Espera un rato antes de intentarlo de nuevo.'
            : data?.detail ?? data?.message ?? 'No se pudo solicitar el cambio. Inténtalo de nuevo.'
        )
        return
      }

      setSentTo(data?.pending_email ?? email)
      setPassword('')
      // El perfil muestra el cambio pendiente (viene de /auth/me).
      router.refresh()
    } catch {
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button type="button" variant="ghost" onClick={() => setOpen(true)} className="h-9 px-3">
        Cambiar correo
      </Button>

      {open
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-email-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeDialog}
        >
          <div
            className="w-full max-w-md rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id="change-email-title" className="font-display text-2xl font-semibold">
                  Cambiar correo
                </h3>
                <p className="mt-1 text-sm leading-6 text-[hsl(var(--foreground))/0.72]">
                  {sentTo
                    ? 'Revisa tu bandeja de entrada.'
                    : 'Te enviaremos un enlace al correo nuevo. Tu cuenta sigue con el correo actual hasta que lo confirmes.'}
                </p>
              </div>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={closeDialog}
                className="text-xl leading-none text-[hsl(var(--foreground))/0.6] hover:opacity-80"
              >
                ×
              </button>
            </div>

            <div className="mt-5">
              {sentTo ? (
                <div className="grid gap-4">
                  <p className="text-sm leading-6">
                    Si <strong className="break-all">{sentTo}</strong> está disponible, te enviamos un
                    enlace para confirmarlo. Vale 24 horas. Al confirmarlo cerraremos tus sesiones y
                    tendrás que iniciar sesión con el correo nuevo.
                  </p>
                  <div className="flex justify-end">
                    <Button type="button" onClick={closeDialog}>
                      Entendido
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <Input
                    type="email"
                    placeholder="Correo nuevo"
                    autoComplete="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    maxLength={320}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Tu contraseña actual"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={128}
                    required
                  />
                  {error ? <p className="text-sm text-[hsl(var(--danger))]">{error}</p> : null}
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeDialog}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Enviando…' : 'Enviar enlace'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>,
          document.body
        )
        : null}
    </>
  )
}
