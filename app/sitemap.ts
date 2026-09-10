import type { MetadataRoute } from 'next'

import { getGuiaSlugs, getPersonalSlugs } from '@/lib/personales/data'
import { getSignificadoParams } from '@/lib/significados/data'

// Rutas de alta prioridad (contenido principal + calculadoras). Reciben priority 0.8.
const PRIMARY_ROUTES = [
  '',
  '/numerologia',
  '/mi-mapa',
  '/mi-carta',
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
  '/horoscopoanopersonal',
  '/revisatuhoroscopomensual2026',
  '/calculadoras',
  '/calculadoras/camino-de-vida',
  '/calculadoras/desafios-de-vida',
  '/calculadoras/expresion',
  '/calculadoras/compatibilidad',
  '/calculadoras/ano-personal-horoscopo',
  '/membresias'
]

// Rutas secundarias (índices, listados). Reciben priority 0.5.
const SECONDARY_ROUTES = [
  '/consultores',
  '/instructores',
  '/cursos',
  '/directorio',
  '/blog',
  '/categorias',
  '/tags',
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

  const personalesRoutes = [...getPersonalSlugs(), ...getGuiaSlugs()].map((slug) => `/${slug}`)

  const primary = PRIMARY_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8
  }))

  const secondary = SECONDARY_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.5
  }))

  const dynamic = [...significadosRoutes, ...personalesRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }))

  return [...primary, ...secondary, ...dynamic]
}
