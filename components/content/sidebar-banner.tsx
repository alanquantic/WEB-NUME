import { listBanners } from '@/lib/api/banners'
import { safeHref } from '@/lib/safe-url'

export async function SidebarBanner() {
  let banners: Awaited<ReturnType<typeof listBanners>>['data'] = []
  try {
    const res = await listBanners({ activeOnly: true, placement: 'sidebar' })
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

  const inner = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={banner.image_url}
      alt=""
      className="h-auto w-full object-contain"
    />
  )

  return (
    <section
      aria-label="Banner"
      className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-panel"
    >
      {linkHref ? (
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </section>
  )
}
