import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAuthorById } from '@/lib/api/authors'
import type { PostAuthor } from '@/lib/api/contracts'
import { ApiError } from '@/lib/api/errors'
import { sanitizeArticleHtml } from '@/lib/sanitize'

export const metadata: Metadata = {
  title: 'Autor'
}

async function loadAuthor(id: string): Promise<PostAuthor | null> {
  try {
    return await getAuthorById(id)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function AuthorProfilePage({ params }: { params: { id: string } }) {
  const author = await loadAuthor(params.id)

  if (!author) {
    notFound()
  }

  // Quitamos los <a> heredados del sitio antiguo (p. ej. "Leer más" a /author/...
  // que aquí ya no aplica) y renderizamos el bio completo sanitizado.
  const bioWithoutLinks = (author.bio ?? '').replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, '')
  const bioHtml = sanitizeArticleHtml(bioWithoutLinks) ?? ''

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-center">
      <Link
        href="/blog"
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Volver al blog
      </Link>

      <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-primary-soft text-5xl font-semibold text-primary shadow-panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mini-laura.png"
          alt={author.name}
          className="h-full w-full object-cover"
        />
      </div>

      <h1 className="mt-6 font-display text-4xl font-semibold text-foreground sm:text-5xl">
        {author.name}
      </h1>

      {bioHtml ? (
        <div
          className="mx-auto mt-6 max-w-2xl text-left text-base leading-7 text-foreground/75 [&_a]:text-primary [&_a]:underline [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: bioHtml }}
        />
      ) : null}
    </div>
  )
}
