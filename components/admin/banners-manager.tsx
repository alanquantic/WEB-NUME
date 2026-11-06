'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { MediaLibraryModal } from '@/components/admin/media-library-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Banner, BannerPlacement } from '@/lib/api/banners'
import {
  createBanner,
  deleteBanner,
  updateBanner
} from '@/lib/api/banners.client'

const PLACEMENT_COPY: Record<
  BannerPlacement,
  {
    title: string
    description: string
    empty: string
  }
> = {
  top: {
    title: 'Banners superiores',
    description:
      'Aquí puedes cargar los banners que aparecerán en la parte superior.',
    empty: 'Aún no hay banners superiores.'
  },
  sidebar: {
    title: 'Banner lateral',
    description:
      'Aquí puedes cargar los banners que aparecerán en el lateral del blog.',
    empty: 'Aún no hay banners laterales.'
  },
  home_hero: {
    title: 'Hero del home (slider)',
    description:
      'Banners grandes que aparecen al inicio del home como slider automático. Tamaño recomendado 1920×600.',
    empty: 'Aún no hay banners del hero.'
  },
  home_above_store: {
    title: 'Banner arriba de "Tienda"',
    description:
      'Banner ancho que aparece justo antes de la sección Tienda en el home.',
    empty: 'Aún no hay banner arriba de Tienda.'
  }
}

