import { describe, expect, it } from 'vitest'
import type { Order } from '@/lib/api/contracts'
import { classifyOrder } from '@/lib/orders/kind'

const order = {
  subtotal_amount: '100.00', discount_amount: '100.00', total_amount: '0.00', metadata: {}
} as Order

describe('test order classification', () => {
  it.each(['TEST100', 'pruebas', 'NUME-test', ' PRUEBA-100 ', 'PrUeBaS2026'])('marks a full discount with coupon %s as a test', coupon_code => {
    expect(classifyOrder({ ...order, coupon_code }).kind).toBe('test')
  })

  it('keeps ordinary gifts, partial discounts and purchases as real orders', () => {
    expect(classifyOrder({ ...order, coupon_code: 'REGALO100' }).kind).toBe('real')
    expect(classifyOrder({ ...order, coupon_code: 'TEST50', discount_amount: '50' }).kind).toBe('real')
    expect(classifyOrder({ ...order, discount_amount: '0', total_amount: '100' }).kind).toBe('real')
    expect(classifyOrder({ ...order, subtotal_amount: '0', discount_amount: '0' }).kind).toBe('real')
  })

  it('does not treat a zero total or missing coupon as proof of a test', () => {
    expect(classifyOrder(order).kind).toBe('unverified')
    expect(classifyOrder({ ...order, coupon_code: '  ' }).kind).toBe('unverified')
  })

  it.each(['', 'invalid', '-100', 'Infinity', '200'])('leaves invalid discounts %s unverified', discount_amount => {
    expect(classifyOrder({ ...order, coupon_code: 'TEST', discount_amount }).kind).toBe('unverified')
  })

  it('supports metadata and gives the explicit coupon code precedence', () => {
    expect(classifyOrder({ ...order, metadata: { coupon_code: 'TEST' } }).kind).toBe('test')
    expect(classifyOrder({ ...order, metadata: { coupon: { code: 'PRUEBAS' } } }).kind).toBe('test')
    expect(classifyOrder({ ...order, metadata: { coupon: 'TEST100' } }).kind).toBe('test')
    expect(classifyOrder({ ...order, coupon_code: 'REGALO', metadata: { coupon_code: 'TEST' } }).kind).toBe('real')
  })
})
