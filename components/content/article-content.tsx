import Link from 'next/link'

import { AuthorBio } from '@/components/content/author-bio'
import { PostCard } from '@/components/content/post-card'
import type { ContentItem } from '@/lib/api/contracts'
import { excerptFromHtml, formatDate } from '@/lib/format'
import { sanitizeArticleHtml } from '@/lib/sanitize'

// Tipo mínimo que satisfacen tanto ContentItem como AdminContentDetail
// (lo que el API devuelve en /posts/:id y /pages/:id). `category` es opcional.
type ArticleData = {
  title: string
  content_html: string | null
  featured_image_url: string | null
  requires_membership: boolean
  published_at: string | null
  created_at: string
  category?: { name: string } | null
  author?: {
    id: string
    name: string
    email: string
    profile_picture_url: string | null
    bio: string | null
  } | null
}

export function ArticleContent({
  content,
  relatedPosts = []
}: {
  content: ArticleData
  relatedPosts?: ContentItem[]
}) {
  const date = formatDate(content.published_at ?? content.created_at)
  const safeHtml = sanitizeArticleHtml(content.content_html)
  const author = content.author ?? null
  const authorInitial = author?.name?.trim().charAt(0).toUpperCase() ?? ''
  // Los <a> del bio apuntan a rutas /author/... del sitio antiguo, así que los
  // quitamos y sustituimos por nuestro propio enlace al perfil del autor.
  const bioWithoutLinks = (author?.bio ?? '').replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, '')
  const bioExcerpt = excerptFromHtml(bioWithoutLinks, 220)

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
        ← Volver al blog
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-fuchsia">
        {content.category ? <span>{content.category.name.trim()}</span> : null}
        {date ? <span className="text-foreground/55">{date}</span> : null}
        {content.requires_membership ? (
          <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">Premium</span>
        ) : null}
      </div>

      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">{content.title}</h1>

      {content.featured_image_url ? (
        <div className="mt-6 overflow-hidden rounded-[1.75rem] shadow-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.featured_image_url}
            alt={content.title}
            className="w-full object-cover"
          />
        </div>
      ) : null}

      <div className="mt-8 text-base leading-8 text-foreground/80 [&_a]:text-primary [&_a]:underline [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-5 [&_h3]:font-display [&_h3]:text-xl [&_img]:my-4 [&_img]:rounded-2xl [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
        {safeHtml ? (
          <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
        ) : (
          <p className="text-foreground/60">
            El contenido de este artículo estará disponible muy pronto.
          </p>
        )}
      </div>

      {author ? (
        <section
          aria-label="Sobre el autor"
          className="mt-12 flex flex-col gap-4 rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-panel sm:flex-row sm:items-center sm:gap-6"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft text-2xl font-semibold text-primary">
            {author.profile_picture_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={author.profile_picture_url}
                alt={author.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span aria-hidden="true">{authorInitial}</span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
              Autor
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-foreground">
              {author.name}
            </p>
            <AuthorBio authorId={author.id} excerpt={bioExcerpt} />
          </div>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section aria-label="También podría interesarte" className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            También podría interesarte
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
