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
  reorderBanners,
  updateBanner
} from '@/lib/api/banners.client'
import {
  BANNER_STATUS_LABEL,
  formatMexicoDateTime,
  fromMexicoInputValue,
  getBannerScheduleStatus,
  toMexicoInputValue,
  validateBannerWindow,
  type BannerScheduleStatus
} from '@/lib/banner-schedule'

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

// En el slider del home el texto alt es obligatorio: es contenido visible con
// precios, fechas y llamados a la acción que deben ser legibles para todos.
const ALT_REQUIRED: Record<BannerPlacement, boolean> = {
  home_hero: true,
  home_above_store: false,
  top: false,
  sidebar: false
}

// Solo el slider muestra todos los banners a la vez; en los demás se elige uno
// al azar, así que el orden no aplica.
const ORDERABLE: Record<BannerPlacement, boolean> = {
  home_hero: true,
  home_above_store: false,
  top: false,
  sidebar: false
}

const STATUS_STYLE: Record<BannerScheduleStatus, string> = {
  live: 'bg-emerald-100 text-emerald-800',
  scheduled: 'bg-sky-100 text-sky-800',
  expired: 'bg-amber-100 text-amber-800',
  inactive: 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))/0.65]'
}

function StatusBadge({ banner }: { banner: Banner }) {
  const status = getBannerScheduleStatus(banner)
  const detail =
    status === 'scheduled'
      ? `desde ${formatMexicoDateTime(banner.starts_at)}`
      : status === 'live' && banner.ends_at
        ? `hasta ${formatMexicoDateTime(banner.ends_at)}`
        : status === 'expired'
          ? `terminó ${formatMexicoDateTime(banner.ends_at)}`
          : null
  return (
    <span className="inline-flex flex-col items-center gap-0.5">
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLE[status]}`}
      >
        {BANNER_STATUS_LABEL[status]}
      </span>
      {detail ? (
        <span className="text-[10px] leading-tight text-[hsl(var(--foreground))/0.55]">{detail}</span>
      ) : null}
    </span>
  )
}

/** Campos de alt + vigencia, compartidos por el alta y la edición. */
function ScheduleFields({
  idPrefix,
  placement,
  altText,
  onAltText,
  startsAt,
  onStartsAt,
  endsAt,
  onEndsAt,
  compact = false
}: {
  idPrefix: string
  placement: BannerPlacement
  altText: string
  onAltText: (value: string) => void
  startsAt: string
  onStartsAt: (value: string) => void
  endsAt: string
  onEndsAt: (value: string) => void
  compact?: boolean
}) {
  const height = compact ? 'h-8 text-xs' : 'h-9'
  const altRequired = ALT_REQUIRED[placement]
  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        maxLength={250}
        placeholder={
          altRequired
            ? 'Texto alternativo (obligatorio): describe lo que dice el banner'
            : 'Texto alternativo (recomendado)'
        }
        aria-label="Texto alternativo de la imagen"
        value={altText}
        onChange={(event) => onAltText(event.target.value)}
        className={height}
      />
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[hsl(var(--foreground))/0.7]">
        <label htmlFor={`${idPrefix}-starts`} className="font-medium">
          Desde
        </label>
        <Input
          id={`${idPrefix}-starts`}
          type="datetime-local"
          value={startsAt}
          onChange={(event) => onStartsAt(event.target.value)}
          className={`${height} w-auto`}
        />
        <label htmlFor={`${idPrefix}-ends`} className="font-medium">
          Hasta
        </label>
        <Input
          id={`${idPrefix}-ends`}
          type="datetime-local"
          value={endsAt}
          onChange={(event) => onEndsAt(event.target.value)}
          className={`${height} w-auto`}
        />
        <span className="text-[10px] text-[hsl(var(--foreground))/0.5]">
          Hora de México. Vacío = sin límite.
        </span>
      </div>
    </div>
  )
}

function validateFields(
  placement: BannerPlacement,
  link: string,
  altText: string,
  startsInput: string,
  endsInput: string
) {
  if (link) {
    try {
      new URL(link)
    } catch {
      return { error: 'El link debe ser una URL válida (https://...).' }
    }
  }
  if (ALT_REQUIRED[placement] && !altText.trim()) {
    return { error: 'Escribe el texto alternativo (qué dice o muestra el banner).' }
  }
  const startsAt = fromMexicoInputValue(startsInput)
  const endsAt = fromMexicoInputValue(endsInput)
  if ((startsInput && !startsAt) || (endsInput && !endsAt)) {
    return { error: 'Revisa las fechas de vigencia.' }
  }
  const windowError = validateBannerWindow(startsAt, endsAt)
  if (windowError) return { error: windowError }
  return { startsAt, endsAt }
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
  const [altText, setAltText] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
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
    const checked = validateFields(placement, link, altText, startsAt, endsAt)
    if ('error' in checked) {
      setError(checked.error ?? null)
      return
    }
    startTransition(async () => {
      try {
        await createBanner({
          placement,
          image_url: imageUrl,
          link_url: link || null,
          is_active: isActive,
          alt_text: altText.trim() || null,
          starts_at: checked.startsAt,
          ends_at: checked.endsAt
        })
        setImageUrl('')
        setLinkUrl('')
        setAltText('')
        setStartsAt('')
        setEndsAt('')
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
            <ScheduleFields
              idPrefix={`new-${placement}`}
              placement={placement}
              altText={altText}
              onAltText={setAltText}
              startsAt={startsAt}
              onStartsAt={setStartsAt}
              endsAt={endsAt}
              onEndsAt={setEndsAt}
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

type OrderControls = {
  position: number
  total: number
  disabled: boolean
  onMove: (direction: -1 | 1) => void
}

function BannerTableRow({
  banner,
  onChanged,
  order
}: {
  banner: Banner
  onChanged: () => void
  order: OrderControls | null
}) {
  const [imageUrl, setImageUrl] = useState(banner.image_url)
  const [linkUrl, setLinkUrl] = useState(banner.link_url ?? '')
  const [altText, setAltText] = useState(banner.alt_text ?? '')
  const [startsAt, setStartsAt] = useState(toMexicoInputValue(banner.starts_at))
  const [endsAt, setEndsAt] = useState(toMexicoInputValue(banner.ends_at))
  const [isActive, setIsActive] = useState(banner.is_active)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const dirty =
    imageUrl !== banner.image_url ||
    (linkUrl.trim() || null) !== (banner.link_url ?? null) ||
    (altText.trim() || null) !== (banner.alt_text ?? null) ||
    startsAt !== toMexicoInputValue(banner.starts_at) ||
    endsAt !== toMexicoInputValue(banner.ends_at) ||
    isActive !== banner.is_active

  function handleSave() {
    setError(null)
    const link = linkUrl.trim()
    const checked = validateFields(banner.placement, link, altText, startsAt, endsAt)
    if ('error' in checked) {
      setError(checked.error ?? null)
      return
    }
    startTransition(async () => {
      try {
        await updateBanner(banner.id, {
          image_url: imageUrl,
          link_url: link || null,
          is_active: isActive,
          alt_text: altText.trim() || null,
          starts_at: checked.startsAt,
          ends_at: checked.endsAt
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
      <tr className="border-t border-[hsl(var(--border))/0.5] align-top">
        {order ? (
          <td className="w-12 py-2 pr-2">
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => order.onMove(-1)}
                disabled={order.disabled || order.position === 0}
                aria-label="Subir (se muestra antes)"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[hsl(var(--border))] text-xs disabled:opacity-30"
              >
                ↑
              </button>
              <span className="text-[11px] font-semibold text-[hsl(var(--foreground))/0.6]">
                {order.position + 1}
              </span>
              <button
                type="button"
                onClick={() => order.onMove(1)}
                disabled={order.disabled || order.position === order.total - 1}
                aria-label="Bajar (se muestra después)"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[hsl(var(--border))] text-xs disabled:opacity-30"
              >
                ↓
              </button>
            </div>
          </td>
        ) : null}
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
              alt={banner.alt_text || 'Banner'}
              className="h-full w-full object-cover transition group-hover:opacity-80"
            />
          </button>
        </td>
        <td className="min-w-[320px] py-2 pr-2">
          <div className="flex flex-col gap-2">
            <Input
              type="url"
              placeholder="Link — https://..."
              aria-label="Link al hacer click"
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              className="h-8 text-xs"
            />
            <ScheduleFields
              idPrefix={`banner-${banner.id}`}
              placement={banner.placement}
              altText={altText}
              onAltText={setAltText}
              startsAt={startsAt}
              onStartsAt={setStartsAt}
              endsAt={endsAt}
              onEndsAt={setEndsAt}
              compact
            />
          </div>
          {error ? (
            <p className="mt-1 text-[11px] font-medium text-[hsl(var(--danger))]">{error}</p>
          ) : null}
        </td>
        <td className="w-28 py-2 pr-2 text-center">
          <div className="flex flex-col items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="h-4 w-4"
              />
              <span className="sr-only">Activo</span>
            </label>
            <StatusBadge banner={banner} />
          </div>
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
  const orderable = ORDERABLE[placement] && banners.length > 1
  const [orderError, setOrderError] = useState<string | null>(null)
  const [isReordering, startReorder] = useTransition()

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= banners.length) return
    const ids = banners.map((banner) => banner.id)
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    setOrderError(null)
    startReorder(async () => {
      try {
        await reorderBanners(ids)
        onChanged()
      } catch {
        setOrderError('No se pudo guardar el orden. Intenta de nuevo.')
      }
    })
  }

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
        {orderError ? (
          <p className="mb-2 text-xs font-medium text-[hsl(var(--danger))]">{orderError}</p>
        ) : null}
        {banners.length === 0 ? (
          <p className="text-sm text-[hsl(var(--foreground))/0.6]">{copy.empty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-[hsl(var(--foreground))/0.55]">
                  {orderable ? <th className="w-12 py-2 pr-2 text-center">Orden</th> : null}
                  <th className="py-2 pr-2">Imagen</th>
                  <th className="py-2 pr-2">Link, alt y vigencia</th>
                  <th className="w-28 py-2 pr-2 text-center">Estado</th>
                  <th className="py-2 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => (
                  <BannerTableRow
                    key={`${banner.id}-${banner.updated_at}`}
                    banner={banner}
                    onChanged={onChanged}
                    order={
                      orderable
                        ? {
                            position: index,
                            total: banners.length,
                            disabled: isReordering,
                            onMove: (direction) => move(index, direction)
                          }
                        : null
                    }
                  />
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
        rotationNote="Los banners activos y vigentes se muestran como slides en este orden (autoplay cada 5 s). Usa ↑ ↓ para cambiar cuál va primero."
      />
      <PlacementCard
        placement="home_above_store"
        banners={byPlacement('home_above_store')}
        onChanged={refresh}
        rotationNote="Si hay más de uno activo y vigente, se muestra uno al azar en cada visita."
      />
      <PlacementCard
        placement="top"
        banners={byPlacement('top')}
        onChanged={refresh}
        rotationNote="Si hay más de uno activo y vigente, se muestra uno al azar en cada visita."
      />
      <PlacementCard
        placement="sidebar"
        banners={byPlacement('sidebar')}
        onChanged={refresh}
        rotationNote="Si hay más de uno activo y vigente, se muestra uno al azar en cada visita."
      />
    </div>
  )
}
