import type { Route } from 'next'
import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { SearchIcon } from '@/components/ui/icons'
import type { Category } from '@/lib/api/contracts'
import { getSamplePosts } from '@/lib/blog/sample-posts'
import { getPosts } from '@/lib/api/posts'
import { getCategories } from '@/lib/api/taxonomy'
import { formatDate } from '@/lib/format'

type NewsCard = {
  id: string
  title: string
  author: string
  date: string
  href: string
  imageSrc: string
  imageAlt: string
}

function sampleCards(): NewsCard[] {
  return getSamplePosts()
    .slice(0, 3)
    .map((post) => ({
      id: post.slug,
      title: post.title,
      author: post.author,
      date: formatDate(post.date),
      href: `/blog/${post.slug}`,
      imageSrc: post.image,
      imageAlt: post.title
    }))
}

async function loadNews(): Promise<NewsCard[]> {
  try {
    const posts = await getPosts({ page: 1, limit: 3 })
    if (posts.data.length === 0) return sampleCards()

    return posts.data.map((post) => ({
      id: post.id,
      title: post.title,
      author: 'Numerología Cotidiana',
      date: formatDate(post.published_at ?? post.created_at),
      href: `/blog/${post.id}`,
      imageSrc: post.featured_image_url ?? '/images/preview-bk.png',
      imageAlt: post.title
    }))
  } catch {
    return sampleCards()
  }
}

async function loadCategories(): Promise<Category[]> {
  try {
    return (await getCategories(1, 8)).data
  } catch {
    return []
  }
}

export async function NewsSection() {
  const [news, categories] = await Promise.all([loadNews(), loadCategories()])

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
        <div>
          <ScrollReveal>
            <div className="flex items-end justify-between border-b-2 border-fuchsia pb-2">
              <h2 className="font-display text-2xl font-semibold text-primary">
                Noticias destacadas
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-primary transition hover:underline"
              >
                Ver todo
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {news.map((item, index) => (
              <ScrollReveal key={item.id} delay={80 + index * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/80 bg-card shadow-panel transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary/70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-foreground group-hover:text-primary">
                      <Link href={item.href as Route}>{item.title}</Link>
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-wide text-fuchsia">
                      <span>{item.author}</span>
                      {item.date ? <span>{item.date}</span> : null}
                    </div>
                    <Link
                      href={item.href as Route}
                      className="mt-6 inline-flex w-fit rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft"
                    >
                      Leer más
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
                Categorías
              </h3>
              {categories.length > 0 ? (
                <ul className="divide-y divide-border/70">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categorias/${category.id}` as Route}
                        className="flex items-center justify-between px-5 py-3 text-sm text-foreground/75 transition hover:bg-primary-soft hover:text-primary"
                      >
                        <span>{category.name.trim()}</span>
                        <span aria-hidden className="text-primary/50">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-5 py-4 text-sm text-foreground/70">
                  Categorías en preparación.
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-panel">
              <h3 className="bg-gradient-brand px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white">
                Busca una publicación
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
