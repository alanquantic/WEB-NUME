export type RelatedProduct = {
  id: string
  slug: string
  name: string
  description: string | null
  image: string | null
  currency: string
  price: string | null
  category: string | null
  url: string
}

type RelatedProductsResponse = {
  data: RelatedProduct[]
}

const STORE_API_URL = (
  process.env.STORE_API_URL ?? 'https://tienda.numerologia-cotidiana.com'
).replace(/\/$/, '')

export async function getRelatedProducts(params: {
  categories?: string[]
  limit?: number
  exclude?: string
}): Promise<RelatedProduct[]> {
  const query = new URLSearchParams()
  for (const category of params.categories ?? []) {
    if (category.trim()) query.append('category', category.trim())
  }
  if (params.limit) query.set('limit', String(params.limit))
  if (params.exclude) query.set('exclude', params.exclude)

  try {
    const res = await fetch(
      `${STORE_API_URL}/api/products/related?${query.toString()}`,
      { next: { revalidate: 300, tags: ['related-products'] } }
    )
    if (!res.ok) return []
    const json = (await res.json()) as RelatedProductsResponse
    return json.data ?? []
  } catch {
    return []
  }
}
