import Image from 'next/image'

import { listBanners } from '@/lib/api/banners'
import { isOptimizableImage } from '@/lib/images'
import { safeHref } from '@/lib/safe-url'

export async function TopBanner() {
  let banners: Awaited<ReturnType<typeof listBanners>>['data'] = []
  try {
    const res = await listBanners({ activeOnly: true, placement: 'top' })
    banners = res.data
  } catch {
    return null
  }

  if (banners.length === 0) return null

  const banner =
    banners.length === 1
      ? banners[0]
      : banners[Math.floor(Math.random() * banners.length)]
  const linkHref = safeHref(banner.link_url)
  // Con link, la imagen es el único contenido del enlace: el alt no puede ir vacío.
  const alt = banner.alt_text?.trim() || (linkHref ? 'Banner promocional' : '')

  const inner = (
    <Image
      src={banner.image_url}
      alt={alt}
      fill
      sizes="(min-width: 1280px) 1232px, 100vw"
      unoptimized={!isOptimizableImage(banner.image_url)}
      className="block object-cover object-center"
    />
  )

  return (
    <section
      aria-label="Banner superior"
      className="relative aspect-[1920/600] w-full overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-panel"
    >
      {linkHref ? (
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 block"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </section>
  )
}
