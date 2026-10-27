import { describe, expect, it } from 'vitest'
import type { OrderItem } from '@/lib/api/contracts'
import { formatOrderItemCost } from '@/lib/orders/costs'

const item: OrderItem = {
  id: 'item', order_id: 'order', plan_id: null, sku: null,
  name: 'Reporte IA', description: null, quantity: 1,
  unit_amount: '100', total_amount: '100', metadata: {}, created_at: ''
}

describe('internal order item costs', () => {
  it('does not treat missing or invalid costs as zero or as the sale price', () => {
    for (const token_cost of [undefined, null, '', ' ', 'invalid', -1, Infinity]) {
      expect(formatOrderItemCost({ ...item, token_cost }, 'token_cost')).toBe('No disponible')
    }
  })

  it('preserves zero and small token costs with an explicit currency', () => {
    expect(formatOrderItemCost({ ...item, token_cost: 0, cost_currency: 'USD' }, 'token_cost')).toMatch(/USD.*0\.00/)
    expect(formatOrderItemCost({ ...item, token_cost: '0.000123', cost_currency: 'USD' }, 'token_cost')).toContain('0.000123')
  })

  it('reads production costs from item metadata without adding token costs again', () => {
    expect(formatOrderItemCost({ ...item, metadata: { token_cost: 1, production_cost: 2, cost_currency: 'MXN' } }, 'production_cost')).toMatch(/MXN.*2\.00/)
  })

  it('does not assume a currency when none was supplied', () => {
    expect(formatOrderItemCost({ ...item, token_cost: 1 }, 'token_cost')).toBe('1 (moneda no especificada)')
  })
})
