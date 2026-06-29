import type { MetadataRoute } from 'next'

const STATIC_ROUTES = [
  '',
  '/numerologia',
  '/mi-mapa',
  '/explora',
  '/numerologia-de-pareja',
  '/vibraciondeltiempo',
  '/labrujulanumerologica',
  '/etapapersonal',
  '/anopersonal',
  '/mespersonal',
  '/semanapersonal',
  '/diapersonal',
  '/vibracionescolectivas',
  '/calculatupinaculo',
  '/significadodelosnumeros',
  '/significadodeletras',
  '/numerologianombre',
  '/numerodelnombre',
  '/numerodelalma',
  '/numerodeexpresiondelalma',
  '/numerodelamadurez',
  '/nombreactivo',
  '/nombrehereditario',
  '/horoscopos',
  '/revisatuhoroscopomensual2026',
  '/consultores',
  '/instructores',
  '/cursos',
  '/calculadoras',
  '/calculadoras/camino-de-vida',
  '/calculadoras/expresion',
  '/calculadoras/compatibilidad',
  '/blog',
  '/categorias',
  '/tags',
  '/directorio',
  '/membresias',
  '/busqueda'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ??
    'https://www.numerologia-cotidiana.com'

  const lastModified = new Date()

  return STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.6
  }))
}
