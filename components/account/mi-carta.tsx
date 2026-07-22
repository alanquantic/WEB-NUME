'use client'

import { Trash2 } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { formatDate } from '@/lib/format'
import {
  clearSavedResults,
  getSavedResults,
  removeSavedResult,
  type SavedResult
} from '@/lib/saved-results'

export function MiCarta() {
  const [items, setItems] = useState<SavedResult[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setItems(getSavedResults())
    setLoaded(true)
  }, [])

  function handleRemove(id: string) {
    removeSavedResult(id)
    setItems(getSavedResults())
  }

  function handleClear() {
    clearSavedResults()
    setItems([])
  }

  if (!loaded) return null

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-border/70 bg-card p-10 text-center shadow-panel">
        <p className="font-display text-xl font-semibold text-primary">Aún no has guardado nada</p>
        <p className="mt-2 text-sm leading-6 text-foreground/70">
          Calcula tus números y toca &ldquo;Guardar resultado&rdquo; para tenerlos aquí, todos
          juntos.
        </p>
        <Link
          href="/calculadoras"
          className="mt-5 inline-flex rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
        >
          Ir a las calculadoras
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const content = (
            <>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-2xl font-semibold text-white shadow-glow">
                {item.value}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-foreground">
                  {item.label}
                </p>
                {item.detail ? (
                  <p className="truncate text-xs text-foreground/65">{item.detail}</p>
                ) : null}
                <p className="text-xs text-foreground/55">{formatDate(item.date)}</p>
              </div>
            </>
          )

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-[1.5rem] border border-border/80 bg-card p-5 shadow-panel"
            >
              {item.href ? (
                <Link
                  href={item.href as Route}
                  className="flex min-w-0 flex-1 items-center gap-4 rounded-[1rem] transition hover:opacity-85"
                  aria-label={`Abrir ${item.label} con tus datos guardados`}
                >
                  {content}
                </Link>
              ) : (
                <div className="flex min-w-0 flex-1 items-center gap-4">{content}</div>
              )}
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                aria-label={`Eliminar ${item.label}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/50 transition hover:bg-danger/10 hover:text-danger"
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={handleClear}
        className="mt-6 text-sm font-semibold text-foreground/60 transition hover:text-danger"
      >
        Borrar todo
      </button>
    </div>
  )
}
