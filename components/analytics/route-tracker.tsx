'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { pageView } from '@/lib/analytics'

// App Router no dispara page_view automáticamente al navegar entre rutas.
// Este componente escucha cambios de pathname/searchParams y llama a gtag manualmente.
function RouteTrackerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    const query = searchParams?.toString()
    const url = query ? `${pathname}?${query}` : pathname
    pageView(url)
  }, [pathname, searchParams])

  return null
}

export function RouteTracker() {
  return (
    <Suspense fallback={null}>
      <RouteTrackerInner />
    </Suspense>
  )
}
