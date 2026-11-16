import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/api/posts'
import { getCategories } from '@/lib/api/taxonomy'
import { postPath } from '@/lib/blog/paths'
import { categoryPath } from '@/lib/categorias/paths'
import { getBirthdateSlugs } from '@/lib/horoscopos/birthdate'
import { getHoroscopoMesSlugs } from '@/lib/horoscopos/data'
import { getLegadoSlugs } from '@/lib/legado/data'
import { getGuiaSlugs, getPersonalSlugs } from '@/lib/personales/data'
import { SITE } from '@/lib/seo'
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
  '/calculadoras',
  '/mi-camino-de-vida',
  '/mis-desafio-de-vida',
  '/calculadoras/expresion',
  '/compatibilidad-numerologica',
  '/calculadoras/ano-personal-horoscopo',
  '/blog',
  '/categorias',
  '/directorio',
  '/membresias',
  '/paginas/aviso-de-privacidad'
]

// Slugs que solo redirigen a otra URL: no van en el sitemap.
const EXCLUDED_ROUTES = new Set(['/aviso-de-privacidad'])

// Se regenera cada hora para incluir los posts nuevos del blog.
export const revalidate = 3600

type BlogRoute = { path: string; lastModified?: Date }

// Posts y categorías del blog desde la API (si falla, el sitemap sale sin ellos).
// Solo los posts llevan fecha: es la única que conocemos de verdad.
async function loadBlogRoutes(): Promise<BlogRoute[]> {
  const routes: BlogRoute[] = []
  try {
    for (let page = 1; page <= 50; page++) {
      const res = await getPosts({ page, limit: 100 })
      routes.push(
        ...res.data.map((post) => ({
          path: postPath(post.slug),
          lastModified: toDate(post.updated_at ?? post.published_at ?? post.created_at)
        }))
      )
      if (res.data.length < 100) break
    }
    routes.push(
      ...(await getCategories(1, 100)).data.map((category) => ({
        path: categoryPath(category.slug)
      }))
    )
  } catch {
    // sin API: solo rutas estáticas
  }
  return routes
}

function toDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Siempre el dominio canónico (con www). Antes salía de NEXT_PUBLIC_APP_URL
  // y, con esa variable sin www, las 1,900 URLs del sitemap redirigían.
  const base = SITE.url

  const significadosRoutes = getSignificadoParams().map(
    ({ concepto, numero }) => significadoPath(concepto, numero)
  )

  const personalesRoutes = [...getPersonalSlugs(), ...getGuiaSlugs()].map((slug) => `/${slug}`)

  const horoscoposMensualesRoutes = getHoroscopoMesSlugs().map((slug) => `/${slug}`)

  const birthdateRoutes = getBirthdateSlugs().map((slug) => `/${slug}`)

  const legadoRoutes = getLegadoSlugs().map((slug) => `/${slug}`)

  // Una entrada por ruta: varias fuentes comparten slug (p. ej. una página
  // estática y un post del blog) y la misma URL salía repetida.
  const routes = new Map<string, Date | undefined>()
  for (const path of [
    ...STATIC_ROUTES,
    ...significadosRoutes,
    ...personalesRoutes,
    ...horoscoposMensualesRoutes,
    ...birthdateRoutes,
    ...legadoRoutes
  ]) {
    if (!routes.has(path)) routes.set(path, undefined)
  }
  for (const { path, lastModified } of await loadBlogRoutes()) {
    if (!routes.has(path)) routes.set(path, lastModified)
  }
  for (const path of EXCLUDED_ROUTES) routes.delete(path)

  return Array.from(routes, ([path, lastModified]) => ({
    // Barra final en todas las URLs, igual que el WordPress original.
    url: `${base}${path}/`,
    // Sin fecha cuando no la conocemos: una fecha "de hoy" en todas las URLs
    // hace que Google deje de confiar en el campo.
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.6
  }))
}
