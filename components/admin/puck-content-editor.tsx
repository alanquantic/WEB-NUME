'use client'

import { Puck, usePuck, type Data } from '@puckeditor/core'
import '@puckeditor/core/puck.css'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type {
  AdminContentDetail,
  Category,
  ContentMutationInput,
  MediaImageItem,
  PostStatus,
  Tag
} from '@/lib/api/contracts'
import { createContent, updateContent, type ContentKind } from '@/lib/api/content.client'
import { createMediaUploadSignature, getMediaImages } from '@/lib/api/media'
import {
  createPuckConfig,
  emptyPuckData,
  isPuckData,
  renderPuckDataToHtml
} from '@/lib/puck/config'
import { cn } from '@/lib/utils'

const statusOptions: Array<{ value: PostStatus; label: string }> = [
  { value: 'draft', label: 'Borrador' },
  { value: 'published', label: 'Publicado' },
  { value: 'scheduled', label: 'Programado' },
  { value: 'archived', label: 'Archivado' }
]

const statusPill: Record<PostStatus, string> = {
  draft: 'bg-[hsl(var(--secondary)/0.18)] text-[hsl(var(--foreground))/0.7]',
  published: 'bg-[hsl(160_84%_39%/0.15)] text-[hsl(160_84%_28%)]',
  scheduled: 'bg-[hsl(46_64%_52%/0.18)] text-[hsl(38_70%_32%)]',
  archived: 'bg-[hsl(var(--foreground)/0.08)] text-[hsl(var(--foreground)/0.55)]'
}

const fieldClassName = cn(
  'h-11 w-full rounded-2xl border border-[hsl(var(--border))] bg-white px-4 text-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]'
)

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180)
}

function toIsoOrNull(localValue: string): string | null {
  if (!localValue) return null
  const date = new Date(localValue)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}

function resolveError(error: unknown): string {
  const message = error instanceof Error ? error.message : ''
  if (message.includes('409')) return 'Ya existe contenido con ese slug. Usa uno distinto.'
  if (message.includes('400')) return 'Revisa los campos: hay datos inválidos.'
  if (message.includes('403')) return 'No tienes permisos para esta acción.'
  return 'No fue posible guardar. Inténtalo de nuevo.'
}

