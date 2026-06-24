import type { ApiListResponse, ConsultantDirectoryItem } from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

export async function getConsultants(page = 1, limit = 12, search = '') {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })

  if (search) query.set('search', search)

  return serverApiFetch<ApiListResponse<ConsultantDirectoryItem>>(
    `/directory/consultants?${query.toString()}`,
    {
      next: { tags: ['directory'] }
    }
  )
}

export async function getConsultantById(id: string) {
  return serverApiFetch<ConsultantDirectoryItem>(`/directory/consultants/${id}`, {
    next: { tags: [`consultant:${id}`] }
  })
}

