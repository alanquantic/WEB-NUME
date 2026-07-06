import type { Pagination } from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

// Espeja la salida de GET /search del API (search.service.ts):
// full-text en posts/pages publicados. `excerpt` es un recorte crudo de HTML.
export type SearchResultItem = {
  id: number
  type: 'post' | 'page'
  title: string
  slug: string
  status: string
  requires_membership: boolean
  published_at: string | null
  created_at: string
  rank: number
  excerpt: string | null
}

export type SearchResponse = {
  data: SearchResultItem[]
  pagination: Pagination
}

export type SearchParams = {
  query: string
  type?: 'post' | 'page'
  page?: number
  limit?: number
}

export async function searchContent(params: SearchParams) {
  const query = new URLSearchParams()
  query.set('query', params.query)
  if (params.type) query.set('type', params.type)
  if (params.page) query.set('page', String(params.page))
  if (params.limit) query.set('limit', String(params.limit))

  return serverApiFetch<SearchResponse>(`/search?${query.toString()}`)
}
