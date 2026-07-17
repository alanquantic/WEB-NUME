import Link from 'next/link'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { Order } from '@/lib/api/contracts'
import { getAllOrders, getMyOrders } from '@/lib/api/orders'
import { getServerSessionUser } from '@/lib/auth/session'

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'Pendiente',
  paid: 'Pagada',
  failed: 'Fallida',
  cancelled: 'Cancelada',
  refunded: 'Reembolsada',
  partially_refunded: 'Reembolso parcial'
}

const STATUS_STYLES: Record<Order['status'], string> = {
  pending: 'bg-amber-100 text-amber-800',
  paid: 'bg-emerald-100 text-emerald-800',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-zinc-200 text-zinc-700',
  refunded: 'bg-sky-100 text-sky-800',
  partially_refunded: 'bg-sky-100 text-sky-800'
}

function formatDate(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

function formatAmount(amount: string, currency: string): string {
  const value = Number(amount)
  if (!Number.isFinite(value)) return `${amount} ${currency}`
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(value)
}

function OrderCard({ order, showEmail }: { order: Order; showEmail: boolean }) {
  const number =
    (order.metadata?.order_number as string | undefined) ?? order.external_order_id ?? order.id

  return (
    <div className="rounded-3xl border border-border/70 bg-[hsl(var(--secondary)/0.35)] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold text-primary">{number}</p>
          <p className="mt-0.5 text-xs text-foreground/60">
            {formatDate(order.paid_at ?? order.created_at)}
            {showEmail ? ` · ${order.customer_email}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[order.status]}`}
          >
            {STATUS_LABELS[order.status]}
          </span>
          <span className="font-display text-lg font-semibold text-foreground">
            {formatAmount(order.total_amount, order.currency)}
          </span>
        </div>
      </div>

      {order.items && order.items.length > 0 ? (
        <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-foreground/80">
                {item.name}
                {item.description ? (
                  <span className="text-foreground/55"> · {item.description}</span>
                ) : null}
                {item.quantity > 1 ? (
                  <span className="text-foreground/55"> × {item.quantity}</span>
                ) : null}
              </span>
              <span className="shrink-0 text-foreground/70">
                {formatAmount(item.total_amount, order.currency)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default async function OrdersPage() {
  const user = await getServerSessionUser()
  const isAdmin = user?.role === 'admin'

  let orders: Order[] = []
  let loadError = false

  try {
    const response = isAdmin ? await getAllOrders() : await getMyOrders()
    orders = response.data
  } catch {
    loadError = true
  }

  return (
    <Card>
      <CardTitle>Órdenes</CardTitle>
      <CardDescription>
        {isAdmin ? 'Todas las órdenes registradas en el sistema.' : 'Historial de tus compras y pagos.'}
      </CardDescription>
      <CardContent className="grid gap-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} showEmail={isAdmin} />)
        ) : (
          <div className="rounded-3xl border border-dashed border-border/80 bg-[hsl(var(--secondary)/0.4)] px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold text-primary">
              {loadError ? 'No pudimos cargar las órdenes' : 'Aún no hay órdenes'}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground/70">
              {loadError
                ? 'Hubo un problema al consultar el historial. Intenta de nuevo en unos minutos.'
                : isAdmin
                  ? 'Cuando los clientes realicen compras en la tienda, las órdenes aparecerán aquí.'
                  : 'Cuando realices una compra, aquí verás el historial con el estado y el detalle de cada orden.'}
            </p>
            {!isAdmin && !loadError ? (
              <Link
                href="/membresias"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
              >
                Ver membresías
              </Link>
            ) : null}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
