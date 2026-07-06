import type { ApiListResponse, ConsultantDirectoryItem } from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

export type GetConsultantsParams = {
  page?: number
  limit?: number
  search?: string
  consultant_category?: string
  nationality?: string
  tier?: string
}

export async function getConsultants(params: GetConsultantsParams = {}) {
  const query = new URLSearchParams()
  query.set('page', String(params.page ?? 1))
  query.set('limit', String(params.limit ?? 12))
  if (params.search) query.set('search', params.search)
  if (params.consultant_category) query.set('consultant_category', params.consultant_category)
  if (params.nationality) query.set('nationality', params.nationality)
  if (params.tier) query.set('tier', params.tier)

  return serverApiFetch<ApiListResponse<ConsultantDirectoryItem>>(
    `/directory/consultants?${query.toString()}`,
    { next: { tags: ['directory'] } }
  )
}

export async function getConsultantById(id: string): Promise<ConsultantDirectoryItem> {
  // La API responde { consultant: {...} }; lo desanidamos.
  const response = await serverApiFetch<{ consultant: ConsultantDirectoryItem }>(
    `/directory/consultants/${id}`,
    { next: { tags: [`consultant:${id}`] } }
  )
  return response.consultant
}
