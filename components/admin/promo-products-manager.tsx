'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice, type PromoProduct, type StoreProduct } from '@/lib/api/promo-products'
import {
  addPromoProduct,
  deletePromoProduct,
  searchStoreProducts,
  updatePromoProduct
} from '@/lib/api/promo-products.client'

function ProductThumb({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[hsl(var(--muted))/0.4]">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : null}
    </div>
  )
}

function StoreSearch({
  selectedIds,
  onAdded
}: {
  selectedIds: Set<string>
  onAdded: () => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<StoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)

  async function runSearch(value: string) {
    setIsLoading(true)
    setError(null)
    try {
      setResults(await searchStoreProducts(value))
    } catch {
      setError('No se pudo consultar la tienda.')
    } finally {
      setIsLoading(false)
    }
  }

  // Al abrir se muestran los productos más recientes de la tienda.
  useEffect(() => {
    void runSearch('')
  }, [])

  async function handleAdd(product: StoreProduct) {
    setPendingId(product.id)
    setError(null)
    try {
      await addPromoProduct(product)
      onAdded()
    } catch {
      setError('No se pudo agregar el producto.')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-panel">
      <h2 className="font-display text-xl font-semibold">Buscar en la tienda</h2>
      <p className="mt-1 text-sm text-[hsl(var(--foreground))/0.7]">
        Busca por nombre o categoría y agrega los productos que quieras promocionar.
      </p>

      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          void runSearch(query)
        }}
      >
        <Input
          type="search"
          placeholder="Ej. reporte, agenda, pareja…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button type="submit" disabled={isLoading} className="sm:w-32">
          {isLoading ? 'Buscando…' : 'Buscar'}
        </Button>
      </form>

      {error ? (
        <p className="mt-3 text-sm font-medium text-[hsl(var(--danger))]">{error}</p>
      ) : null}

      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {!isLoading && results.length === 0 ? (
          <li className="text-sm text-[hsl(var(--foreground))/0.6]">Sin resultados.</li>
        ) : null}
        {results.map((product) => {
          const added = selectedIds.has(product.id)
          return (
            <li
              key={product.id}
              className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))/0.6] p-3"
            >
              <ProductThumb src={product.image} alt={product.name} />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
                <p className="text-xs text-[hsl(var(--foreground))/0.65]">
                  {formatPrice(product.price, product.currency) ?? 'Sin precio'}
                  {product.category ? ` · ${product.category}` : ''}
                </p>
              </div>
              <Button
                type="button"
                variant={added ? 'secondary' : 'default'}
                disabled={pendingId === product.id}
                onClick={() => handleAdd(product)}
                className="h-9 shrink-0 px-3 text-xs"
                title={added ? 'Vuelve a copiar nombre, imagen y precio desde la tienda' : undefined}
              >
                {pendingId === product.id ? '…' : added ? 'Actualizar' : 'Agregar'}
              </Button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function SelectedRow({ product, onChanged }: { product: PromoProduct; onChanged: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function toggleActive() {
    setError(null)
    startTransition(async () => {
      try {
        await updatePromoProduct(product.id, { is_active: !product.is_active })
        onChanged()
      } catch {
        setError('No se pudo guardar.')
      }
    })
  }

  function handleDelete() {
    if (!window.confirm(`¿Quitar "${product.name}" de los productos promocionados?`)) return
    startTransition(async () => {
      try {
        await deletePromoProduct(product.id)
        onChanged()
      } catch {
        setError('No se pudo quitar.')
      }
    })
  }

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-2xl border border-[hsl(var(--border))/0.6] bg-white p-3">
      <ProductThumb src={product.image_url} alt={product.name} />
      <div className="min-w-0 flex-1">
        <a
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="line-clamp-2 text-sm font-semibold hover:underline"
        >
          {product.name}
        </a>
        <p className="text-xs text-[hsl(var(--foreground))/0.65]">
          {formatPrice(product.price, product.currency) ?? 'Sin precio'}
        </p>
        {error ? (
          <p className="text-xs font-medium text-[hsl(var(--danger))]">{error}</p>
        ) : null}
      </div>
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={product.is_active}
          disabled={isPending}
          onChange={toggleActive}
          className="h-4 w-4"
        />
        Activo
      </label>
      <Button
        type="button"
        variant="danger"
        disabled={isPending}
        onClick={handleDelete}
        className="h-9 px-4 text-xs"
      >
        Quitar
      </Button>
    </li>
  )
}

export function PromoProductsManager({ initialProducts }: { initialProducts: PromoProduct[] }) {
  const router = useRouter()
  const selectedIds = new Set(initialProducts.map((product) => product.store_product_id))
  const activeCount = initialProducts.filter((product) => product.is_active).length

  function refresh() {
    router.refresh()
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h2 className="font-display text-xl font-semibold">
          Productos seleccionados ({activeCount} activos)
        </h2>
        <p className="mt-1 text-sm text-[hsl(var(--foreground))/0.7]">
          En cada aviso se muestra uno de los productos activos al azar. Los
          cambios pueden tardar hasta un minuto en verse en el sitio.
        </p>
        <ul className="mt-4 grid gap-3">
          {initialProducts.length === 0 ? (
            <li className="text-sm text-[hsl(var(--foreground))/0.6]">
              Aún no hay productos seleccionados.
            </li>
          ) : (
            initialProducts.map((product) => (
              <SelectedRow key={product.id} product={product} onChanged={refresh} />
            ))
          )}
        </ul>
      </section>

      <StoreSearch selectedIds={selectedIds} onAdded={refresh} />
    </div>
  )
}
