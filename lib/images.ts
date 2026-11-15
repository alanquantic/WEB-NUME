// Hosts cuyas imágenes pasan por el optimizador de Next (next.config.mjs →
// images.remotePatterns). Cualquier otra URL externa se muestra tal cual
// (`unoptimized`) para no romper la página con un host no permitido.
export const OPTIMIZED_IMAGE_HOSTS = ['cdn.tienda.numerologia-cotidiana.com'] as const

export function isOptimizableImage(src: string): boolean {
  if (src.startsWith('/') && !src.startsWith('//')) return true
  try {
    const url = new URL(src)
    return url.protocol === 'https:' && (OPTIMIZED_IMAGE_HOSTS as readonly string[]).includes(url.hostname)
  } catch {
    return false
  }
}
