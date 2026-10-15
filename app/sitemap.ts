import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/api/posts'
import { getCategories } from '@/lib/api/taxonomy'
import { postPath } from '@/lib/blog/paths'
import { categoryPath } from '@/lib/categorias/paths'
import { getBirthdateSlugs } from '@/lib/horoscopos/birthdate'
import { getHoroscopoMesSlugs } from '@/lib/horoscopos/data'
import { getLegadoSlugs } from '@/lib/legado/data'
import { getGuiaSlugs, getPersonalSlugs } from '@/lib/personales/data'
import { getSignificadoParams } from '@/lib/significados/data'
import { significadoPath } from '@/lib/significados/routes'

const STATIC_ROUTES = [
  '',
  '/numerologia',
  '/mi-mapa',
  '/mi-carta',
  '/explora',
  '/numerologia-de-pareja',
  '/vibraciondeltiempo',
  '/la-brujula-numerologica',
  '/etapa-personal',
  '/ano-personal',
  '/mespersonal',
  '/semana-personal-ok',
  '/dia-personal',
  '/vibraciones-colectivas',
  '/pinaculo',
  '/significado-los-numeros',
  '/significado-significado-de-letras',
  '/numerologianombre',
  '/significado-de-tu-nombre',
  '/significado-numero-del-alma',
  '/significado-numero-de-expresion',
  '/significado-numero-la-madurez',
  '/nombreactivo',
  '/nombrehereditario',
  '/horoscopo-personal-2027',
  '/revisatuhoroscopomensual2026',
  '/consultores',
  '/instructores',
  '/curso-de-numerologia',
  '/calculadoras',
  '/mi-camino-de-vida',
  '/mis-desafio-de-vida',
  '/calculadoras/expresion',
  '/compatibilidad-numerologica',
  '/calculadoras/ano-personal-horoscopo',
  '/blog',
  '/categorias',
  '/directorio',
  '/membresias'
]

// Se regenera cada hora para incluir los posts nuevos del blog.
export const revalidate = 3600

// Posts y categorías del blog desde la API (si falla, el sitemap sale sin ellos).
async function loadBlogRoutes(): Promise<string[]> {
  const routes: string[] = []
  try {
    for (let page = 1; page <= 50; page++) {
      const res = await getPosts({ page, limit: 100 })
      routes.push(...res.data.map((post) => postPath(post.slug)))
      if (res.data.length < 100) break
    }
    routes.push(...(await getCategories(1, 100)).data.map((category) => categoryPath(category.slug)))
  } catch {
    // sin API: solo rutas estáticas
  }
  return routes
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? 'https://www.numerologia-cotidiana.com'

  const lastModified = new Date()

  const significadosRoutes = getSignificadoParams().map(
    ({ concepto, numero }) => significadoPath(concepto, numero)
  )

  const personalesRoutes = [...getPersonalSlugs(), ...getGuiaSlugs()].map((slug) => `/${slug}`)

  const horoscoposMensualesRoutes = getHoroscopoMesSlugs().map((slug) => `/${slug}`)

  const birthdateRoutes = getBirthdateSlugs().map((slug) => `/${slug}`)

  const legadoRoutes = getLegadoSlugs().map((slug) => `/${slug}`)

  return [
    ...STATIC_ROUTES,
    ...significadosRoutes,
    ...personalesRoutes,
    ...horoscoposMensualesRoutes,
    ...birthdateRoutes,
    ...legadoRoutes,
    ...(await loadBlogRoutes())
  ].map((path) => ({
    // Barra final en todas las URLs, igual que el WordPress original.
    url: `${base}${path}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.6
  }))
}
