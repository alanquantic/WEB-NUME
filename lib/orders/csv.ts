import type { Order } from '@/lib/api/contracts'
import { getOrderItemCategory } from '@/lib/orders/category'
import { classifyOrder } from '@/lib/orders/kind'
import { ORDER_TIME_ZONE } from '@/lib/orders/month'
import { getOrderItemReportUrl } from '@/lib/orders/report'

function cell(value: unknown): string {
  let text = value == null ? '' : String(value)
  // Quoting alone does not prevent spreadsheet formulas from executing.
  if (/^[\s\uFEFF]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

function date(value: string | null): string {
  if (!value || Number.isNaN(new Date(value).getTime())) return ''
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: ORDER_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  }).format(new Date(value))
}

export function ordersToCsv(orders: Order[]): string {
  const rows: unknown[][] = [[
    'ID', 'Número de pedido', 'Creado (Ciudad de México)', 'Pagado (Ciudad de México)',
    'Correo del cliente', 'Estado', 'Tipo de pedido', 'Cupón', 'Moneda',
    'Subtotal', 'Impuestos', 'Descuento', 'Total', 'Productos', 'Categorías', 'Reportes'
  ]]
  for (const order of orders) {
    const { kind, coupon } = classifyOrder(order)
    const items = order.items ?? []
    rows.push([
      order.id, order.metadata?.order_number ?? order.external_order_id ?? order.id,
      date(order.created_at), date(order.paid_at), order.customer_email, order.status,
      { test: 'Prueba', real: 'Real', unverified: 'Por verificar' }[kind], coupon,
      order.currency, order.subtotal_amount, order.tax_amount, order.discount_amount, order.total_amount,
      items.map(item => `${item.name} × ${item.quantity}`).join(' | '),
      items.map(item => `${item.name}: ${getOrderItemCategory(item)}`).join(' | '),
      items.map(item => { const url = getOrderItemReportUrl(item); return url ? `${item.name}: ${url}` : '' }).filter(Boolean).join(' | ')
    ])
  }
  // BOM preserves Spanish accents in Excel. One row per order avoids repeating totals.
  return '\uFEFF' + rows.map(row => row.map(cell).join(',')).join('\r\n') + '\r\n'
}
