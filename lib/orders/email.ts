import type { Order } from '@/lib/api/contracts'

export type EmailStatus = {
  id: string
  subject: string
  to: string[]
  lastEvent: string
  checkedAt: string
}

export function isResendEmailId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value)
}

export function getOrderEmails(order: Order): { id: string; label: string }[] {
  const entries = [
    { id: order.resend_email_id ?? order.metadata?.resend_email_id, label: 'Correo del pedido' },
    ...(order.items ?? []).map(item => ({
      id: item.resend_email_id ?? item.metadata?.resend_email_id,
      label: item.name
    }))
  ]
  const seen = new Set<string>()
  return entries.flatMap(({ id, label }) => {
    if (!isResendEmailId(id) || seen.has(id)) return []
    seen.add(id)
    return [{ id, label }]
  })
}

export function describeEmailEvent(event: string) {
  const labels: Record<string, string> = {
    sent: 'Enviado', delivered: 'Entregado', opened: 'Abierto', clicked: 'Clic registrado',
    bounced: 'Rebotado', complained: 'Marcado como spam', delivery_delayed: 'Entrega demorada',
    failed: 'Envío fallido', canceled: 'Cancelado', queued: 'En cola',
    scheduled: 'Programado', suppressed: 'Suprimido'
  }
  return {
    label: labels[event] ?? 'Estado desconocido',
    sent: ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'delivery_delayed'].includes(event)
      ? 'Confirmado' : ['failed', 'canceled', 'suppressed'].includes(event) ? 'No enviado' : 'No confirmado',
    delivered: ['delivered', 'opened', 'clicked', 'complained'].includes(event)
      ? 'Confirmada' : event === 'bounced' ? 'Rebotado' : 'No confirmada',
    clicked: event === 'clicked' ? 'Clic registrado' : 'No confirmado'
  }
}