function NewBannerInline({
  placement,
  onCreated
}: {
  placement: BannerPlacement
  onCreated: () => void
}) {
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    if (!imageUrl) {
      setError('Elige una imagen desde la biblioteca.')
      return
    }
    const link = linkUrl.trim()
    if (link) {
      try {
        new URL(link)
      } catch {
        setError('El link debe ser una URL válida (https://...).')
        return
      }
    }
    startTransition(async () => {
      try {
        await createBanner({
          placement,
          image_url: imageUrl,
          link_url: link || null,
          is_active: isActive
        })
        setImageUrl('')
        setLinkUrl('')
        setIsActive(true)
        onCreated()
      } catch {
        setError('No se pudo crear el banner.')
      }
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[hsl(var(--border))/0.6] bg-[hsl(var(--muted))/0.3] p-4"
      >
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-lg border border-dashed border-[hsl(var(--border))] bg-white">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Vista previa" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[10px] text-[hsl(var(--foreground))/0.5]">Sin imagen</span>
              )}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="h-8 px-3 text-xs"
              onClick={() => setIsMediaOpen(true)}
            >
              {imageUrl ? 'Cambiar' : 'Elegir'}
            </Button>
          </div>

          <div className="flex min-w-[220px] flex-1 flex-col gap-2">
            <Input
              type="url"
              placeholder="Link al hacer click (opcional) — https://..."
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              className="h-9"
            />
            <label className="inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="h-4 w-4"
              />
              Activo (visible en el sitio)
            </label>
            {error ? (
              <p className="text-xs font-medium text-[hsl(var(--danger))]">{error}</p>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center">
            <Button type="submit" disabled={isPending || !imageUrl} className="h-9 px-4 text-xs">
              {isPending ? 'Guardando…' : 'Agregar banner'}
            </Button>
          </div>
        </div>
      </form>

      <MediaLibraryModal
        open={isMediaOpen}
        initialUrl={imageUrl}
        onClose={() => setIsMediaOpen(false)}
        onSelect={(url) => {
          setImageUrl(url)
        }}
      />
    </>
  )
}

function BannerTableRow({
  banner,
  onChanged
}: {
  banner: Banner
  onChanged: () => void
}) {
  const [imageUrl, setImageUrl] = useState(banner.image_url)
  const [linkUrl, setLinkUrl] = useState(banner.link_url ?? '')
  const [isActive, setIsActive] = useState(banner.is_active)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const dirty =
    imageUrl !== banner.image_url ||
    (linkUrl.trim() || null) !== (banner.link_url ?? null) ||
    isActive !== banner.is_active

  function handleSave() {
    setError(null)
    const link = linkUrl.trim()
    if (link) {
      try {
        new URL(link)
      } catch {
        setError('URL inválida.')
        return
      }
    }
    startTransition(async () => {
      try {
        await updateBanner(banner.id, {
          image_url: imageUrl,
          link_url: link || null,
          is_active: isActive
        })
        onChanged()
      } catch {
        setError('No se pudo guardar.')
      }
    })
  }

  function handleDelete() {
    if (!window.confirm('¿Eliminar este banner?')) return
    startTransition(async () => {
      try {
        await deleteBanner(banner.id)
        onChanged()
      } catch {
        setError('No se pudo eliminar.')
      }
    })
  }

  return (
    <>
      <tr className="border-t border-[hsl(var(--border))/0.5]">
        <td className="w-[88px] py-2 pr-2">
          <button
            type="button"
            onClick={() => setIsMediaOpen(true)}
            className="group block h-12 w-20 overflow-hidden rounded-md bg-[hsl(var(--muted))/0.4] ring-1 ring-[hsl(var(--border))/0.6] transition hover:ring-[hsl(var(--primary))/0.5]"
            title="Cambiar imagen"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Banner"
              className="h-full w-full object-cover transition group-hover:opacity-80"
            />
          </button>
        </td>
        <td className="py-2 pr-2">
          <Input
            type="url"
            placeholder="https://..."
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            className="h-8 text-xs"
          />
          {error ? (
            <p className="mt-1 text-[11px] font-medium text-[hsl(var(--danger))]">{error}</p>
          ) : null}
        </td>
        <td className="w-20 py-2 pr-2 text-center">
          <label className="inline-flex cursor-pointer items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              className="h-4 w-4"
            />
            <span className="sr-only">Activo</span>
          </label>
        </td>
        <td className="w-auto py-2 text-right">
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              disabled={!dirty || isPending}
              onClick={handleSave}
              className="h-8 px-3 text-xs"
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="danger"
              disabled={isPending}
              onClick={handleDelete}
              className="h-8 px-3 text-xs"
            >
              Eliminar
            </Button>
          </div>
        </td>
      </tr>

      <MediaLibraryModal
        open={isMediaOpen}
        initialUrl={imageUrl}
        onClose={() => setIsMediaOpen(false)}
        onSelect={(url) => setImageUrl(url)}
      />
    </>
  )
}

function PlacementCard({
  placement,
  banners,
  onChanged,
  rotationNote
}: {
  placement: BannerPlacement
  banners: Banner[]
  onChanged: () => void
  rotationNote: string
}) {
  const copy = PLACEMENT_COPY[placement]
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-panel">
      <header>
        <h2 className="font-display text-xl font-semibold">{copy.title}</h2>
        <p className="mt-1 text-sm text-[hsl(var(--foreground))/0.7]">{copy.description}</p>
        <p className="mt-1 text-xs text-[hsl(var(--foreground))/0.55]">{rotationNote}</p>
      </header>

      <div className="mt-4">
        <NewBannerInline placement={placement} onCreated={onChanged} />
      </div>

      <div className="mt-5">
        {banners.length === 0 ? (
          <p className="text-sm text-[hsl(var(--foreground))/0.6]">{copy.empty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-[hsl(var(--foreground))/0.55]">
                  <th className="py-2 pr-2">Imagen</th>
                  <th className="py-2 pr-2">Link</th>
                  <th className="w-20 py-2 pr-2 text-center">Activo</th>
                  <th className="py-2 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <BannerTableRow key={banner.id} banner={banner} onChanged={onChanged} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export function BannersManager({ initialBanners }: { initialBanners: Banner[] }) {
  const router = useRouter()
  const byPlacement = (placement: BannerPlacement) =>
    initialBanners.filter((banner) => banner.placement === placement)

  function refresh() {
    router.refresh()
  }

  return (
    <div className="grid gap-6">
      <PlacementCard
        placement="home_hero"
        banners={byPlacement('home_hero')}
        onChanged={refresh}
        rotationNote="Todos los banners activos se muestran como slides del hero (autoplay cada 5 s)."
      />
      <PlacementCard
        placement="home_above_store"
        banners={byPlacement('home_above_store')}
        onChanged={refresh}
        rotationNote="Si hay más de uno activo, se muestra uno al azar en cada visita."
      />
      <PlacementCard
        placement="top"
        banners={byPlacement('top')}
        onChanged={refresh}
        rotationNote="Si hay más de uno activo, se muestra uno al azar en cada visita."
      />
      <PlacementCard
        placement="sidebar"
        banners={byPlacement('sidebar')}
        onChanged={refresh}
        rotationNote="Si hay más de uno activo, se muestra uno al azar en cada visita."
      />
    </div>
  )
}
