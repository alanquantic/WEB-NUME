// Tipo que se muestra como etiqueta en "Laura te recomienda". Mismos valores
// que acepta la API (columna promo_products.product_type).
export const PROMO_PRODUCT_TYPES = [
  'reporte',
  'reporte_ia',
  'membresia',
  'agenda',
  'curso',
  'certificacion',
  'software',
  'otro'
] as const

export type PromoProductType = (typeof PROMO_PRODUCT_TYPES)[number]

export const PROMO_PRODUCT_TYPE_LABELS: Record<PromoProductType, string> = {
  reporte: 'Reporte numerológico',
  reporte_ia: 'Reporte con IA',
  membresia: 'Membresía',
  agenda: 'Agenda',
  curso: 'Curso / taller',
  certificacion: 'Certificación',
  software: 'Software',
  otro: 'Producto'
}

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
  product_type: PromoProductType | null
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

export function isPromoProductType(value: unknown): value is PromoProductType {
  return typeof value === 'string' && (PROMO_PRODUCT_TYPES as readonly string[]).includes(value)
}

/**
 * Deduce el tipo a partir de la categoría de la tienda y del nombre. Se usa
 * para preseleccionarlo en el admin y como respaldo en el tooltip mientras el
 * producto no tenga un tipo guardado. La tienda no distingue los reportes con
 * IA, así que solo se detectan si el nombre lo dice; el admin puede corregirlo.
 */
export function inferPromoProductType(name: string, category?: string | null): PromoProductType {
  const text = `${category ?? ''} ${name}`.toLowerCase()
  if (/\bia\b|inteligencia artificial/.test(text)) return 'reporte_ia'
  if (/membres/.test(text)) return 'membresia'
  if (/certificaci|m[oó]dulo/.test(text)) return 'certificacion'
  if (/licencia|software/.test(text)) return 'software'
  if (/agenda|planeador/.test(text)) return 'agenda'
  if (/curso|taller/.test(text)) return 'curso'
  if (/reporte/.test(text)) return 'reporte'
  return 'otro'
}

/** Etiqueta visible del tipo; null cuando no aporta nada ("otro"). */
export function promoProductTypeLabel(
  product: Pick<PromoProduct, 'name' | 'product_type'>
): string | null {
  const type = product.product_type ?? inferPromoProductType(product.name)
  return type === 'otro' ? null : PROMO_PRODUCT_TYPE_LABELS[type]
}
