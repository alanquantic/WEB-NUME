import { describe, expect, it } from 'vitest'
import type { OrderItem } from '@/lib/api/contracts'
import { getOrderItemReportUrl } from '@/lib/orders/report'

const item: OrderItem = {
  id: 'item', order_id: 'order', plan_id: null, sku: null,
  name: 'Reporte IA', description: null, quantity: 1,
  unit_amount: '100', total_amount: '100', metadata: {}, created_at: ''
}

describe('order report links', () => {
  it('does not create a link before the report URL is supplied', () => {
    expect(getOrderItemReportUrl(item)).toBeNull()
  })

  it('accepts internal routes and preserves signed report URLs', () => {
    expect(getOrderItemReportUrl({ ...item, report_url: '/reportes/123' })).toBe('/reportes/123')
    const url = 'https://example.com/report.pdf?signature=abc%2F123&expires=123'
    expect(getOrderItemReportUrl({ ...item, metadata: { report_url: url } })).toBe(url)
  })

  it('rejects unsafe, non-web and malformed destinations', () => {
    for (const report_url of ['javascript:alert(1)', 'data:text/html,test', 'mailto:a@example.com', 'tel:123', '//example.com', '', 'invalid']) {
      expect(getOrderItemReportUrl({ ...item, report_url })).toBeNull()
    }
    expect(getOrderItemReportUrl({ ...item, metadata: { report_url: {} } })).toBeNull()
  })
})