function formatBytes(value: number | null): string {
  if (!value || value <= 0) return ''
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`
  return `${(value / (1024 * 1024)).toFixed(1)} MB`
}

type PuckContentEditorProps = {
  kind: ContentKind
  categories: Category[]
  tags: Tag[]
  initial?: AdminContentDetail
}

type MediaTarget =
  | { kind: 'featured' }
  | { kind: 'puck-image'; currentValue: string; onSelect: (url: string) => void }

function EditorPanels() {
  const { selectedItem, dispatch } = usePuck()
  const selectedId = selectedItem?.props.id

  useEffect(() => {
    if (!selectedId) return
    function revealFields() {
      if (window.innerWidth < 638) return
      // On tablets, make room for the selected block and its fields.
      dispatch({
        type: 'setUi',
        ui: {
          rightSideBarVisible: true,
          ...(window.innerWidth < 1100 ? { leftSideBarVisible: false } : {})
        }
      })
    }
    revealFields()
    window.addEventListener('resize', revealFields)
    return () => window.removeEventListener('resize', revealFields)
  }, [selectedId, dispatch])

  return null
}

function EditorWorkspace({ children }: { children: React.ReactNode }) {
  return <><EditorPanels />{children}</>
}

export function PuckContentEditor({ kind, categories, tags, initial }: PuckContentEditorProps) {
  const router = useRouter()
  const isEdit = Boolean(initial)
  const isPost = kind === 'posts'
  const singular = isPost ? 'post' : 'página'
  const listHref = isPost ? '/perfil/posts' : '/perfil/pages'
  const publicPrefix = isPost ? '/' : '/paginas/'

  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [status, setStatus] = useState<PostStatus>(initial?.status ?? 'draft')
  const [requiresMembership, setRequiresMembership] = useState(
    initial?.requires_membership ?? false
  )
  const [featuredImageUrl, setFeaturedImageUrl] = useState(initial?.featured_image_url ?? '')
  const [publishedAt, setPublishedAt] = useState(toLocalInput(initial?.published_at ?? null))
  const [categoryId, setCategoryId] = useState<string>(
    initial?.category_id ? String(initial.category_id) : ''
  )
  const [selectedTags, setSelectedTags] = useState<number[]>(initial?.tag_ids ?? [])
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  const [mediaItems, setMediaItems] = useState<MediaImageItem[]>([])
  const [mediaCursor, setMediaCursor] = useState<string | null>(null)
  const [isLoadingMedia, setIsLoadingMedia] = useState(false)
  const [isUploadingMedia, setIsUploadingMedia] = useState(false)
  const [mediaError, setMediaError] = useState<string | null>(null)
  const [selectedMediaUrl, setSelectedMediaUrl] = useState(initial?.featured_image_url ?? '')
  const [mediaTarget, setMediaTarget] = useState<MediaTarget>({ kind: 'featured' })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [data, setData] = useState<Data>(
    isPuckData(initial?.content_json) ? (initial?.content_json as Data) : emptyPuckData
  )

  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  // Recién creado como borrador: viene de `nuevo` con ?borrador=1. En cliente para
  // que la hora del aviso no difiera entre SSR e hidratación.
  useEffect(() => {
    if (isEdit && searchParams.get('borrador') === '1') setSavedAt(new Date())
  }, [isEdit, searchParams])
  const [isPending, startTransition] = useTransition()

  const effectiveSlug = slugTouched ? slug : slugify(title)
  const statusLabel = statusOptions.find((option) => option.value === status)?.label ?? status
  const puckConfig = useMemo(
    () =>
      createPuckConfig({
        openImageLibrary: ({ currentValue, onSelect }) => {
          setMediaTarget({ kind: 'puck-image', currentValue, onSelect })
          setSelectedMediaUrl(currentValue)
          setIsMediaModalOpen(true)
        }
      }),
    []
  )

  function toggleTag(id: number) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    )
  }

  async function loadMedia(reset = false) {
    setIsLoadingMedia(true)
    setMediaError(null)

    try {
      const response = await getMediaImages(reset ? undefined : mediaCursor ?? undefined)
      setMediaItems((prev) => (reset ? response.items : [...prev, ...response.items]))
      setMediaCursor(response.next_cursor)
    } catch (caught) {
      setMediaError(resolveError(caught))
    } finally {
      setIsLoadingMedia(false)
    }
  }

  async function handleUploadFile(file: File) {
    setIsUploadingMedia(true)
    setMediaError(null)

    try {
      const signed = await createMediaUploadSignature(file.name)
      const formData = new FormData()
      formData.set('file', file)
      formData.set('api_key', signed.api_key)
      formData.set('folder', signed.folder)
      formData.set('public_id', signed.public_id)
      formData.set('signature', signed.signature)
      formData.set('tags', signed.tags)
      formData.set('timestamp', String(signed.timestamp))

      const response = await fetch(signed.upload_url, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`)
      }

      const uploaded = (await response.json()) as {
        asset_id?: string
        public_id: string
        secure_url: string
        width?: number
        height?: number
        bytes?: number
        format?: string
        original_filename?: string
        created_at?: string
      }

      const nextItem: MediaImageItem = {
        id: uploaded.asset_id ?? uploaded.public_id,
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
        width: uploaded.width ?? null,
        height: uploaded.height ?? null,
        bytes: uploaded.bytes ?? null,
        format: uploaded.format ?? null,
        original_filename: uploaded.original_filename ?? file.name,
        created_at: uploaded.created_at ?? null
      }

      setMediaItems((prev) => [nextItem, ...prev])
      setSelectedMediaUrl(nextItem.url)

      if (mediaTarget.kind === 'featured') {
        setFeaturedImageUrl(nextItem.url)
      } else {
        mediaTarget.onSelect(nextItem.url)
      }
    } catch (caught) {
      setMediaError(resolveError(caught))
    } finally {
      setIsUploadingMedia(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  useEffect(() => {
    if (!isMediaModalOpen || mediaItems.length > 0 || isLoadingMedia) return
    void loadMedia(true)
  }, [isLoadingMedia, isMediaModalOpen, mediaItems.length])

  // `asDraft`: guarda como borrador y se queda en el editor para seguir editando.
  // Si no, guarda con el estado elegido (un borrador se publica) y vuelve al listado.
  function handleSave(asDraft: boolean) {
    setError(null)
    setSavedAt(null)

    const nextStatus: PostStatus = asDraft ? 'draft' : status === 'draft' ? 'published' : status

    if (!title.trim()) return setError('El título es obligatorio.')
    if (!effectiveSlug) return setError('El slug es obligatorio.')
    if (nextStatus === 'scheduled' && !toIsoOrNull(publishedAt)) {
      return setError('Para programar necesitas una fecha de publicación válida.')
    }

    const html = renderPuckDataToHtml(data)
    const hasBlocks = Array.isArray(data.content) && data.content.length > 0

    // Al actualizar algo ya publicado se conserva su fecha original (null la reinicia a "ahora").
    const keepPublishedAt = isEdit && initial?.status === 'published' && nextStatus === 'published'

    const payload: ContentMutationInput = {
      title: title.trim(),
      slug: effectiveSlug,
      status: nextStatus,
      requires_membership: requiresMembership,
      featured_image_url: featuredImageUrl.trim() ? featuredImageUrl.trim() : null,
      // Nunca null: el trigger `tr_revisions_limit` copia OLD.content_json a post_revisions
      // (NOT NULL), así que un borrador creado sin bloques no podría volver a guardarse.
      content_json: data as unknown,
      content_html: hasBlocks && html ? html : null,
      published_at:
        nextStatus === 'scheduled'
          ? toIsoOrNull(publishedAt)
          : keepPublishedAt
            ? undefined
            : null
    }

    if (isPost) {
      payload.category_id = categoryId ? Number(categoryId) : null
      payload.tag_ids = selectedTags
    }

    startTransition(async () => {
      try {
        const saved =
          isEdit && initial
            ? await updateContent(kind, initial.id, payload)
            : await createContent(kind, payload)

        if (!asDraft) {
          router.push(listHref)
          router.refresh()
          return
        }

        setStatus('draft')
        setSlug(effectiveSlug)
        setSlugTouched(true)
        if (isEdit) {
          setSavedAt(new Date())
          router.refresh()
        } else {
          // Ya existe en BD: pasar a la ruta de edición para que los siguientes guardados actualicen.
          router.replace(`${listHref}/${saved.item.id}/editar?borrador=1`)
        }
      } catch (caught) {
        setError(resolveError(caught))
      }
    })
  }

  const primaryLabel =
    status === 'scheduled'
      ? 'Programar'
      : status === 'archived'
        ? 'Guardar'
        : isEdit && initial?.status === 'published'
          ? 'Actualizar'
          : 'Publicar'

  return (
    <div className="content-editor grid min-w-0 gap-4 sm:gap-5">
      {/* Barra de acción superior */}
      <div className="editor-actions z-30 flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-[hsl(var(--border))] bg-white/95 px-3 py-3 shadow-panel backdrop-blur sm:px-4">
        <div className="flex items-center gap-3">
          <Link
            href={listHref}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))/0.7] transition hover:bg-[hsl(var(--secondary)/0.18)]"
            aria-label="Volver"
          >
            ←
          </Link>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[hsl(var(--foreground))/0.45]">
              {isPost ? 'Post' : 'Página'}
            </p>
            <h1 className="font-display text-lg font-semibold leading-tight">
              {isEdit ? `Editar ${singular}` : isPost ? 'Nuevo post' : 'Nueva página'}
            </h1>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <span className={cn('rounded-full px-3 py-1.5 text-xs font-semibold', statusPill[status])}>
            {statusLabel}
          </span>
          {savedAt ? (
            <span className="text-xs text-[hsl(var(--foreground))/0.55]" role="status">
              Borrador guardado{' '}
              {savedAt.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(listHref)}
            disabled={isPending}
            className="shrink-0 px-3 sm:px-5"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleSave(true)}
            disabled={isPending}
            className="shrink-0 whitespace-nowrap px-3 sm:px-5"
          >
            {isPending ? 'Guardando…' : 'Guardar borrador'}
          </Button>
          <Button type="button" onClick={() => handleSave(false)} disabled={isPending}>
            {isPending ? 'Guardando…' : primaryLabel}
          </Button>
        </div>
      </div>

      {/* Título grande + slug */}
      <div className="min-w-0 rounded-3xl bg-white p-4 shadow-panel sm:p-6">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={`Añade el título de la ${singular}…`}
          aria-label="Título"
          className="min-w-0 w-full border-none bg-transparent font-display text-2xl font-semibold leading-tight outline-none placeholder:text-[hsl(var(--foreground))/0.3] sm:text-3xl"
        />
        <div className="mt-3 flex items-center gap-1 text-sm text-[hsl(var(--foreground))/0.55]">
          <span className="shrink-0">{publicPrefix}</span>
          <input
            value={effectiveSlug}
            onChange={(event) => {
              setSlugTouched(true)
              setSlug(slugify(event.target.value))
            }}
            placeholder="slug"
            aria-label="Slug"
            className="min-w-0 w-full border-none bg-transparent font-medium text-[hsl(var(--primary))] outline-none"
          />
        </div>
      </div>

      {/* Ajustes de publicación (colapsable) */}
      <details className="group min-w-0 rounded-3xl bg-white px-4 py-4 shadow-panel sm:px-6" open>
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
          <span>Ajustes de publicación</span>
          <span className="text-[hsl(var(--foreground))/0.5] transition group-open:rotate-180">⌄</span>
        </summary>

        <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3 [&>div]:min-w-0">
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="status">
              Estado
            </label>
            <select
              id="status"
              className={fieldClassName}
              value={status}
              onChange={(event) => setStatus(event.target.value as PostStatus)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {status === 'scheduled' ? (
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="published_at">
                Fecha de publicación
              </label>
              <Input
                id="published_at"
                type="datetime-local"
                value={publishedAt}
                onChange={(event) => setPublishedAt(event.target.value)}
              />
            </div>
          ) : null}

          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="featured_image_url">
              Imagen destacada
            </label>
            <div className="grid gap-3">
              <div className="flex gap-2">
                <Input
                  id="featured_image_url"
                  className="min-w-0 flex-1"
                  type="url"
                  value={featuredImageUrl}
                  onChange={(event) => {
                    setFeaturedImageUrl(event.target.value)
                    setSelectedMediaUrl(event.target.value)
                  }}
                  placeholder="https://…"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="shrink-0 whitespace-nowrap"
                  onClick={() => {
                    setMediaTarget({ kind: 'featured' })
                    setSelectedMediaUrl(featuredImageUrl)
                    setIsMediaModalOpen(true)
                  }}
                >
                  Media
                </Button>
              </div>
              {featuredImageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))]">
                  <img
                    src={featuredImageUrl}
                    alt="Vista previa de imagen destacada"
                    className="h-40 w-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>

          {isPost ? (
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="category">
                Categoría
              </label>
              <select
                id="category"
                className={fieldClassName}
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <option value="">Sin categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <label className="flex items-center gap-3 self-end pb-2.5 text-sm font-semibold">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[hsl(var(--border))]"
              checked={requiresMembership}
              onChange={(event) => setRequiresMembership(event.target.checked)}
            />
            Requiere membresía
          </label>
        </div>

        {isPost && tags.length > 0 ? (
          <div className="mt-4 grid gap-2">
            <span className="text-sm font-semibold">Tags</span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <label
                  key={tag.id}
                  className={cn(
                    'cursor-pointer rounded-full border px-3 py-1.5 text-sm transition',
                    selectedTags.includes(tag.id)
                      ? 'border-transparent bg-[hsl(var(--primary))] text-white'
                      : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/0.4]'
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
        ) : null}
      </details>

      {error ? (
        <p className="rounded-2xl bg-[hsl(var(--danger))/0.12] px-4 py-3 text-sm font-medium text-[hsl(var(--danger))]">
          {error}
        </p>
      ) : null}

      {/* Constructor de bloques (Puck) */}
      <div className="grid gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <span className="text-sm font-semibold">Contenido</span>
          <span className="text-xs text-[hsl(var(--foreground))/0.5]">
            Añade bloques al lienzo y selecciónalos para editar
          </span>
        </div>
        <div className="nume-puck min-w-0 overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-panel">
          <Puck
            config={puckConfig}
            data={data}
            onChange={setData}
            iframe={{ enabled: false }}
            height="clamp(560px, 74dvh, 1000px)"
            headerTitle="Contenido"
            ui={{ rightSideBarVisible: false }}
            overrides={{ headerActions: () => <></>, puck: EditorWorkspace }}
          />
        </div>
      </div>

      {isMediaModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--border))] px-4 py-4 sm:px-6">
              <div>
                <h2 className="font-display text-xl font-semibold">Biblioteca de medios</h2>
                <p className="text-sm text-[hsl(var(--foreground))/0.6]">
                  Selecciona una imagen existente o sube una nueva a Cloudinary.
                </p>
              </div>
              <Button type="button" variant="secondary" onClick={() => setIsMediaModalOpen(false)}>
                Cerrar
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-b border-[hsl(var(--border))] px-6 py-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) {
                    void handleUploadFile(file)
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingMedia}
              >
                {isUploadingMedia ? 'Subiendo…' : 'Subir imagen'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => void loadMedia(true)}
                disabled={isLoadingMedia}
              >
                {isLoadingMedia ? 'Cargando…' : 'Recargar'}
              </Button>
              <div className="min-w-0 basis-full break-all rounded-2xl border border-dashed border-[hsl(var(--border))] px-4 py-3 text-sm text-[hsl(var(--foreground))/0.6] sm:flex-1 sm:basis-auto">
                {selectedMediaUrl ? selectedMediaUrl : 'Aún no has seleccionado una imagen.'}
              </div>
              <Button
                type="button"
                onClick={() => {
                  if (mediaTarget.kind === 'featured') {
                    setFeaturedImageUrl(selectedMediaUrl)
                  } else {
                    mediaTarget.onSelect(selectedMediaUrl)
                  }
                  setIsMediaModalOpen(false)
                }}
                disabled={!selectedMediaUrl}
              >
                Usar imagen
              </Button>
            </div>

            {mediaError ? (
              <p className="px-6 pt-4 text-sm font-medium text-[hsl(var(--danger))]">{mediaError}</p>
            ) : null}

            <div className="grid flex-1 gap-4 overflow-y-auto p-6 md:grid-cols-[minmax(0,1fr)_280px]">
              <div className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {mediaItems.map((item) => {
                  const isActive = selectedMediaUrl === item.url

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedMediaUrl(item.url)}
                      className={cn(
                        'overflow-hidden rounded-[1.5rem] border text-left transition',
                        isActive
                          ? 'border-[hsl(var(--primary))] shadow-lg shadow-[hsl(var(--primary))/0.15]'
                          : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/0.35]'
                      )}
                    >
                      <img
                        src={item.url}
                        alt={item.original_filename ?? 'Imagen subida'}
                        className="h-44 w-full bg-[hsl(var(--secondary))] object-cover"
                      />
                      <div className="grid gap-1 px-4 py-3">
                        <p className="truncate text-sm font-semibold">
                          {item.original_filename ?? item.public_id}
                        </p>
                        <p className="text-xs text-[hsl(var(--foreground))/0.55]">
                          {[item.width && item.height ? `${item.width}×${item.height}` : '', formatBytes(item.bytes)]
                            .filter(Boolean)
                            .join(' · ') || 'Sin metadatos'}
                        </p>
                      </div>
                    </button>
                  )
                })}

                {!isLoadingMedia && mediaItems.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[hsl(var(--border))] px-6 py-10 text-sm text-[hsl(var(--foreground))/0.6]">
                    Todavía no hay imágenes en tu biblioteca.
                  </div>
                ) : null}
              </div>

              <aside className="grid content-start gap-4 rounded-[1.5rem] border border-[hsl(var(--border))] bg-[hsl(var(--secondary))/0.45] p-4">
                {selectedMediaUrl ? (
                  <>
                    <img
                      src={selectedMediaUrl}
                      alt="Imagen seleccionada"
                      className="h-52 w-full rounded-[1.25rem] object-cover"
                    />
                    <div className="grid gap-2 text-sm">
                      <p className="font-semibold">URL seleccionada</p>
                      <p className="break-all text-[hsl(var(--foreground))/0.65]">{selectedMediaUrl}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-[hsl(var(--foreground))/0.6]">
                    Elige una imagen para verla aquí antes de asignarla como destacada.
                  </p>
                )}

                {mediaCursor ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => void loadMedia(false)}
                    disabled={isLoadingMedia}
                  >
                    {isLoadingMedia ? 'Cargando…' : 'Cargar más'}
                  </Button>
                ) : null}
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
