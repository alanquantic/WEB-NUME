import type { ApiListResponse, Category, Tag } from '@/lib/api/contracts'
import { serverApiFetch } from '@/lib/api/server'

export async function getCategories(page = 1, limit = 20, search = '') {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })

  if (search) query.set('search', search)

  return serverApiFetch<ApiListResponse<Category>>(`/categories?${query.toString()}`, {
    next: { tags: ['categories'] }
  })
}

export async function getTags(page = 1, limit = 20, search = '') {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })

  if (search) query.set('search', search)

  return serverApiFetch<ApiListResponse<Tag>>(`/tags?${query.toString()}`, {
    next: { tags: ['tags'] }
  })
}

