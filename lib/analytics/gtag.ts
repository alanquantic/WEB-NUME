import type { AnalyticsEventMap, AnalyticsEventName } from './events'
import type { ConsentSettings } from './consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return
  // Fallback: encolar en dataLayer si gtag aún no está definido (carga diferida).
  if (typeof window.gtag !== 'function') {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push(args)
    return
  }
  window.gtag(...args)
}

// Enviar un evento tipado a GA4.
export function track<K extends AnalyticsEventName>(
  event: K,
  params: AnalyticsEventMap[K]
) {
  gtag('event', event, params as Record<string, unknown>)
}

// Actualizar consentimiento en Consent Mode v2.
export function updateConsent(settings: ConsentSettings) {
  gtag('consent', 'update', settings)
}

// Page view manual (para SPA / App Router — Next no dispara automáticamente).
export function pageView(url: string, title?: string) {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', 'page_view', {
    page_path: url,
    page_location: typeof window !== 'undefined' ? window.location.href : url,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : undefined),
    send_to: GA_MEASUREMENT_ID
  })
}

// Identificar usuario (después de login). Solo mandamos hash, nunca email en claro.
export function setUserId(userId: string | null) {
  gtag('set', { user_id: userId ?? undefined })
}

// Hash simple para no mandar nombres/emails en claro a GA4.
// No es criptográficamente fuerte, es para que el analista no vea el nombre.
export async function hashInput(input: string): Promise<string> {
  if (!input) return ''
  const normalized = input.trim().toLowerCase()
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    // Fallback: djb2
    let hash = 5381
    for (let i = 0; i < normalized.length; i++) {
      hash = ((hash << 5) + hash + normalized.charCodeAt(i)) | 0
    }
    return `h${Math.abs(hash).toString(36)}`
  }
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(normalized)
  )
  return Array.from(new Uint8Array(buffer))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
