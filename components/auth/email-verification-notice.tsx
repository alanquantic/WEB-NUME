'use client'

import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { clientApiFetch } from '@/lib/api/client'
import { cn } from '@/lib/utils'

type EmailVerificationNoticeProps = {
  email: string
  className?: string
}

export function EmailVerificationNotice({ email, className }: EmailVerificationNoticeProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleResend() {
    setMessage(null)
    setError(null)

    startTransition(async () => {
      try {
        await clientApiFetch<{ message: string }>('/auth/resend-verification', { method: 'POST' })
        setMessage(`Te enviamos un enlace nuevo a ${email}. Revisa también tu carpeta de spam.`)
      } catch (err) {
        // clientApiFetch lanza `Request failed with status <código>`.
        const isRateLimited = err instanceof Error && err.message.endsWith('429')
        setError(
          isRateLimited
            ? 'Ya pediste varios enlaces. Espera un rato antes de pedir otro.'
            : 'No fue posible reenviar el correo. Intenta de nuevo más tarde.'
        )
      }
    })
  }

  return (
    <div
      role="status"
      className={cn(
        'rounded-[2rem] border border-[hsl(var(--accent)/0.5)] bg-[hsl(var(--accent)/0.12)] p-5 sm:p-6',
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold">Confirma tu correo</p>
          <p className="mt-1 text-sm leading-6 text-[hsl(var(--foreground))/0.8]">
            Te enviamos un enlace a <strong className="break-all">{email}</strong>. Hasta que lo
            confirmes, algunas funciones de tu cuenta estarán limitadas.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="shrink-0"
          onClick={handleResend}
          disabled={isPending}
        >
          {isPending ? 'Enviando...' : 'Reenviar correo'}
        </Button>
      </div>
      {message ? <p className="mt-3 text-sm">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-[hsl(var(--danger))]">{error}</p> : null}
    </div>
  )
}
