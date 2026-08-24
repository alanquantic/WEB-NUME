import { serverApiFetch } from '@/lib/api/server'

export type BannerPlacement = 'top' | 'sidebar'

export type Banner = {
  id: string
  placement: BannerPlacement
  image_url: string
  link_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

type ListBannersResponse = {
  data: Banner[]
}

export async function listBanners(options: { activeOnly?: boolean; placement?: BannerPlacement } = {}) {
  const query = new URLSearchParams()
  if (options.activeOnly) query.set('active_only', 'true')
  if (options.placement) query.set('placement', options.placement)
  const suffix = query.toString() ? `?${query.toString()}` : ''
  return serverApiFetch<ListBannersResponse>(`/banners${suffix}`, {
    cache: 'no-store'
  })
}
