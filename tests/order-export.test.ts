import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Order } from '@/lib/api/contracts'
import { ordersToCsv } from '@/lib/orders/csv'

const mocks = vi.hoisted(() => ({ getServerSessionUser: vi.fn(), getAllOrders: vi.fn() }))
vi.mock('@/lib/auth/session', () => ({ getServerSessionUser: mocks.getServerSessionUser }))
vi.mock('@/lib/api/orders', () => ({ getAllOrders: mocks.getAllOrders }))
const { GET } = await import('@/app/api/admin/orders/export/route')
const makeOrder = (id: string, created_at = '2026-10-15T12:00:00Z') => ({
  id, created_at, paid_at: null, metadata: {}, status: 'paid',
  customer_email: 'test@example.com', currency: 'MXN', subtotal_amount: '100.00',
  discount_amount: '0.00', tax_amount: '0.00', total_amount: '100.00', items: []
} as unknown as Order)
const request = (query = '') => GET(new Request(`http://localhost/api/admin/orders/export${query}`))

describe('order CSV export', () => {
  beforeEach(() => {
    mocks.getServerSessionUser.mockReset().mockResolvedValue({ role: 'admin' })
    mocks.getAllOrders.mockReset()
  })
  afterEach(() => vi.restoreAllMocks())

  it.each([[null, 401], [{ role: 'reader' }, 403]])('denies access before fetching orders', async (user, status) => {
    mocks.getServerSessionUser.mockResolvedValue(user)
    expect((await request()).status).toBe(status)
    expect(mocks.getAllOrders).not.toHaveBeenCalled()
  })

  it.each(['?month=2026-13', '?month=2026-01&month=2026-02'])('rejects invalid filters %s', async query => {
    expect((await request(query)).status).toBe(400)
    expect(mocks.getAllOrders).not.toHaveBeenCalled()
  })

  it('exports all matching pages with the same Mexico City month boundaries as the list', async () => {
    mocks.getAllOrders
      .mockResolvedValueOnce({ data: [makeOrder('november', '2026-11-01T06:00:00Z')], pagination: { page: 1, limit: 1, total: 2 } })
      .mockResolvedValueOnce({ data: [makeOrder('october', '2026-11-01T05:59:59Z')], pagination: { page: 2, limit: 1, total: 2 } })
    const response = await request('?month=2026-10')
    expect(response.status).toBe(200)
    expect(response.headers.get('content-disposition')).toContain('pedidos-2026-10.csv')
    expect(response.headers.get('cache-control')).toContain('no-store')
    const csv = await response.text()
    expect(csv).toContain('october')
    expect(csv).not.toContain('november')
    expect(mocks.getAllOrders).toHaveBeenCalledTimes(2)
  })

  it('exports every page without a month filter', async () => {
    mocks.getAllOrders
      .mockResolvedValueOnce({ data: [makeOrder('first')], pagination: { page: 1, limit: 1, total: 2 } })
      .mockResolvedValueOnce({ data: [makeOrder('second', '2025-01-01T12:00:00Z')], pagination: { page: 2, limit: 1, total: 2 } })
    const response = await request()
    expect(response.headers.get('content-disposition')).toContain('pedidos-todos.csv')
    const csv = await response.text()
    expect(csv).toContain('first')
    expect(csv).toContain('second')
  })

  it('does not return a partial download on API failure', async () => {
    mocks.getAllOrders.mockRejectedValue(new Error('offline'))
    const response = await request()
    expect(response.status).toBe(503)
    expect(response.headers.has('content-disposition')).toBe(false)
  })

  it('escapes quotes, commas, newlines and spreadsheet formulas and includes UTF-8 BOM', () => {
    const order = makeOrder('id')
    order.customer_email = ' =HYPERLINK("https://example.com")'
    order.metadata = { order_number: 'Pedido, "especial"\nMéxico' }
    const csv = ordersToCsv([order])
    expect(csv.startsWith('\uFEFF')).toBe(true)
    expect(csv).toContain('"Pedido, ""especial""\nMéxico"')
    expect(csv).toContain('"\' =HYPERLINK(""https://example.com"")"')
    expect(csv).toContain('"100.00"')
    expect(ordersToCsv([]).split('\r\n')).toHaveLength(2)
  })
})
