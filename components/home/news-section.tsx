import type { Route } from 'next'
import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { SearchIcon } from '@/components/ui/icons'

type FeaturedNewsItem = {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  href: string
  imageSrc: string
  imageAlt: string
}

const FEATURED_NEWS: readonly FeaturedNewsItem[] = [
  {
    id: 'change-name',
    title: 'Guia para cambiar tu nombre desde la numerologia (sin perder tu esencia)',
    excerpt:
      'Guia para cambiar tu nombre desde la numerologia (sin perder tu esencia). Por que cambiar tu nombre desde la energia? Hacer un pequeno cambio en',
    author: 'Laura Rodriguez',
    date: '28 abril, 2025',
    href: '/blog/guia-cambiar-tu-nombre',
    imageSrc: '/images/Head-Nombre-750x375.webp',
    imageAlt: 'Noticia sobre cambio de nombre en numerologia'
  },
  {
    id: 'personal-month',
    title: 'Cual es tu Mes personal este mes y que significa?',
    excerpt:
      'Cual es tu Mes personal este mes y que significa? Que es el numero del mes personal? El Mes Personal te invita a trabajar una',
    author: 'Laura Rodriguez',
    date: '28 abril, 2025',
    href: '/blog/mes-personal',
    imageSrc: '/images/Head-Mes-Personal-750x375.webp',
    imageAlt: 'Noticia sobre el mes personal'
  },
  {
    id: 'house-numerology',
    title: 'Numerologia de casas: el poder energetico de tu direccion',
    excerpt:
      'Numerologia de casas: el poder energetico de tu direccion. Por que importa el numero de tu casa? La numerologia de los espacios es un tema intrigante',
    author: 'Laura Rodriguez',
    date: '28 abril, 2025',
    href: '/blog/numerologia-de-casas',
    imageSrc: '/images/Head-Casas-750x375.webp',
    imageAlt: 'Noticia sobre numerologia de casas'
  }
]

export async function NewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
        <div>
          <ScrollReveal>
            <h2 className="border-b-2 border-fuchsia pb-2 font-display text-2xl font-semibold text-primary">
              Noticias Destacadas
            </h2>
          </ScrollReveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {FEATURED_NEWS.map((item, index) => (
              <ScrollReveal key={item.id} delay={80 + index * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/80 bg-card shadow-panel transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary/70">
                    {/* Cuando subas las imagenes manualmente, colocarlas en /public/images con estos nombres */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-foreground group-hover:text-primary">
                      {item.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-wide text-fuchsia">
                      <span>{item.author}</span>
                      <span>{item.date}</span>
                    </div>
                    <Link
                      href={item.href as Route}
                      className="mt-6 inline-flex w-fit rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft"
                    >
                      Leer mas
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <ScrollReveal delay={140}>
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-panel">
              <h3 className="bg-gradient-brand px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white">
                Categorias
              </h3>
              <div className="px-5 py-4 text-sm text-foreground/70">
                Categorias en preparacion.
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-panel">
              <h3 className="bg-gradient-brand px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white">
                Busca una publicacion
              </h3>
              <form action="/busqueda" className="flex items-center gap-2 p-4">
                <input
                  type="search"
                  name="q"
                  placeholder="Buscar..."
                  className="h-10 w-full rounded-full border border-border bg-muted/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <button
                  type="submit"
                  aria-label="Buscar"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white"
                >
                  <SearchIcon width={16} height={16} />
                </button>
              </form>
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </section>
  )
}
