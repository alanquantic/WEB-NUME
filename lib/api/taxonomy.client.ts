'use client'

import type { ApiDetailResponse, Category, Tag, UpsertTaxonomyInput } from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'

export async function createCategory(payload: UpsertTaxonomyInput) {
  return clientApiFetch<ApiDetailResponse<Category>>('/categories', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function deleteCategory(id: number): Promise<void> {
  await clientApiFetch<void>(`/categories/${id}`, { method: 'DELETE' })
}

export async function createTag(payload: UpsertTaxonomyInput) {
  return clientApiFetch<ApiDetailResponse<Tag>>('/tags', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function deleteTag(id: number): Promise<void> {
  await clientApiFetch<void>(`/tags/${id}`, { method: 'DELETE' })
}
