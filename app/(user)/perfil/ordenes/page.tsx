import Link from 'next/link'
import { OrderEmailStatus } from '@/components/admin/order-email-status'
import { ExportOrdersButton } from '@/components/admin/export-orders-button'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { Order, OrderItem } from '@/lib/api/contracts'
import { getAllOrders, getMyOrders } from '@/lib/api/orders'
import { getServerSessionUser } from '@/lib/auth/session'
import { getOrderItemCategory } from '@/lib/orders/category'
import { formatOrderItemCost } from '@/lib/orders/costs'
import { getOrderItemReportUrl } from '@/lib/orders/report'
import { getOrderEmails } from '@/lib/orders/email'
import { classifyOrder, type OrderKind } from '@/lib/orders/kind'
import { getOrdersForMonth, ORDER_TIME_ZONE, orderMonthLabel, parseOrderMonth } from '@/lib/orders/month'

const ORDER_KIND_LABELS: Record<OrderKind, string> = {
  test: 'Pedido de prueba',
  real: 'Pedido real',
  unverified: 'Tipo por verificar'
}

const ORDER_KIND_STYLES: Record<OrderKind, string> = {
  test: 'bg-violet-100 text-violet-800',
  real: 'bg-sky-100 text-sky-800',
  unverified: 'bg-amber-100 text-amber-800'
}

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
    year: 'numeric',
    timeZone: ORDER_TIME_ZONE
  }).format(date)
}

function formatAmount(amount: string, currency: string): string {
  const value = Number(amount)
  if (!Number.isFinite(value)) return `${amount} ${currency}`
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(value)
}

function OrderReportLink({ item }: { item: OrderItem }) {
  const href = getOrderItemReportUrl(item)
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex text-sm font-semibold text-primary underline underline-offset-4 hover:opacity-80"
      aria-label={`Ver reporte de ${item.name} (abre en otra pestaña)`}
    >
      Ver reporte
    </a>
  )
}

function OrderCard({ order, showEmail }: { order: Order; showEmail: boolean }) {
  const { kind, coupon } = classifyOrder(order)
  const number =
    (order.metadata?.order_number as string | undefined) ?? order.external_order_id ?? order.id

  return (
    <div className="rounded-3xl border border-border/70 bg-[hsl(var(--secondary)/0.35)] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold text-primary">{number}</p>
          <p className="mt-0.5 text-xs text-foreground/60">
            {formatDate(order.created_at)}
            {showEmail ? ` · ${order.customer_email}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {showEmail ? (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ORDER_KIND_STYLES[kind]}`}>
              {ORDER_KIND_LABELS[kind]}
            </span>
          ) : null}
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

      {showEmail ? (
        <div className="mt-3 text-xs text-foreground/65">
          {coupon ? <p>Cupón: <span className="font-semibold">{coupon}</span> · Descuento: {formatAmount(order.discount_amount, order.currency)}</p> : null}
          {kind === 'test' ? <p className="mt-1">Cupón de prueba con descuento del 100%.</p> : null}
          {kind === 'unverified' ? <p className="mt-1">Los datos del cupón o del descuento están incompletos o son inconsistentes. Revisa el pedido para clasificarlo.</p> : null}
        </div>
      ) : null}

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
                {showEmail ? (
                  <span className="mt-1 block text-xs text-foreground/60">
                    Categoría: {getOrderItemCategory(item)}
                  </span>
                ) : null}
                {showEmail && getOrderItemCategory(item) === 'Reporte IA' ? (
                  <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60">
                    <span>Costo de tokens: {formatOrderItemCost(item, 'token_cost')}</span>
                    <span>Costo de producción: {formatOrderItemCost(item, 'production_cost')}</span>
                  </span>
                ) : null}
                {showEmail ? <OrderReportLink item={item} /> : null}
              </span>
              <span className="shrink-0 text-foreground/70">
                {formatAmount(item.total_amount, order.currency)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {showEmail ? <OrderEmailStatus emails={getOrderEmails(order)} customerEmail={order.customer_email} /> : null}
    </div>
  )
}

export default async function OrdersPage({ searchParams }: { searchParams: { month?: string | string[] } }) {
  const user = await getServerSessionUser()
  const isAdmin = user?.role === 'admin'
  const month = parseOrderMonth(searchParams.month)
  const monthLabel = month ? orderMonthLabel(month) : null

  let orders: Order[] = []
  let loadError = false

  try {
    const fetchOrders = isAdmin ? getAllOrders : getMyOrders
    orders = month ? await getOrdersForMonth(fetchOrders, month) : (await fetchOrders()).data
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
        <form action="/perfil/ordenes" method="get" className="flex flex-wrap items-end gap-3 rounded-2xl border border-border/70 p-4">
          <div>
            <label htmlFor="orders-month" className="block text-sm font-semibold text-primary">Filtrar por mes</label>
            <input key={month ?? 'all'} id="orders-month" name="month" type="month" defaultValue={month ?? ''}
              className="mt-2 rounded-xl border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Mostrar pedidos</button>
          {isAdmin ? <ExportOrdersButton /> : null}
          {month ? <Link href="/perfil/ordenes" className="px-2 py-2 text-sm text-primary underline underline-offset-4">Quitar filtro</Link> : null}
          <p className="w-full text-xs text-foreground/60">Según la fecha de creación del pedido, en horario de Ciudad de México.</p>
          {isAdmin ? <p className="w-full text-xs text-foreground/60">El CSV incluye todos los pedidos del mes seleccionado. Sin mes, exporta todo el historial.</p> : null}
        </form>
        {monthLabel && !loadError ? <p className="text-sm text-foreground/70">{orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'} en {monthLabel}.</p> : null}
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} showEmail={isAdmin} />)
        ) : (
          <div className="rounded-3xl border border-dashed border-border/80 bg-[hsl(var(--secondary)/0.4)] px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold text-primary">
              {loadError ? 'No pudimos cargar las órdenes' : monthLabel ? `No hay pedidos en ${monthLabel}` : 'Aún no hay órdenes'}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground/70">
              {loadError
                ? 'Hubo un problema al consultar el historial. Intenta de nuevo en unos minutos.'
                : monthLabel
                  ? 'Selecciona otro mes o quita el filtro para ver los pedidos recientes.'
                : isAdmin
                  ? 'Cuando los clientes realicen compras en la tienda, las órdenes aparecerán aquí.'
                  : 'Cuando realices una compra, aquí verás el historial con el estado y el detalle de cada orden.'}
            </p>
            {!isAdmin && !loadError && !month ? (
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
