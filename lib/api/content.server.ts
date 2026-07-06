import type {
  AdminContentDetail,
  AdminContentListItem,
  ApiListResponse,
  ContentDetailResponse,
  PostStatus
} from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'
import type { ContentKind } from '@/lib/api/content.client'

export type AdminContentListParams = {
  page?: number
  limit?: number
  search?: string
  status?: PostStatus
}

// Lista para el panel admin. Con sesión admin la API devuelve también drafts,
// scheduled y archived (no solo published).
export async function getAdminContentList(
  kind: ContentKind,
  params: AdminContentListParams = {}
): Promise<ApiListResponse<AdminContentListItem>> {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value))
  })

  const qs = query.toString()
  return serverApiFetch<ApiListResponse<AdminContentListItem>>(
    `/${kind}${qs ? `?${qs}` : ''}`,
    { cache: 'no-store' }
  )
}

// Detalle para edición. La API responde `{ item: {...} }`, así que lo desanidamos.
export async function getAdminContentDetail(
  kind: ContentKind,
  id: string
): Promise<AdminContentDetail> {
  const response = await serverApiFetch<ContentDetailResponse>(`/${kind}/${id}`, {
    cache: 'no-store'
  })
  return response.item
}
