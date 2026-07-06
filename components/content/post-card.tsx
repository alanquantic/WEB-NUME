import type { Route } from 'next'
import Link from 'next/link'

import type { ContentItem } from '@/lib/api/contracts'
import { excerptFromHtml, formatDate } from '@/lib/format'

export function PostCard({ post }: { post: ContentItem }) {
  const date = formatDate(post.published_at ?? post.created_at)
  const excerpt = excerptFromHtml(post.content_html)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/80 bg-card shadow-panel transition hover:-translate-y-1 hover:shadow-glow">
      <div className="aspect-[16/10] overflow-hidden bg-secondary/70">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.featured_image_url ?? '/images/preview-bk.png'}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.category ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-fuchsia">
            {post.category.name.trim()}
          </span>
        ) : null}
        <h3 className="mt-1 font-display text-[1.25rem] font-semibold leading-snug text-foreground group-hover:text-primary">
          {post.title}
        </h3>
        {excerpt ? (
          <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">{excerpt}</p>
        ) : (
          <div className="flex-1" />
        )}
        {date ? <span className="mt-3 text-xs font-medium text-foreground/55">{date}</span> : null}
        <Link
          href={`/blog/${post.id}` as Route}
          className="mt-4 inline-flex w-fit rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft"
        >
          Leer más
        </Link>
      </div>
    </article>
  )
}
