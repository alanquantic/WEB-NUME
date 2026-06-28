import Link from 'next/link'

import type { ContentItem } from '@/lib/api/contracts'
import { formatDate } from '@/lib/format'

export function ArticleContent({ content }: { content: ContentItem }) {
  const date = formatDate(content.published_at ?? content.created_at)

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
        {content.content_html ? (
          <div dangerouslySetInnerHTML={{ __html: content.content_html }} />
        ) : (
          <p className="text-foreground/60">
            El contenido de este artículo estará disponible muy pronto.
          </p>
        )}
      </div>
    </article>
  )
}
