import type { OrderItem } from '@/lib/api/contracts'

// Costs belong to each order item. Never substitute the sale price or assume
// the order currency: AI providers may bill in a different currency.
export function formatOrderItemCost(item: OrderItem, field: 'token_cost' | 'production_cost'): string {
  const raw = item[field] ?? item.metadata?.[field]
  if ((typeof raw !== 'number' && typeof raw !== 'string') || String(raw).trim() === '') {
    return 'No disponible'
  }
  const amount = Number(raw)
  if (!Number.isFinite(amount) || amount < 0) return 'No disponible'

  const rawCurrency = item.cost_currency ?? item.metadata?.cost_currency
  const currency = typeof rawCurrency === 'string' ? rawCurrency.trim().toUpperCase() : ''
  const number = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 8 }).format(amount)
  if (!/^[A-Z]{3}$/.test(currency)) return `${number} (moneda no especificada)`
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  }).format(amount)
}
