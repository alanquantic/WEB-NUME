'use client'

import type {
  MediaImageItem,
  MediaLibraryResponse,
  MediaUploadSignatureResponse
} from '@/lib/api/contracts'
import { clientApiFetch } from '@/lib/api/client'

// Mismos formatos que acepta la API; sin SVG porque el bucket se sirve público.
export const MEDIA_IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/avif'

export async function getMediaImages(cursor?: string, limit = 24) {
  const query = new URLSearchParams({ limit: String(limit) })

  if (cursor) {
    query.set('cursor', cursor)
  }

  return clientApiFetch<MediaLibraryResponse>(`/media/images?${query.toString()}`)
}

export async function createMediaUploadSignature(file: File) {
  return clientApiFetch<MediaUploadSignatureResponse>('/media/images/sign', {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, content_type: file.type, bytes: file.size })
  })
}

// Sube directo a R2 con la URL firmada por la API; el archivo no pasa por el BFF.
export async function uploadMediaImage(file: File): Promise<MediaImageItem> {
  const signed = await createMediaUploadSignature(file)
  const response = await fetch(signed.upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': signed.content_type },
    body: file
  })

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`)
  }

  return {
    id: signed.key,
    public_id: signed.key,
    url: signed.public_url,
    width: null,
    height: null,
    bytes: file.size,
    format: signed.key.split('.').pop() ?? null,
    original_filename: file.name,
    created_at: new Date().toISOString()
  }
}
