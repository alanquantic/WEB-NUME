import { describe, expect, it, vi } from 'vitest'
import type { Order } from '@/lib/api/contracts'
import { getOrdersForMonth, orderMatchesMonth, parseOrderMonth } from '@/lib/orders/month'

const order = (id: string, created_at: string, paid_at = created_at) => ({ id, created_at, paid_at } as Order)

describe('monthly order filter', () => {
  it('validates year and month from the URL', () => {
    expect(parseOrderMonth('2026-10')).toBe('2026-10')
    for (const value of [undefined, '', '2026-00', '2026-13', '2026-1', '0000-01', ['2026-10'], '2026-10-01']) {
      expect(parseOrderMonth(value)).toBeNull()
    }
  })

  it('uses creation date and Mexico City boundaries, including December rollover', () => {
    expect(orderMatchesMonth(order('1', '2026-11-01T05:59:59Z'), '2026-10')).toBe(true)
    expect(orderMatchesMonth(order('2', '2026-11-01T06:00:00Z'), '2026-10')).toBe(false)
    expect(orderMatchesMonth(order('3', '2026-10-01T05:59:59Z'), '2026-10')).toBe(false)
    expect(orderMatchesMonth(order('4', '2027-01-01T05:59:59Z'), '2026-12')).toBe(true)
    expect(orderMatchesMonth(order('5', '2026-10-05T12:00:00Z', '2026-11-05T12:00:00Z'), '2026-10')).toBe(true)
    expect(orderMatchesMonth(order('6', 'invalid'), '2026-10')).toBe(false)
  })

  it('retrieves matches beyond the first page and respects the backend page limit', async () => {
    const fetchPage = vi.fn()
      .mockResolvedValueOnce({ data: [order('1', '2026-11-02T12:00:00Z')], pagination: { page: 1, limit: 1, total: 3 } })
      .mockResolvedValueOnce({ data: [order('2', '2026-10-02T12:00:00Z')], pagination: { page: 2, limit: 1, total: 3 } })
      .mockResolvedValueOnce({ data: [order('3', '2026-10-03T12:00:00Z')], pagination: { page: 3, limit: 1, total: 3 } })
    expect((await getOrdersForMonth(fetchPage, '2026-10')).map(item => item.id)).toEqual(['3', '2'])
    expect(fetchPage.mock.calls).toEqual([[1, 100], [2, 1], [3, 1]])
  })

  it('handles an empty history without extra requests', async () => {
    const fetchPage = vi.fn().mockResolvedValue({ data: [], pagination: { page: 1, limit: 100, total: 0 } })
    expect(await getOrdersForMonth(fetchPage, '2026-10')).toEqual([])
    expect(fetchPage).toHaveBeenCalledTimes(1)
  })

  it('fails instead of presenting partial results when a later page fails', async () => {
    const fetchPage = vi.fn()
      .mockResolvedValueOnce({ data: [order('1', '2026-10-02T12:00:00Z')], pagination: { page: 1, limit: 1, total: 2 } })
      .mockRejectedValueOnce(new Error('offline'))
    await expect(getOrdersForMonth(fetchPage, '2026-10')).rejects.toThrow('offline')
  })

  it('rejects broken pagination instead of looping indefinitely', async () => {
    const fetchPage = vi.fn().mockResolvedValue({ data: [], pagination: { page: 1, limit: 0, total: 20 } })
    await expect(getOrdersForMonth(fetchPage, '2026-10')).rejects.toThrow('Invalid order pagination')
  })
})
