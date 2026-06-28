import type { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/content/breadcrumbs'
import { ToolFooter } from '@/components/content/tool-footer'

type ToolPageProps = {
  title: string
  description: string
  children: ReactNode
  wide?: boolean
  toolKey?: string
}

export function ToolPage({ title, description, children, wide = false, toolKey }: ToolPageProps) {
  return (
    <div className={`mx-auto ${wide ? 'max-w-5xl' : 'max-w-3xl'} px-6 py-12`}>
      <Breadcrumbs
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Numerología', path: '/numerologia' },
          { name: title }
        ]}
      />
      <h1 className="mt-3 font-display text-4xl font-semibold">{title}</h1>
      <p className="mt-3 text-base leading-8 text-foreground/72">{description}</p>
      <div className="mt-8">{children}</div>
      {toolKey ? <ToolFooter toolKey={toolKey} /> : null}
    </div>
  )
}
