import type { Route } from 'next'
import Link from 'next/link'

import type { SamplePost } from '@/lib/blog/sample-posts'
import { formatDate } from '@/lib/format'

export function SamplePostCard({ post, featured = false }: { post: SamplePost; featured?: boolean }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/80 bg-card shadow-panel transition hover:-translate-y-1 hover:shadow-glow ${
        featured ? 'lg:flex-row' : ''
      }`}
    >
      <div
        className={`overflow-hidden bg-secondary/70 ${
          featured ? 'aspect-[16/10] lg:aspect-auto lg:w-1/2' : 'aspect-[16/10]'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-fuchsia">
          {post.category}
        </span>
        <h3
          className={`mt-1 font-display font-semibold leading-snug text-foreground group-hover:text-primary ${
            featured ? 'text-2xl' : 'text-[1.25rem]'
          }`}
        >
          <Link href={`/blog/${post.slug}` as Route}>{post.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">{post.excerpt}</p>
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-foreground/55">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.author}</span>
        </div>
        <Link
          href={`/blog/${post.slug}` as Route}
          className="mt-4 inline-flex w-fit rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft"
        >
          Leer más
        </Link>
      </div>
    </article>
  )
}
