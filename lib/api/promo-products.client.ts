'use client'

import { clientApiFetch } from '@/lib/api/client'
import {
  inferPromoProductType,
  type PromoProduct,
  type PromoProductType,
  type StoreProduct
} from '@/lib/api/promo-products'
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

// `productType` solo se manda al agregar: al pulsar "Actualizar" se omite para
// conservar el tipo que el admin eligió.
export async function addPromoProduct(product: StoreProduct, options: { isNew: boolean }) {
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
      ...(options.isNew
        ? { product_type: inferPromoProductType(product.name, product.category) }
        : {}),
      is_active: true
    })
  })
}

export async function updatePromoProduct(
  id: string,
  input: { is_active?: boolean; product_type?: PromoProductType | null }
) {
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
