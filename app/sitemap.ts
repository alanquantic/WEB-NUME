import type { MetadataRoute } from 'next'

import { getPersonalSlugs } from '@/lib/personales/data'
import { getSignificadoParams } from '@/lib/significados/data'

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

  const significadosRoutes = getSignificadoParams().map(
    ({ concepto, numero }) => `/significadodelosnumeros/${concepto}/${numero}`
  )

  const personalesRoutes = getPersonalSlugs().map((slug) => `/${slug}`)

  return [...STATIC_ROUTES, ...significadosRoutes, ...personalesRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.6
  }))
}
