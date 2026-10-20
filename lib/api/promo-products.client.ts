'use client'

import { clientApiFetch } from '@/lib/api/client'
import type { PromoProduct, StoreProduct } from '@/lib/api/promo-products'
import { apiRoute } from '@/lib/api/route-url'

export async function searchStoreProducts(query: string): Promise<StoreProduct[]> {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  const response = await fetch(apiRoute(`/api/store-products?${params.toString()}`), {
    credentials: 'include'
  })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  const json = (await response.json()) as { data: StoreProduct[] }
  return json.data ?? []
}

export async function addPromoProduct(product: StoreProduct) {
  return clientApiFetch<PromoProduct>('/promo-products', {
    method: 'POST',
    body: JSON.stringify({
      store_product_id: product.id,
      slug: product.slug,
      name: product.name,
      image_url: product.image,
      price: product.price,
      regular_price: product.regular_price,
      currency: product.currency,
      product_url: product.url,
      is_active: true
    })
  })
}

export async function updatePromoProduct(id: string, input: { is_active: boolean }) {
  return clientApiFetch<PromoProduct>(`/promo-products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input)
  })
}

export async function deletePromoProduct(id: string) {
  return clientApiFetch<void>(`/promo-products/${id}`, {
    method: 'DELETE'
  })
}
