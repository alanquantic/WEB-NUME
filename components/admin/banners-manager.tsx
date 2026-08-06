'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { MediaLibraryModal } from '@/components/admin/media-library-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Banner } from '@/lib/api/banners'
import {
  createBanner,
  deleteBanner,
  updateBanner
} from '@/lib/api/banners.client'

function NewBannerForm({ onCreated }: { onCreated: () => void }) {
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
      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h2 className="font-display text-xl font-semibold">Añadir banner</h2>
        <p className="mt-1 text-sm text-[hsl(var(--foreground))/0.7]">
          Selecciona una imagen desde la biblioteca de medios y (opcional) el
          link al que apuntará al hacer click.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-[240px_1fr]">
          <div>
            <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted))/0.4]">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Vista previa" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-[hsl(var(--foreground))/0.55]">Sin imagen</span>
              )}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-3 h-9 px-4 text-xs"
              onClick={() => setIsMediaOpen(true)}
            >
              {imageUrl ? 'Cambiar imagen' : 'Elegir imagen'}
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--foreground))/0.6]">
              Link al hacer click (opcional)
            </label>
            <Input
              type="url"
              placeholder="https://tienda.numerologia-cotidiana.com/..."
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
            />

            <label className="mt-2 inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="h-4 w-4"
              />
              Activo (visible en el sitio)
            </label>

            {error ? (
              <p className="text-sm font-medium text-[hsl(var(--danger))]">{error}</p>
            ) : null}

            <div>
              <Button type="submit" disabled={isPending || !imageUrl}>
                {isPending ? 'Guardando…' : 'Guardar banner'}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <MediaLibraryModal
        open={isMediaOpen}
        initialUrl={imageUrl}
        onClose={() => setIsMediaOpen(false)}
        onSelect={(url) => {
          console.log('[Banner form] imagen seleccionada:', url)
          setImageUrl(url)
        }}
      />
    </>
  )
}

function BannerRow({
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
      <li className="rounded-2xl border border-[hsl(var(--border))/0.6] bg-white p-4">
        <div className="grid gap-4 md:grid-cols-[180px_1fr_auto] md:items-center">
          <div>
            <div className="h-24 w-40 overflow-hidden rounded-xl bg-[hsl(var(--muted))/0.4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Banner" className="h-full w-full object-cover" />
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-2 h-8 px-3 text-xs"
              onClick={() => setIsMediaOpen(true)}
            >
              Cambiar
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="url"
              placeholder="https://..."
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
            />
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="h-4 w-4"
              />
              Activo
            </label>
            {error ? (
              <p className="text-xs font-medium text-[hsl(var(--danger))]">{error}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              type="button"
              disabled={!dirty || isPending}
              onClick={handleSave}
              className="h-9 px-4 text-xs"
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="danger"
              disabled={isPending}
              onClick={handleDelete}
              className="h-9 px-4 text-xs"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </li>

      <MediaLibraryModal
        open={isMediaOpen}
        initialUrl={imageUrl}
        onClose={() => setIsMediaOpen(false)}
        onSelect={(url) => setImageUrl(url)}
      />
    </>
  )
}

export function BannersManager({ initialBanners }: { initialBanners: Banner[] }) {
  const router = useRouter()

  function refresh() {
    router.refresh()
  }

  return (
    <div className="grid gap-6">
      <NewBannerForm onCreated={refresh} />

      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <h2 className="font-display text-xl font-semibold">Banners</h2>
        <p className="mt-1 text-sm text-[hsl(var(--foreground))/0.7]">
          Si hay más de uno activo, se muestra uno al azar en cada visita.
        </p>
        <ul className="mt-4 grid gap-3">
          {initialBanners.length === 0 ? (
            <li className="text-sm text-[hsl(var(--foreground))/0.6]">
              Aún no hay banners.
            </li>
          ) : (
            initialBanners.map((banner) => (
              <BannerRow key={banner.id} banner={banner} onChanged={refresh} />
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
