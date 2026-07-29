'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Step = 'request' | 'confirm'

type ApiErrorPayload = {
  message?: string
  detail?: string
  title?: string
}

function extractErrorMessage(data: ApiErrorPayload | null, fallback: string): string {
  return data?.detail ?? data?.message ?? data?.title ?? fallback
}

// Reintenta la petición una vez tras refrescar el access token si venció.
async function bffFetch(path: string, init: RequestInit): Promise<Response> {
  const response = await fetch(`/api/bff${path}`, { ...init, credentials: 'include' })
  if (response.status !== 401) return response

  const refresh = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
  if (!refresh.ok) return response

  return fetch(`/api/bff${path}`, { ...init, credentials: 'include' })
}

export function ChangePasswordDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('request')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDialog()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function resetState() {
    setStep('request')
    setCode('')
    setPassword('')
    setPasswordConfirm('')
    setError(null)
    setInfo(null)
    setLoading(false)
  }

  function closeDialog() {
    setOpen(false)
    resetState()
  }

  async function handleRequestCode() {
    setLoading(true)
    setError(null)
    setInfo(null)
    try {
      const response = await bffFetch('/auth/change-password/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      })
      const data = (await response.json().catch(() => null)) as
        | (ApiErrorPayload & { expires_in_minutes?: number })
        | null
      if (!response.ok) {
        setError(extractErrorMessage(data, 'No se pudo enviar el código. Inténtalo de nuevo.'))
        return
      }
      setStep('confirm')
      setInfo(
        data?.message ??
          `Enviamos un código a tu correo. Vence en ${data?.expires_in_minutes ?? 15} minutos.`
      )
    } catch {
      setError('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setInfo(null)

    if (password.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (!/^\d{6}$/.test(code.trim())) {
      setError('El código debe tener 6 dígitos.')
      return
    }

    setLoading(true)
    try {
      const response = await bffFetch('/auth/change-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), password })
      })
      const data = (await response.json().catch(() => null)) as ApiErrorPayload | null
      if (!response.ok) {
        setError(extractErrorMessage(data, 'No se pudo actualizar la contraseña.'))
        return
      }
      setInfo('Contraseña actualizada correctamente.')
      setTimeout(closeDialog, 1500)
    } catch {
      setError('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Cambiar contraseña
      </Button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-password-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeDialog}
        >
          <div
            className="w-full max-w-md rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3
                  id="change-password-title"
                  className="font-display text-2xl font-semibold"
                >
                  Cambiar contraseña
                </h3>
                <p className="mt-1 text-sm leading-6 text-[hsl(var(--foreground))/0.72]">
                  {step === 'request'
                    ? 'Te enviaremos un código de 6 dígitos a tu correo para confirmar el cambio.'
                    : 'Ingresa el código que recibiste y tu nueva contraseña.'}
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
              {step === 'request' ? (
                <div className="grid gap-4">
                  {error ? (
                    <p className="text-sm text-[hsl(var(--danger))]">{error}</p>
                  ) : null}
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeDialog}>
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      onClick={handleRequestCode}
                      disabled={loading}
                    >
                      {loading ? 'Enviando…' : 'Enviar código'}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConfirm} className="grid gap-4">
                  {info ? (
                    <p className="text-sm text-[hsl(var(--foreground))/0.72]">{info}</p>
                  ) : null}
                  <Input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="Código de 6 dígitos"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Nueva contraseña (mín. 8)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Repite la nueva contraseña"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    minLength={8}
                    required
                  />
                  {error ? (
                    <p className="text-sm text-[hsl(var(--danger))]">{error}</p>
                  ) : null}
                  <div className="flex flex-wrap justify-between gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleRequestCode}
                      disabled={loading}
                    >
                      Reenviar código
                    </Button>
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" onClick={closeDialog}>
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Actualizando…' : 'Actualizar'}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
