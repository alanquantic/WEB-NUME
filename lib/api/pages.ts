import { cookies } from 'next/headers'

import type {
  ApiListResponse,
  ContentDetailResponse,
  ContentItem,
  PostStatus
} from '@/lib/api/contracts'
import { ApiError } from '@/lib/api/errors'
import { serverApiFetch } from '@/lib/api/server'
import { PAGE_ACCESS_COOKIE } from '@/lib/auth/cookies'

// Debe coincidir con PAGE_PASSWORD_REQUIRED de la API (content.service.ts).
const PAGE_PASSWORD_REQUIRED = 'Password required to access this page'

export function isPagePasswordRequired(error: unknown): boolean {
  return (
    error instanceof ApiError &&
    error.status === 403 &&
    error.problem.detail === PAGE_PASSWORD_REQUIRED
  )
}

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
  const pageAccess = cookies().get(PAGE_ACCESS_COOKIE)?.value
  const response = await serverApiFetch<ContentDetailResponse>(`/pages/${id}`, {
    next: { tags: [`page:${id}`] },
    headers: pageAccess ? { 'x-page-access': pageAccess } : undefined
  })
  return response.item
}

