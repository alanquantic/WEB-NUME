// La web llama a la API desde su servidor (BFF, route handlers, server
// components, middleware): para la API todos los visitantes tendrían la IP de
// este servidor y el rate limit por IP los bloquearía a todos juntos. Por eso
// reenviamos la IP real del visitante, firmada con un secreto compartido que
// la API verifica (INTERNAL_PROXY_SECRET, mismo valor en API, web y tienda).
//
// Compatible con el runtime edge (lo usa middleware.ts): sin APIs de Node.

export function clientIpFrom(headers: Headers, fallback?: string | null): string | null {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || headers.get('x-real-ip')?.trim() || fallback || null
  return ip ? ip.slice(0, 64) : null
}

// Sin secreto (p. ej. en local) no se manda nada y la API usa la IP de la conexión.
export function proxyHeaders(clientIp?: string | null): Record<string, string> {
  const secret = process.env.INTERNAL_PROXY_SECRET?.trim()
  if (!secret || !clientIp) return {}
  return { 'X-Nume-Client-IP': clientIp, 'X-Nume-Proxy-Key': secret }
}
