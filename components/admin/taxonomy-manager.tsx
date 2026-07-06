'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Category, Tag } from '@/lib/api/contracts'
import {
  createCategory,
  createTag,
  deleteCategory,
  deleteTag
} from '@/lib/api/taxonomy.client'
import { cn } from '@/lib/utils'

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

type Kind = 'category' | 'tag'

function TaxonomySection({
  kind,
  title,
  items
}: {
  kind: Kind
  title: string
  items: Array<Category | Tag>
}) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const effectiveSlug = slugTouched ? slug : slugify(name)

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    if (!name.trim() || !effectiveSlug) {
      setError('Nombre y slug son obligatorios.')
      return
    }

    startTransition(async () => {
      try {
        const payload = { name: name.trim(), slug: effectiveSlug }
        if (kind === 'category') await createCategory(payload)
        else await createTag(payload)
        setName('')
        setSlug('')
        setSlugTouched(false)
        router.refresh()
      } catch (caught) {
        const message = caught instanceof Error ? caught.message : ''
        setError(message.includes('409') ? 'Ese slug ya existe.' : 'No se pudo crear.')
      }
    })
  }

  function handleDelete(id: number, label: string) {
    if (!window.confirm(`¿Eliminar "${label}"?`)) return
    startTransition(async () => {
      try {
        if (kind === 'category') await deleteCategory(id)
        else await deleteTag(id)
        router.refresh()
      } catch {
        setError('No se pudo eliminar.')
      }
    })
  }

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-panel">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>

      <form onSubmit={handleCreate} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre" />
        <Input
          value={effectiveSlug}
          onChange={(event) => {
            setSlugTouched(true)
            setSlug(slugify(event.target.value))
          }}
          placeholder="slug"
        />
        <Button type="submit" disabled={isPending}>
          Añadir
        </Button>
      </form>

      {error ? (
        <p className="mt-3 text-sm font-medium text-[hsl(var(--danger))]">{error}</p>
      ) : null}

      <ul className={cn('mt-5 grid gap-2', items.length === 0 && 'text-sm')}>
        {items.length === 0 ? (
          <li className="text-[hsl(var(--foreground))/0.6]">Aún no hay elementos.</li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-[hsl(var(--border))/0.6] px-4 py-2.5 text-sm"
            >
              <span>
                <span className="font-medium">{item.name}</span>{' '}
                <span className="text-[hsl(var(--foreground))/0.5]">/{item.slug}</span>
              </span>
              <button
                type="button"
                onClick={() => handleDelete(item.id, item.name)}
                disabled={isPending}
                className="text-sm font-semibold text-[hsl(var(--danger))] disabled:opacity-50"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export function TaxonomyManager({
  categories,
  tags
}: {
  categories: Category[]
  tags: Tag[]
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TaxonomySection kind="category" title="Categorías" items={categories} />
      <TaxonomySection kind="tag" title="Tags" items={tags} />
    </div>
  )
}
