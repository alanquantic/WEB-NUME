import { getRelatedProducts, type RelatedProduct } from '@/lib/api/products'
import { extractProductKeywords, resolveStoreCategories } from '@/lib/blog/related-store'

function formatPrice(price: string | null, currency: string): string | null {
  if (!price) return null
  const value = Number(price)
  if (!Number.isFinite(value)) return null
  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency || 'MXN',
      maximumFractionDigits: 2
    }).format(value)
  } catch {
    return `${value.toFixed(2)} ${currency}`
  }
}

function ProductCardCompact({ product }: { product: RelatedProduct }) {
  const price = formatPrice(product.price, product.currency)

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-[1.4rem] border border-border/70 bg-card shadow-panel transition hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-secondary/70">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {product.name}
        </p>
        {price ? (
          <span className="mt-2 text-sm font-semibold text-primary">{price}</span>
        ) : null}
      </div>
    </a>
  )
}

function ProductCardGrid({ product }: { product: RelatedProduct }) {
  const price = formatPrice(product.price, product.currency)

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-panel transition hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary/70">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {product.category ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-fuchsia">
            {product.category}
          </span>
        ) : null}
        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {product.name}
        </p>
        {price ? (
          <span className="mt-3 text-sm font-semibold text-primary">{price}</span>
        ) : null}
      </div>
    </a>
  )
}

export async function RelatedProducts({
  title,
  categoryName,
  tagNames = [],
  excludeSlug,
  limit = 3,
  layout = 'sidebar'
}: {
  title?: string | null
  categoryName?: string | null
  tagNames?: string[]
  excludeSlug?: string | null
  limit?: number
  layout?: 'sidebar' | 'grid'
}) {
  const titleKeywords = extractProductKeywords(title)
  const storeCategories = resolveStoreCategories(categoryName, tagNames)

  const collected: RelatedProduct[] = []
  const seen = new Set<string>()

  const merge = (items: RelatedProduct[]) => {
    for (const item of items) {
      if (collected.length >= limit) break
      if (seen.has(item.id)) continue
      seen.add(item.id)
      collected.push(item)
    }
  }

  if (titleKeywords.length > 0) {
    const matchedByTitle = await getRelatedProducts({
      keywords: titleKeywords,
      limit,
      exclude: excludeSlug ?? undefined
    })
    merge(matchedByTitle)
  }

  if (storeCategories.length > 0) {
    const matched = await getRelatedProducts({
      categories: storeCategories,
      limit,
      exclude: excludeSlug ?? undefined
    })
    merge(matched)
  }

  // Fallback: si titulo + mapping no llenaron el bloque, completar con recientes.
  if (collected.length < limit) {
    const fallback = await getRelatedProducts({
      limit,
      exclude: excludeSlug ?? undefined
    })
    merge(fallback)
  }

  if (collected.length === 0) return null

  if (layout === 'grid') {
    return (
      <section aria-label="Productos relacionados" className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-primary">
          Productos relacionados
        </h2>
        <p className="mt-2 text-sm leading-7 text-foreground/70">
          Complementa esta herramienta con recursos de nuestra tienda.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {collected.map((product) => (
            <ProductCardGrid key={product.id} product={product} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      aria-label="Productos relacionados"
      className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-panel"
    >
      <h2 className="font-display text-xl font-semibold text-foreground">
        Productos relacionados
      </h2>
      <p className="mt-2 text-sm leading-6 text-foreground/65">
        Recursos de nuestra tienda para acompañar esta lectura.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {collected.map((product) => (
          <ProductCardCompact key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
