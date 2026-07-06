'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { deleteContent, type ContentKind } from '@/lib/api/content.client'

type ContentRowActionsProps = {
  kind: ContentKind
  id: string
  title: string
}

export function ContentRowActions({ kind, id, title }: ContentRowActionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState(false)

  function handleDelete() {
    if (!window.confirm(`¿Eliminar "${title}"? Se moverá a la papelera (soft delete).`)) return
    setError(false)
    startTransition(async () => {
      try {
        await deleteContent(kind, id)
        router.refresh()
      } catch {
        setError(true)
      }
    })
  }

  return (
    <div className="flex items-center justify-end gap-3">
      {error ? <span className="text-xs text-[hsl(var(--danger))]">Error</span> : null}
      <Link
        href={
          kind === 'posts' ? `/perfil/posts/${id}/editar` : `/perfil/pages/${id}/editar`
        }
        className="text-sm font-semibold text-[hsl(var(--primary))]"
      >
        Editar
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-sm font-semibold text-[hsl(var(--danger))] disabled:opacity-50"
      >
        {isPending ? 'Eliminando…' : 'Eliminar'}
      </button>
    </div>
  )
}
