// Helpers para URLs que vienen de datos editables por usuarios (perfiles de
// consultor, banners) o de la query string. React no bloquea `javascript:` en
// `href`, así que todo enlace con datos externos pasa por aquí.

const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:'])

// Ruta interna del propio sitio: "/algo", pero no "//host" ni "/\host" (el
// navegador los trata como URLs de otro dominio).
export function isInternalPath(value: string): boolean {
  return /^\/(?![/\\])/.test(value) && !/[\u0000-\u001f\\]/.test(value)
}

// Destino para redirigir después del login u otro flujo: solo rutas internas.
export function safeRedirectPath(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed && isInternalPath(trimmed) ? trimmed : fallback
}

// Enlace para `href`: ruta interna o URL absoluta con esquema permitido
// (http, https, mailto, tel). Cualquier otra cosa (javascript:, data:, …) → null.
export function safeHref(value: string | null | undefined): string | null {
  const trimmed = value?.trim()
  if (!trimmed) return null
  if (isInternalPath(trimmed)) return trimmed

  try {
    const url = new URL(trimmed)
    return SAFE_SCHEMES.has(url.protocol) ? url.href : null
  } catch {
    return null
  }
}
