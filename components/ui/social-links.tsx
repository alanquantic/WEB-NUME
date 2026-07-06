import type { SVGProps } from 'react'

import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon
} from '@/components/ui/icons'
import { SOCIAL_LINKS, type SocialId } from '@/lib/site-config'

const ICONS: Record<SocialId, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon
}

type SocialLinksProps = {
  className?: string
  itemClassName?: string
  iconSize?: number
}

export function SocialLinks({
  className,
  itemClassName,
  iconSize = 18
}: SocialLinksProps) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map(({ id, label, href }) => {
        const Icon = ICONS[id]
        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={itemClassName}
            >
              <Icon width={iconSize} height={iconSize} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
