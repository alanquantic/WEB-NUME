// Descargas públicas con URL fija: /{slug}.pdf (rewrite en next.config.mjs) y
// /descargas/{slug}.pdf redirigen al archivo actual en Cloudinary. Para reemplazar un PDF, súbelo en Cloudinary con el
// MISMO public_id marcando "Overwrite" + "Invalidate": la URL del sitio no
// cambia y este archivo no se toca. Para publicar uno nuevo, agrega una entrada.

const CLOUDINARY_CLOUD_NAME = 'du66hxu3k'

export type Descarga = {
  // public_id en Cloudinary, sin extensión (ej. 'nume-media/descargas/guia').
  publicId: string
  // Nombre con el que se guarda el archivo en el equipo del usuario (sin .pdf).
  nombreArchivo: string
}

export const DESCARGAS: Record<string, Descarga> = {
  'binomios-generales': {
    publicId: 'nume-media/descargas/binomios-generales',
    nombreArchivo: 'Binomios-Generales'
  }
}

export function getDescarga(archivo: string): Descarga | null {
  const match = /^([a-z0-9-]+)\.pdf$/i.exec(archivo)
  if (!match) return null
  const slug = match[1].toLowerCase()
  // hasOwn: evita que 'constructor', 'toString', etc. resuelvan al prototipo.
  return Object.hasOwn(DESCARGAS, slug) ? DESCARGAS[slug] : null
}

// URL sin segmento de versión (v123...) para que siempre sirva la última
// subida; fl_attachment fuerza la descarga en vez de abrirlo en el navegador.
export function getDescargaUrl({ publicId, nombreArchivo }: Descarga) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/fl_attachment:${nombreArchivo}/${publicId}.pdf`
}
