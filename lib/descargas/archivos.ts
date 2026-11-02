// Descargas públicas con URL fija: /{slug}.pdf (rewrite en next.config.mjs) y
// /descargas/{slug}.pdf redirigen al archivo actual en R2. Para reemplazar un
// PDF, súbelo a R2 con la MISMA key y Content-Disposition: attachment (fuerza la
// descarga con su nombre): la URL del sitio no cambia y este archivo no se toca.
// Los PDFs locales se guardan en public y se indican con rutaLocal. Para
// publicar uno nuevo, agrega una entrada.

const R2_MEDIA_URL = 'https://cdn.tienda.numerologia-cotidiana.com/webnume'

export type Descarga = {
  rutaLocal?: string
  // Key en R2 sin el prefijo webnume/ (ej. 'nume-media/descargas/guia.pdf').
  key: string
}

export const DESCARGAS: Record<string, Descarga> = {
  'binomios-generales': {
    rutaLocal: '/binomios-generales.pdf',
    key: 'nume-media/descargas/binomios-generales.pdf'
  }
}

export function getDescarga(archivo: string): Descarga | null {
  const match = /^([a-z0-9-]+)\.pdf$/i.exec(archivo)
  if (!match) return null
  const slug = match[1].toLowerCase()
  // hasOwn: evita que 'constructor', 'toString', etc. resuelvan al prototipo.
  return Object.hasOwn(DESCARGAS, slug) ? DESCARGAS[slug] : null
}

export function getDescargaUrl({ key }: Descarga) {
  return `${R2_MEDIA_URL}/${key}`
}
