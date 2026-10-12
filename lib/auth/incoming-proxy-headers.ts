import { headers } from 'next/headers'

import { clientIpFrom, proxyHeaders } from '@/lib/auth/proxy-headers'

// Cabeceras de IP real para llamadas a la API hechas durante un request
// (route handlers y server components dinámicos). Fuera de un request (build,
// generación estática) `headers()` lanza: entonces no se manda nada.
export function incomingProxyHeaders(): Record<string, string> {
  try {
    return proxyHeaders(clientIpFrom(headers()))
  } catch {
    return {}
  }
}
