import { FacebookIcon, LinkedinIcon, XIcon } from '@/components/ui/icons'

const SITE_URL = 'https://www.numerologia-cotidiana.com'

type Props = {
  slug: string
  title: string
}

export function ShareButtons({ slug, title }: Props) {
  const url = `${SITE_URL}/blog/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
      hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]'
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
      hoverClass: 'hover:bg-black hover:text-white hover:border-black'
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: LinkedinIcon,
      hoverClass: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]'
    }
  ] as const

  return (
    <div className="flex items-center gap-3" aria-label="Compartir en redes sociales">
      <span className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
        Compartir
      </span>
      <div className="flex items-center gap-2">
        {targets.map(({ name, href, icon: Icon, hoverClass }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${name}`}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition ${hoverClass}`}
          >
            <Icon width={16} height={16} />
          </a>
        ))}
      </div>
    </div>
  )
}
