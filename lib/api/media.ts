'use client'

import type { MediaLibraryResponse, MediaUploadSignatureResponse } from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'

export async function getMediaImages(cursor?: string, limit = 24) {
  const query = new URLSearchParams({ limit: String(limit) })

  if (cursor) {
    query.set('cursor', cursor)
  }

  return clientApiFetch<MediaLibraryResponse>(`/media/images?${query.toString()}`)
}

export async function createMediaUploadSignature(filename: string) {
  return clientApiFetch<MediaUploadSignatureResponse>('/media/images/sign', {
    method: 'POST',
    body: JSON.stringify({ filename })
  })
}
