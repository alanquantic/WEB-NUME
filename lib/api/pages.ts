import type {
  ApiListResponse,
  ContentDetailResponse,
  ContentItem,
  PostStatus
} from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

export type GetPagesParams = {
  page?: number
  limit?: number
  search?: string
  category_id?: number
  tag_id?: number
  status?: PostStatus
}

export async function getPages(params: GetPagesParams = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value))
  })

  return serverApiFetch<ApiListResponse<ContentItem>>(
    `/pages${query.toString() ? `?${query.toString()}` : ''}`,
    {
      next: { tags: ['pages'] }
    }
  )
}

export async function getPageById(id: string) {
  // La API devuelve el detalle envuelto en `{ item }`; lo desanidamos.
  const response = await serverApiFetch<ContentDetailResponse>(`/pages/${id}`, {
    next: { tags: [`page:${id}`] }
  })
  return response.item
}

