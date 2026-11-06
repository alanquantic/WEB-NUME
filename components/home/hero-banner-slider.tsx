'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { track } from '@/lib/analytics'

export type HeroBanner = {
  src: string
  href: string | null
  alt: string
}

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD_PX = 40

/**
 * Slider full-width de banners del home. Avanza solo cada 5 s y se detiene
 * mientras el cursor está encima, al enfocar un control o al tocar en móvil.
 * Respeta prefers-reduced-motion (sin autoplay) y permite swipe táctil.
 */
export function HeroBannerSlider({ banners }: { banners: HeroBanner[] }) {
  const total = banners.length
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  const goTo = useCallback(
    (target: number) => {
      if (total === 0) return
      setIndex(((target % total) + total) % total)
    },
    [total]
  )

  useEffect(() => {
    if (isPaused || reducedMotion || total < 2) return
    const id = window.setInterval(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [isPaused, reducedMotion, total])

  if (total === 0) return null

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
    setIsPaused(true)
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current
    touchStartX.current = null
    setIsPaused(false)
    if (startX === null) return
    const deltaX = (event.changedTouches[0]?.clientX ?? startX) - startX
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return
    goTo(deltaX < 0 ? index + 1 : index - 1)
  }

  function handleSlideClick(banner: HeroBanner, position: number) {
    if (!banner.href) return
    try {
      const url = new URL(banner.href)
      track('outbound_click', {
        link_url: banner.href,
        link_domain: url.hostname,
        link_text: banner.alt
      })
      track('select_promotion', {
        promotion_id: `hero_banner_${position + 1}`,
        promotion_name: banner.alt,
        creative_slot: 'home_hero_slider'
      })
    } catch {}
  }

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Novedades de la tienda"
      className="group relative w-full overflow-hidden bg-[hsl(var(--primary)/0.06)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null
        setIsPaused(false)
      }}
    >
      <div
        className={`flex ${reducedMotion ? '' : 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-live={isPaused ? 'polite' : 'off'}
      >
        {banners.map((banner, position) => {
          const isActive = position === index
          const key = `${banner.src}-${position}`
          /* eslint-disable @next/next/no-img-element */
          const img = (
            <img
              src={banner.src}
              alt={banner.alt}
              draggable={false}
              loading={position === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 block h-full w-full select-none object-cover object-center"
            />
          )
          /* eslint-enable @next/next/no-img-element */
          if (banner.href) {
            return (
              <a
                key={key}
                href={banner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                aria-label={`${banner.alt} (abre la tienda en una pestaña nueva)`}
                className="relative block aspect-[1920/600] w-full shrink-0 overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/60"
                onClick={() => handleSlideClick(banner, position)}
              >
                {img}
              </a>
            )
          }
          return (
            <div
              key={key}
              aria-hidden={!isActive}
              className="relative aspect-[1920/600] w-full shrink-0 overflow-hidden"
            >
              {img}
            </div>
          )
        })}
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Banner anterior"
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[hsl(263_35%_18%)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-white sm:flex lg:left-6"
          >
            <ChevronLeft size={22} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Banner siguiente"
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[hsl(263_35%_18%)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur transition hover:bg-white sm:flex lg:right-6"
          >
            <ChevronRight size={22} aria-hidden />
          </button>

          <div
            role="tablist"
            aria-label="Elegir banner"
            className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-2 py-1 backdrop-blur-sm sm:bottom-4 sm:gap-2 sm:px-2.5 sm:py-1.5"
          >
            {banners.map((banner, position) => {
              const isActive = position === index
              return (
                <button
                  key={`${banner.src}-${position}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Ir al banner ${position + 1}`}
                  onClick={() => goTo(position)}
                  className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                    isActive ? 'w-5 bg-white sm:w-7' : 'w-1.5 bg-white/55 hover:bg-white/80 sm:w-2'
                  }`}
                />
              )
            })}
          </div>
        </>
      ) : null}
    </section>
  )
}
