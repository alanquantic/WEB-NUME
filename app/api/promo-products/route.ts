import { NextResponse } from 'next/server'

import type { PromoProduct } from '@/lib/api/promo-products'
import { API_BASE_URL } from '@/lib/auth/session'

// Lista pública (y cacheada) de productos activos para el tooltip flotante.
// Se consume desde el cliente para no volver dinámicas las páginas SSG.
export const revalidate = 60

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/promo-products?active_only=true`, {
      next: { revalidate: 60, tags: ['promo-products'] }
    })
    if (!res.ok) return NextResponse.json({ data: [] })
    const json = (await res.json()) as { data?: PromoProduct[] }
    const data = (json.data ?? []).map((product) => ({
      id: product.id,
      name: product.name,
      image_url: product.image_url,
      price: product.price,
      regular_price: product.regular_price,
      currency: product.currency,
      product_url: product.product_url,
      product_type: product.product_type ?? null
    }))
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ data: [] })
  }
}
