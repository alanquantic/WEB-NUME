'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { track } from '@/lib/analytics'

type OutboundLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  // Contexto opcional que se agrega como select_promotion (para audiencias).
  promotionId?: string
  promotionName?: string
  creativeSlot?: string
}

// Enlace externo que dispara outbound_click en GA4 y, si se pasan datos de
// promo, también select_promotion. Sirve para trackear clicks a la tienda
// externa (tienda-nume-chi.vercel.app) desde este sitio.
export function OutboundLink({
  href,
  children,
  promotionId,
  promotionName,
  creativeSlot,
  onClick,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...rest
}: OutboundLinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    try {
      const url = new URL(href, typeof window !== 'undefined' ? window.location.href : undefined)
      const text = typeof children === 'string' ? children : rest['aria-label']
      track('outbound_click', {
        link_url: href,
        link_domain: url.hostname,
        link_text: typeof text === 'string' ? text : undefined
      })
      if (promotionId || promotionName || creativeSlot) {
        track('select_promotion', {
          promotion_id: promotionId,
          promotion_name: promotionName,
          creative_slot: creativeSlot,
          location_id: typeof window !== 'undefined' ? window.location.pathname : undefined
        })
      }
    } catch {
      // no romper la navegación si algo falla al construir la URL
    }
    onClick?.(event)
  }

  return (
    <a href={href} target={target} rel={rel} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
