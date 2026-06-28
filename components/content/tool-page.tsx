import type { ReactNode } from 'react'

type ToolPageProps = {
  title: string
  description: string
  children: ReactNode
  wide?: boolean
}

export function ToolPage({ title, description, children, wide = false }: ToolPageProps) {
  return (
    <div className={`mx-auto ${wide ? 'max-w-5xl' : 'max-w-3xl'} px-6 py-12`}>
      <h1 className="font-display text-4xl font-semibold">{title}</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">{description}</p>
      <div className="mt-8">{children}</div>
    </div>
  )
}
