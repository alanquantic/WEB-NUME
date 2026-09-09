'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { track } from '@/lib/analytics'
import banner1 from '@/public/images/slider/1.png'
import banner2 from '@/public/images/slider/2.png'
import banner3 from '@/public/images/slider/3.png'

type Banner = {
  src: StaticImageData
  href: string
  alt: string
}

// Banners 1920x600 de public/images/slider. El orden define el orden del slider.
const BANNERS: Banner[] = [
  {
    src: banner1,
    href: 'https://tienda-nume-chi.vercel.app/productos/libro-numerologia-cotidiana',
    alt: 'Nuevo libro Numerología Cotidiana, edición limitada: un libro para reconectar con la sabiduría de los números'
  },
  {
    src: banner2,
    href: 'https://tienda-nume-chi.vercel.app/productos/taller-numerologia-de-parejas',
    alt: 'Taller online Numerología de Parejas: ¿qué tipo de relación estás construyendo?'
  },
  {
    src: banner3,
    href: 'https://tienda-nume-chi.vercel.app/productos/numerathum-oraculo-365-agenda-numerologica-2026-digital-pdf',
    alt: 'Numerathum, mi brújula del tiempo: planeador numerológico 2026 en plataforma digital'
  }
]

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD_PX = 40

/**
 * Slider full-width de banners del home. Avanza solo cada 5 s y se detiene
 * mientras el cursor está encima, al enfocar un control o al tocar en móvil.
 * Respeta prefers-reduced-motion (sin autoplay) y permite swipe táctil.
 */
export function HeroBannerSlider() {
  const total = BANNERS.length
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
    (target: number) => setIndex(((target % total) + total) % total),
    [total]
  )

  useEffect(() => {
    if (isPaused || reducedMotion || total < 2) return
    const id = window.setInterval(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [isPaused, reducedMotion, total])

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
        {BANNERS.map((banner, position) => {
          const isActive = position === index
          const promoId = `hero_banner_${position + 1}`
          return (
            <a
              key={banner.href}
              href={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${banner.alt} (abre la tienda en una pestaña nueva)`}
              className="block w-full shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/60"
              onClick={() => {
                try {
                  const url = new URL(banner.href)
                  track('outbound_click', {
                    link_url: banner.href,
                    link_domain: url.hostname,
                    link_text: banner.alt
                  })
                  track('select_promotion', {
                    promotion_id: promoId,
                    promotion_name: banner.alt,
                    creative_slot: 'home_hero_slider'
                  })
                } catch {}
              }}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                sizes="100vw"
                priority={position === 0}
                draggable={false}
                className="h-auto w-full select-none"
              />
            </a>
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
            {BANNERS.map((banner, position) => {
              const isActive = position === index
              return (
                <button
                  key={banner.href}
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
