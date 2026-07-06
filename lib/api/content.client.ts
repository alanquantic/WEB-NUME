'use client'

import type { ContentDetailResponse, ContentMutationInput } from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'

// Endpoints CRUD compartidos por posts y pages sobre la tabla `posts`.
export type ContentKind = 'posts' | 'pages'

export async function createContent(
  kind: ContentKind,
  payload: ContentMutationInput
): Promise<ContentDetailResponse> {
  return clientApiFetch<ContentDetailResponse>(`/${kind}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function updateContent(
  kind: ContentKind,
  id: string,
  payload: ContentMutationInput
): Promise<ContentDetailResponse> {
  return clientApiFetch<ContentDetailResponse>(`/${kind}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  })
}

export async function deleteContent(kind: ContentKind, id: string): Promise<void> {
  await clientApiFetch<void>(`/${kind}/${id}`, {
    method: 'DELETE'
  })
}
