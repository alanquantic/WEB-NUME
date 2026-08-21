'use client'

import { clientApiFetch } from '@/lib/api/client'
import type { Banner, BannerPlacement } from '@/lib/api/banners'

type ListResponse = { data: Banner[] }

export async function listBannersClient() {
  return clientApiFetch<ListResponse>('/banners')
}

export async function createBanner(input: {
  placement?: BannerPlacement
  image_url: string
  link_url?: string | null
  is_active?: boolean
}) {
  return clientApiFetch<Banner>('/banners', {
    method: 'POST',
    body: JSON.stringify(input)
  })
}

export async function updateBanner(
  id: string,
  input: Partial<{
    placement: BannerPlacement
    image_url: string
    link_url: string | null
    is_active: boolean
  }>
) {
  return clientApiFetch<Banner>(`/banners/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input)
  })
}

export async function deleteBanner(id: string) {
  return clientApiFetch<void>(`/banners/${id}`, {
    method: 'DELETE'
  })
}
