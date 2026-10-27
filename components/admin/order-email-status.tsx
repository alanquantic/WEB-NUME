'use client'

import { useId, useState } from 'react'
import { describeEmailEvent, isResendEmailId, type EmailStatus } from '@/lib/orders/email'

function EmailLookup({ id, label, customerEmail }: { id?: string; label: string; customerEmail: string }) {
  const inputId = useId()
  const [manualId, setManualId] = useState('')
  const [data, setData] = useState<EmailStatus | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function lookup() {
    const emailId = id ?? manualId.trim()
    setError('')
    setData(null)
    if (!isResendEmailId(emailId)) {
      setError('Ingresa el ID del correo en Resend, no la clave de API.')
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/emails/${emailId}`, { cache: 'no-store' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message ?? 'No se pudo consultar el correo.')
      setData(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se pudo consultar el correo.')
    } finally {
      setLoading(false)
    }
  }

  const status = data ? describeEmailEvent(data.lastEvent) : null
  const recipientMatches = data?.to.some(email => email.toLowerCase() === customerEmail.toLowerCase())

  return (
    <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
      <form onSubmit={event => { event.preventDefault(); void lookup() }} className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{label}</p>
          {!id ? (
            <>
              <label htmlFor={inputId} className="mt-2 block text-xs text-foreground/60">ID del correo en Resend</label>
              <input
                id={inputId} value={manualId} disabled={loading}
                onChange={event => { setManualId(event.target.value); setData(null); setError('') }}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                autoComplete="off" spellCheck={false}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
            </>
          ) : <p className="mt-1 text-xs text-foreground/60">Correo vinculado al pedido</p>}
        </div>
        <button type="submit" disabled={loading} className="rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 disabled:opacity-50">
          {loading ? 'Consultando…' : data ? 'Actualizar estado' : 'Consultar estado'}
        </button>
      </form>
      <div aria-live="polite" aria-busy={loading}>
        {error ? <p className="mt-3 text-sm text-red-700" role="alert">{error}</p> : null}
        {data && status ? (
          <div className="mt-4 space-y-3 text-sm">
            <p className="font-semibold">{data.subject || 'Sin asunto'} · {status.label}</p>
            <p className="break-words text-xs text-foreground/60">Para: {data.to.join(', ')}</p>
            {!recipientMatches ? <p className="text-amber-800">El destinatario no coincide con el correo del cliente de este pedido. Verifica que sea el mensaje correcto.</p> : null}
            <dl className="grid gap-3 sm:grid-cols-3">
              {Object.entries({ Envío: status.sent, Entrega: status.delivered, 'Clic en enlaces': status.clicked }).map(([title, value]) => (
                <div key={title} className="rounded-xl bg-secondary/50 p-3">
                  <dt className="text-xs text-foreground/60">{title}</dt>
                  <dd className="mt-1 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-foreground/60">Consultado: {new Date(data.checkedAt).toLocaleString('es-MX')}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function OrderEmailStatus({ emails, customerEmail }: { emails: { id: string; label: string }[]; customerEmail: string }) {
  return (
    <section className="mt-4 space-y-3 border-t border-border/60 pt-4" aria-label="Seguimiento de correos">
      <h3 className="text-sm font-semibold text-primary">Seguimiento de correos · Resend</h3>
      {emails.length ? emails.map(email => <EmailLookup key={email.id} {...email} customerEmail={customerEmail} />) : (
        <>
          <p className="text-xs text-foreground/60">Este pedido no tiene un correo vinculado. Puedes consultar uno por su ID; esta consulta no lo vincula al pedido.</p>
          <EmailLookup label="Consultar correo" customerEmail={customerEmail} />
        </>
      )}
      <p className="text-xs leading-5 text-foreground/60">
        Se consulta el último evento de Resend. Un clic no confirmado no significa que no haya ocurrido.
        El seguimiento de clics debe estar habilitado en el dominio remitente.
      </p>
    </section>
  )
}
