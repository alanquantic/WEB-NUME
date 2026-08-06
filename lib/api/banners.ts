import { serverApiFetch } from '@/lib/api/server'

export type Banner = {
  id: string
  image_url: string
  link_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

type ListBannersResponse = {
  data: Banner[]
}

export async function listBanners(options: { activeOnly?: boolean } = {}) {
  const query = new URLSearchParams()
  if (options.activeOnly) query.set('active_only', 'true')
  const suffix = query.toString() ? `?${query.toString()}` : ''
  return serverApiFetch<ListBannersResponse>(`/banners${suffix}`, {
    cache: 'no-store'
  })
}
