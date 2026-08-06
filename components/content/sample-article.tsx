import type { Route } from 'next'
import Link from 'next/link'

import { KeepExploring } from '@/components/content/keep-exploring'
import { RelatedProducts } from '@/components/content/related-products'
import { RICH_ARTICLES } from '@/components/content/rich-articles'
import { SidebarBanner } from '@/components/content/sidebar-banner'
import { ToolPage } from '@/components/content/tool-page'
import { JsonLd } from '@/components/seo/json-ld'
import { FacebookIcon, TelegramIcon, WhatsappIcon } from '@/components/ui/icons'
import { getRelatedSamplePosts, type SamplePost } from '@/lib/blog/sample-posts'
import { estimateReadingTime, formatDate } from '@/lib/format'
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export function SampleArticle({ post }: { post: SamplePost }) {
  const date = formatDate(post.date)
  const rich = RICH_ARTICLES[post.slug]
  const reading = rich?.minutes ?? estimateReadingTime(post.html)
  const related = getRelatedSamplePosts(post.slug)
  const url = absoluteUrl(`/blog/${post.slug}`)
  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(url)

  const exploreLinks = [
    ...post.relatedTools.map((tool) => ({
      href: tool.href,
      title: tool.title,
      description: tool.description
    })),
    ...related.map((item) => ({
      href: `/blog/${item.slug}`,
      title: item.title,
      description: item.excerpt
    }))
  ]

  return (
    <ToolPage
      title={post.title}
      wide
      containerClassName="max-w-[92rem] px-4 sm:px-5 lg:px-6"
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.category }
      ]}
      header={null}
      showRelatedProducts={false}
    >
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          image: post.image,
          datePublished: post.date,
          author: post.author
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-fuchsia">
            <span>{post.category}</span>
            {date ? <span className="text-foreground/55">{date}</span> : null}
            <span className="text-foreground/55">{reading} min de lectura</span>
          </div>

          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">{post.title}</h1>
          <p className="mt-2 text-sm text-foreground/60">Por {post.author}</p>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] shadow-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full object-cover" />
          </div>

          {rich ? (
            <div className="mt-8">
              <rich.Body />
            </div>
          ) : (
            <div
              className="mt-8 text-base leading-8 text-foreground/80 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/busqueda?q=${encodeURIComponent(tag)}` as Route}
                  className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary"
                >
                  #{tag}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground/55">Compartir</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white transition hover:opacity-90"
              >
                <FacebookIcon width={16} height={16} />
              </a>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white transition hover:opacity-90"
              >
                <WhatsappIcon width={16} height={16} />
              </a>
              <a
                href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en Telegram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white transition hover:opacity-90"
              >
                <TelegramIcon width={16} height={16} />
              </a>
            </div>
          </div>

          <KeepExploring links={exploreLinks} />
        </article>

        <aside aria-label="Barra lateral" className="flex flex-col gap-6">
          <RelatedProducts
            title={post.title}
            categoryName={post.category}
            tagNames={post.tags}
            excludeSlug={post.slug}
          />
          <SidebarBanner />
        </aside>
      </div>
    </ToolPage>
  )
}
