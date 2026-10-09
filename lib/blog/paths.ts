// Los posts se sirven en la raíz (/{slug}/), igual que en el WordPress
// original. Módulo seguro para el cliente.
export function postPath(slug: string): string {
  return `/${slug}`
}
