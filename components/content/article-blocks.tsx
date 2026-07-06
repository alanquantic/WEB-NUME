import type { ReactNode } from 'react'

// Bloques reutilizables para componer artículos ricos (con componentes embebidos).
// Úsalos como plantilla para nuevos artículos en components/content/rich-articles.tsx.

export function ArticleLead({ children }: { children: ReactNode }) {
  return <p className="text-lg leading-8 text-foreground/80">{children}</p>
}

export function ArticleH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-2xl font-semibold text-foreground sm:text-[1.7rem]">
      {children}
    </h2>
  )
}

export function ArticleP({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-base leading-8 text-foreground/80">{children}</p>
}

export function ArticleList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-base leading-8 text-foreground/80">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ArticleCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-[1.5rem] border border-primary/15 bg-primary-soft/60 p-6">
      <p className="font-display text-base font-semibold text-primary">{title}</p>
      <div className="mt-1 text-sm leading-7 text-foreground/78">{children}</div>
    </div>
  )
}
