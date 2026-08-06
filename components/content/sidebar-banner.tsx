import { listBanners } from '@/lib/api/banners'

export async function SidebarBanner() {
  let banners: Awaited<ReturnType<typeof listBanners>>['data'] = []
  try {
    const res = await listBanners({ activeOnly: true })
    banners = res.data
  } catch {
    return null
  }

  if (banners.length === 0) return null

  const banner =
    banners.length === 1
      ? banners[0]
      : banners[Math.floor(Math.random() * banners.length)]

  const inner = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={banner.image_url}
      alt=""
      className="w-full object-cover"
    />
  )

  return (
    <section
      aria-label="Banner"
      className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-panel"
    >
      {banner.link_url ? (
        <a
          href={banner.link_url}
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
