import type { Route } from 'next'
import Link from 'next/link'

type Props = {
  authorId: string
  excerpt: string
}

export function AuthorBio({ authorId, excerpt }: Props) {
  if (!excerpt) {
    return (
      <div className="mt-2 text-sm leading-6 text-foreground/70">
        <Link
          href={`/autor/${authorId}` as Route}
          className="inline-flex text-sm font-semibold text-primary hover:underline"
        >
          Ver perfil del autor →
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-2 text-sm leading-6 text-foreground/70">
      <p>{excerpt}</p>
      <Link
        href={`/autor/${authorId}` as Route}
        className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
      >
        Leer más
      </Link>
    </div>
  )
}
