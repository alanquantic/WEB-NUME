'use client'

import { useRef } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { RelatedProduct } from '@/lib/api/products'

function formatPrice(price: string | null, currency: string): string | null {
  if (!price) return null
  const value = Number(price)
  if (!Number.isFinite(value)) return null
  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency || 'MXN',
      maximumFractionDigits: 2
    }).format(value)
  } catch {
    return `${value.toFixed(2)} ${currency}`
  }
}

/**
 * Carrusel horizontal de productos de la tienda: scroll con snap por tarjeta
 * y flechas de navegación. Recibe los productos ya resueltos en el servidor.
 */
export function StoreProductsSlider({
  title = 'De nuestra tienda',
  subtitle,
  products
}: {
  title?: string
  subtitle?: string
  products: RelatedProduct[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  if (products.length === 0) return null

  const scrollByAmount = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section aria-label={title}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm leading-6 text-foreground/65">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Ver productos anteriores"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground/70 shadow-panel transition hover:bg-primary-soft hover:text-primary"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Ver más productos"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card text-foreground/70 shadow-panel transition hover:bg-primary-soft hover:text-primary"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => {
          const price = formatPrice(product.price, product.currency)

          return (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-[15rem] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-panel transition hover:-translate-y-1 hover:shadow-glow sm:w-[16.5rem]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary/70">
                {product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                {product.category ? (
                  <span className="text-xs font-semibold uppercase tracking-wide text-fuchsia">
                    {product.category}
                  </span>
                ) : null}
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                  {product.name}
                </p>
                {price ? (
                  <span className="mt-auto pt-3 text-sm font-semibold text-primary">{price}</span>
                ) : null}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
