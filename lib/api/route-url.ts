// Con trailingSlash: true, Next redirige /api/x → /api/x/ (308). Las llamadas
// del cliente a los route handlers usan esta función para ir directo a la URL
// con barra y evitar ese salto extra.
export function apiRoute(path: string): string {
  const match = /^([^?#]*)(.*)$/.exec(path)
  const pathname = match?.[1] ?? path
  const rest = match?.[2] ?? ''
  return `${pathname.endsWith('/') ? pathname : `${pathname}/`}${rest}`
}
