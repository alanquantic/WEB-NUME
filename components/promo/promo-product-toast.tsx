'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { formatPrice, type PromoProduct } from '@/lib/api/promo-products'
import { apiRoute } from '@/lib/api/route-url'
import { safeHref } from '@/lib/safe-url'
import { cn } from '@/lib/utils'

type ToastProduct = Pick<
  PromoProduct,
  'id' | 'name' | 'image_url' | 'price' | 'regular_price' | 'currency' | 'product_url'
>

// Tiempos en ms. El primer aviso sale poco después de entrar; los siguientes,
// a intervalos aleatorios para que no se sienta mecánico.
const FIRST_DELAY: [number, number] = [12_000, 25_000]
const NEXT_DELAY: [number, number] = [45_000, 90_000]
const VISIBLE_FOR = 9_000
// Si la persona cierra varios avisos en la misma sesión, dejamos de mostrarlos.
const MAX_DISMISSALS = 3
const DISMISS_KEY = 'nume_promo_dismissals'

// Panel, login y flujos de cuenta no muestran promociones.
const HIDDEN_PREFIXES = [
  '/perfil',
  '/admin',
  '/login',
  '/registro',
  '/olvide-contrasena',
  '/restablecer-contrasena',
  '/verificar-correo'
]

function randomBetween([min, max]: [number, number]) {
  return min + Math.random() * (max - min)
}

function readDismissals(): number {
  try {
    return Number(sessionStorage.getItem(DISMISS_KEY) ?? '0') || 0
  } catch {
    return 0
  }
}

function writeDismissals(value: number) {
  try {
    sessionStorage.setItem(DISMISS_KEY, String(value))
  } catch {
    // sessionStorage no disponible (modo privado); solo afecta esta pestaña.
  }
}

export function PromoProductToast() {
  const pathname = usePathname()
  const hidden = HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix))

  const [products, setProducts] = useState<ToastProduct[]>([])
  const [current, setCurrent] = useState<ToastProduct | null>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const lastIdRef = useRef<string | null>(null)
  const scheduleRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (hidden) return
    let cancelled = false
    fetch(apiRoute('/api/promo-products'))
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((json: { data?: ToastProduct[] }) => {
        if (cancelled) return
        setProducts((json.data ?? []).filter((product) => safeHref(product.product_url)))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [hidden])

  const schedule = useCallback(
    (range: [number, number]) => {
      if (scheduleRef.current) clearTimeout(scheduleRef.current)
      if (products.length === 0 || readDismissals() >= MAX_DISMISSALS) return
      scheduleRef.current = setTimeout(() => {
        const pool =
          products.length > 1
            ? products.filter((product) => product.id !== lastIdRef.current)
            : products
        const next = pool[Math.floor(Math.random() * pool.length)]
        lastIdRef.current = next.id
        setCurrent(next)
        setVisible(true)
      }, randomBetween(range))
    },
    [products]
  )

  const close = useCallback(
    (byUser: boolean) => {
      if (hideRef.current) clearTimeout(hideRef.current)
      setVisible(false)
      if (byUser) writeDismissals(readDismissals() + 1)
      schedule(NEXT_DELAY)
    },
    [schedule]
  )

  useEffect(() => {
    if (hidden) {
      setVisible(false)
      return
    }
    schedule(FIRST_DELAY)
    return () => {
      if (scheduleRef.current) clearTimeout(scheduleRef.current)
    }
  }, [hidden, schedule])

  // Se oculta sola tras unos segundos; mientras el cursor esté encima, espera.
  useEffect(() => {
    if (!visible || hovered) return
    hideRef.current = setTimeout(() => close(false), VISIBLE_FOR)
    return () => {
      if (hideRef.current) clearTimeout(hideRef.current)
    }
  }, [visible, hovered, close])

  if (hidden || !current) return null

  const href = safeHref(current.product_url)
  const price = formatPrice(current.price, current.currency)
  const regularPrice = formatPrice(current.regular_price, current.currency)

  return (
    <div
      role="complementary"
      aria-label="Producto recomendado"
      aria-hidden={!visible}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-[360px] transition-all duration-500 ease-out motion-reduce:transition-none sm:bottom-6 sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      )}
    >
      <div className="relative">
        <a
          href={href ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          onClick={() => close(false)}
          className="flex items-center gap-3 rounded-[1.75rem] border border-[hsl(var(--border))] bg-white p-3 text-[hsl(263_35%_18%)] shadow-panel transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mini-laura.png"
            alt="Laura"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[hsl(263_67%_35%)]">
              Laura te recomienda
            </p>
            <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">
              {current.name}
            </p>
            {price ? (
              <p className="mt-1 text-sm font-bold text-[hsl(263_67%_35%)]">
                {price}
                {regularPrice ? (
                  <span className="ml-2 text-xs font-medium text-[hsl(263_35%_18%/0.5)] line-through">
                    {regularPrice}
                  </span>
                ) : null}
              </p>
            ) : null}
          </div>
          {current.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.image_url}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-2xl object-cover"
            />
          ) : null}
        </a>
        <button
          type="button"
          onClick={() => close(true)}
          tabIndex={visible ? 0 : -1}
          aria-label="Cerrar recomendación"
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white text-[hsl(263_35%_18%/0.7)] shadow-panel transition hover:bg-[hsl(270_100%_96%)] hover:text-[hsl(263_67%_35%)]"
        >
          <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
