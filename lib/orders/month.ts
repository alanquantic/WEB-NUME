import type { ApiListResponse, Order } from '@/lib/api/contracts'

export const ORDER_TIME_ZONE = 'America/Mexico_City'

export function parseOrderMonth(value: unknown): string | null {
  return typeof value === 'string' && /^(?!0000)\d{4}-(0[1-9]|1[0-2])$/.test(value) ? value : null
}

export function orderMatchesMonth(order: Order, month: string): boolean {
  const date = new Date(order.created_at)
  if (!parseOrderMonth(month) || Number.isNaN(date.getTime())) return false
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: ORDER_TIME_ZONE, year: 'numeric', month: '2-digit'
  }).formatToParts(date)
  return `${parts.find(part => part.type === 'year')?.value.padStart(4, '0')}-${parts.find(part => part.type === 'month')?.value}` === month
}

export function orderMonthLabel(month: string): string {
  return new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${month}-01T12:00:00Z`))
}

// The current API contract only supports page/limit. Traverse every page so
// filtering does not silently omit matching orders beyond the first page.
export async function getOrdersForMonth(
  fetchPage: (page: number, limit: number) => Promise<ApiListResponse<Order>>,
  month: string
): Promise<Order[]> {
  if (!parseOrderMonth(month)) throw new Error('Invalid order month')
  return getOrdersForExport(fetchPage, month)
}

export async function getOrdersForExport(
  fetchPage: (page: number, limit: number) => Promise<ApiListResponse<Order>>,
  month: string | null
): Promise<Order[]> {
  if (month !== null && !parseOrderMonth(month)) throw new Error('Invalid order month')
  const matches = new Map<string, Order>()
  let page = 1
  let limit = 100
  let totalPages = 1
  do {
    const response = await fetchPage(page, limit)
    const pagination = response.pagination
    if (pagination.page !== page || !Number.isInteger(pagination.limit) || pagination.limit < 1 ||
      !Number.isInteger(pagination.total) || pagination.total < 0) {
      throw new Error('Invalid order pagination')
    }
    limit = pagination.limit
    totalPages = Math.ceil(pagination.total / limit)
    if (page < totalPages && response.data.length === 0) throw new Error('Incomplete order page')
    for (const order of response.data) {
      if (!month || orderMatchesMonth(order, month)) matches.set(order.id, order)
    }
    page += 1
  } while (page <= totalPages)
  return [...matches.values()].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}
