import type { Order } from '@/lib/api/contracts'

export type OrderKind = 'test' | 'real' | 'unverified'

function amount(value: unknown): number | null {
  if (typeof value !== 'string' || !/^\d+(\.\d+)?$/.test(value.trim())) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function classifyOrder(order: Order): { kind: OrderKind; coupon: string | null } {
  const metadataCoupon = order.metadata?.coupon
  const candidates = [
    order.coupon_code,
    order.metadata?.coupon_code,
    typeof metadataCoupon === 'object' && metadataCoupon !== null && 'code' in metadataCoupon
      ? metadataCoupon.code : metadataCoupon
  ]
  const coupon = candidates.find((value): value is string => typeof value === 'string' && !!value.trim())?.trim() ?? null
  const subtotal = amount(order.subtotal_amount)
  const discount = amount(order.discount_amount)

  // A zero total alone is not evidence of a test (free products and gifts exist).
  if (subtotal === null || discount === null || discount > subtotal) return { kind: 'unverified', coupon }
  if (subtotal === 0 || discount < subtotal) return { kind: 'real', coupon }
  if (!coupon) return { kind: 'unverified', coupon }

  const normalized = coupon.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  return { kind: /test|prueba/.test(normalized) ? 'test' : 'real', coupon }
}
