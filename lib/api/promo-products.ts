export type PromoProduct = {
  id: string
  store_product_id: string
  slug: string
  name: string
  image_url: string | null
  price: string | null
  regular_price: string | null
  currency: string
  product_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Producto tal como lo devuelve la API de la tienda (/api/products/related).
export type StoreProduct = {
  id: string
  slug: string
  name: string
  image: string | null
  currency: string
  price: string | null
  regular_price: string | null
  on_sale: boolean
  category: string | null
  url: string
}

export function formatPrice(amount: string | null, currency: string): string | null {
  if (!amount) return null
  const value = Number(amount)
  if (!Number.isFinite(value)) return null
  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(value) ? 0 : 2
    }).format(value)
  } catch {
    return `$${value} ${currency}`
  }
}
