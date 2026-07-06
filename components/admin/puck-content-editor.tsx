'use client'

import { Puck, type Data } from '@puckeditor/core'
import '@puckeditor/core/puck.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type {
  AdminContentDetail,
  Category,
  ContentMutationInput,
  PostStatus,
  Tag
} from '@/lib/api/contracts'
import { createContent, updateContent, type ContentKind } from '@/lib/api/content.client'
import {
  emptyPuckData,
  isPuckData,
  puckConfig,
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
  draft: 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))/0.7]',
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

type PuckContentEditorProps = {
  kind: ContentKind
  categories: Category[]
  tags: Tag[]
  initial?: AdminContentDetail
}

export function PuckContentEditor({ kind, categories, tags, initial }: PuckContentEditorProps) {
  const router = useRouter()
  const isEdit = Boolean(initial)
  const isPost = kind === 'posts'
  const singular = isPost ? 'post' : 'página'
  const listHref = isPost ? '/perfil/posts' : '/perfil/pages'
  const publicPrefix = isPost ? '/blog/' : '/paginas/'

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

  const [data, setData] = useState<Data>(
    isPuckData(initial?.content_json) ? (initial?.content_json as Data) : emptyPuckData
  )

  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const effectiveSlug = slugTouched ? slug : slugify(title)
  const statusLabel = statusOptions.find((option) => option.value === status)?.label ?? status

  function toggleTag(id: number) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    )
  }

  function handleSave() {
    setError(null)

    if (!title.trim()) return setError('El título es obligatorio.')
    if (!effectiveSlug) return setError('El slug es obligatorio.')
    if (status === 'scheduled' && !toIsoOrNull(publishedAt)) {
      return setError('Para programar necesitas una fecha de publicación válida.')
    }

    const html = renderPuckDataToHtml(data)
    const hasBlocks = Array.isArray(data.content) && data.content.length > 0

    const payload: ContentMutationInput = {
      title: title.trim(),
      slug: effectiveSlug,
      status,
      requires_membership: requiresMembership,
      featured_image_url: featuredImageUrl.trim() ? featuredImageUrl.trim() : null,
      content_json: hasBlocks ? (data as unknown) : null,
      content_html: hasBlocks && html ? html : null,
      published_at: status === 'scheduled' ? toIsoOrNull(publishedAt) : null
    }

    if (isPost) {
      payload.category_id = categoryId ? Number(categoryId) : null
      payload.tag_ids = selectedTags
    }

    startTransition(async () => {
      try {
        if (isEdit && initial) {
          await updateContent(kind, initial.id, payload)
        } else {
          await createContent(kind, payload)
        }
        router.push(listHref)
        router.refresh()
      } catch (caught) {
        setError(resolveError(caught))
      }
    })
  }

  return (
    <div className="grid gap-5">
      {/* Barra de acción superior */}
      <div className="sticky top-4 z-30 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-[hsl(var(--border))] bg-white/90 px-4 py-3 shadow-panel backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href={listHref}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))/0.7] transition hover:bg-[hsl(var(--secondary))]"
            aria-label="Volver"
          >
            ←
          </Link>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[hsl(var(--foreground))/0.45]">
              {isPost ? 'Post' : 'Página'}
            </p>
            <h1 className="font-display text-lg font-semibold leading-tight">
              {isEdit ? `Editar ${singular}` : `Nuevo ${singular}`}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('rounded-full px-3 py-1.5 text-xs font-semibold', statusPill[status])}>
            {statusLabel}
          </span>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(listHref)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? 'Guardando…' : isEdit ? 'Guardar' : 'Publicar'}
          </Button>
        </div>
      </div>

      {/* Título grande + slug */}
      <div className="rounded-[2rem] bg-white p-6 shadow-panel">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={`Añade el título de la ${singular}…`}
          className="w-full border-none bg-transparent font-display text-3xl font-semibold leading-tight outline-none placeholder:text-[hsl(var(--foreground))/0.3]"
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
            className="w-full border-none bg-transparent font-medium text-[hsl(var(--primary))] outline-none"
          />
        </div>
      </div>

      {/* Ajustes de publicación (colapsable) */}
      <details className="group rounded-[2rem] bg-white px-6 py-4 shadow-panel" open>
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
          <span>Ajustes de publicación</span>
          <span className="text-[hsl(var(--foreground))/0.5] transition group-open:rotate-180">⌄</span>
        </summary>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              Imagen destacada (URL)
            </label>
            <Input
              id="featured_image_url"
              type="url"
              value={featuredImageUrl}
              onChange={(event) => setFeaturedImageUrl(event.target.value)}
              placeholder="https://…"
            />
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
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-semibold">Contenido</span>
          <span className="text-xs text-[hsl(var(--foreground))/0.5]">
            Arrastra bloques desde la izquierda al lienzo
          </span>
        </div>
        <div className="nume-puck overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-white shadow-panel">
          <div className="h-[74vh] min-h-[560px]">
            <Puck
              config={puckConfig}
              data={data}
              onChange={setData}
              iframe={{ enabled: false }}
              overrides={{ header: () => <></> }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
