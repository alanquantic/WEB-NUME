import type { ReactNode } from 'react'

import { Breadcrumbs, type Crumb } from '@/components/content/breadcrumbs'
import { RelatedProducts } from '@/components/content/related-products'
import { ToolFooter } from '@/components/content/tool-footer'

type ToolPageProps = {
  title: string
  description?: string
  children: ReactNode
  wide?: boolean
  containerClassName?: string
  toolKey?: string
  breadcrumbs?: Crumb[]
  header?: ReactNode
  /** Categoría de la tienda para filtrar productos relacionados al final. */
  productCategory?: string | null
  /** Si es false, no se muestra la sección de productos relacionados. */
  showRelatedProducts?: boolean
}

export function ToolPage({
  title,
  description,
  children,
  wide = false,
  containerClassName,
  toolKey,
  breadcrumbs,
  header,
  productCategory,
  showRelatedProducts = true
}: ToolPageProps) {
  const items: Crumb[] = breadcrumbs ?? [
    { name: 'Inicio', path: '/' },
    { name: 'Numerología', path: '/numerologia' },
    { name: title }
  ]

  return (
    <div
      className={[
        'mx-auto py-12',
        wide ? 'max-w-5xl' : 'max-w-3xl',
        'px-6',
        containerClassName
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Breadcrumbs items={items} />
      {header !== undefined ? (
        header
      ) : (
        <>
          <h1 className="mt-3 font-display text-4xl font-semibold">{title}</h1>
          {description ? (
            <p className="mt-3 text-base leading-8 text-foreground/72">{description}</p>
          ) : null}
        </>
      )}
      <div className="mt-8">{children}</div>
      {toolKey ? <ToolFooter toolKey={toolKey} /> : null}
      {showRelatedProducts ? (
        <RelatedProducts categoryName={productCategory ?? null} layout="grid" />
      ) : null}
    </div>
  )
}
