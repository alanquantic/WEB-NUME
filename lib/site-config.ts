export const STORE_URL = 'https://tienda.numerologia-cotidiana.com/'

export type SocialId = 'facebook' | 'instagram' | 'youtube' | 'tiktok'

export type SocialLink = {
  id: SocialId
  label: string
  href: string
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/NumerologiaCotidiana'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/numerologia_cotidiana/'
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCLpxV1bxOgtQ6ADN9Xkn5rg'
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@lanumerologiadelaura'
  }
] as const
