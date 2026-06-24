import { Badge } from '@/components/ui/badge'
import type { ContentItem } from '@/lib/api/contracts'

export function ArticleContent({ content }: { content: ContentItem }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge>{content.type}</Badge>
        {content.requires_membership ? <Badge>Premium</Badge> : null}
      </div>
      <h1 className="font-display text-4xl font-semibold leading-tight">{content.title}</h1>
      <div className="mt-6 text-base leading-8 text-[hsl(var(--foreground))/0.8]">
        {content.content_html ? (
          <div dangerouslySetInnerHTML={{ __html: content.content_html }} />
        ) : (
          <p>El backend aún no devolvió HTML renderizable para este contenido.</p>
        )}
      </div>
    </article>
  )
}

