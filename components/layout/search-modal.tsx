'use client'

import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, LoaderCircle, Search, X } from 'lucide-react'

import type { SearchResponse, SearchResultItem } from '@/lib/api/search'
import { apiRoute } from '@/lib/api/route-url'
import { combineSuggestions } from '@/lib/search/suggestions'
import { cn } from '@/lib/utils'

const OPEN_SEARCH = 'nume:open-search'

export function SearchTrigger({ className }: { className?: string }) {
  return (
    <button type="button" aria-label="Buscar en el sitio" aria-haspopup="dialog" className={className}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        window.dispatchEvent(new Event(OPEN_SEARCH))
      }}>
      <Search size={20} aria-hidden="true" />
    </button>
  )
}

export function SearchModal() {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(-1)
  const term = query.trim()
  const suggestions = combineSuggestions(term, results)

  useEffect(() => {
    const show = () => setOpen(true)
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener(OPEN_SEARCH, show)
    window.addEventListener('keydown', shortcut)
    return () => {
      window.removeEventListener(OPEN_SEARCH, show)
      window.removeEventListener('keydown', shortcut)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open || term.length < 2) return
    const controller = new AbortController()
    let current = true
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(apiRoute(`/api/search?query=${encodeURIComponent(term)}&limit=6`), {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Search failed')
        const data: SearchResponse = await response.json()
        if (!Array.isArray(data.data)) throw new Error('Invalid response')
        if (current) {
          setResults(data.data)
          setActive(-1)
        }
      } catch {
        if (current) setFailed(true)
      } finally {
        if (current) setLoading(false)
      }
    }, 250)
    return () => {
      current = false
      clearTimeout(timer)
      controller.abort()
    }
  }, [open, term])

  useEffect(() => {
    if (active >= 0) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, listId])

  function changeQuery(value: string) {
    setQuery(value)
    if (value.trim() === term) return
    setResults([])
    setFailed(false)
    setActive(-1)
    setLoading(value.trim().length >= 2)
  }

  function close() {
    setOpen(false)
    changeQuery('')
  }

  function navigate(href: string) {
    close()
    router.push(href as Route)
  }

  return (
    <dialog ref={dialogRef} aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); close() }}
      onClick={(event) => { if (event.target === event.currentTarget) close() }}
      className="fixed inset-x-0 bottom-auto top-[8dvh] m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-3xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-sm sm:top-[15dvh]">
      <div className="flex max-h-[80dvh] flex-col sm:max-h-[70dvh]">
        <div className="flex items-center justify-between px-5 pb-2 pt-5 sm:px-6">
          <h2 id={titleId} className="text-sm font-semibold text-primary">Explora Numerología Cotidiana</h2>
          <button type="button" onClick={close} aria-label="Cerrar buscador"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground/60 hover:bg-secondary focus-visible:outline-primary">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <form className="flex items-center gap-3 border-b border-border px-5 pb-5 sm:px-6"
          onSubmit={(event) => {
            event.preventDefault()
            if (active >= 0 && suggestions[active]) navigate(suggestions[active].href)
            else if (term) navigate(`/busqueda?q=${encodeURIComponent(term)}`)
          }}>
          <Search className="shrink-0 text-primary" size={24} aria-hidden="true" />
          <input ref={inputRef} value={query} onChange={(event) => changeQuery(event.target.value)}
            role="combobox" aria-label="Buscar artículos, números y herramientas" aria-autocomplete="list"
            aria-expanded={open && suggestions.length > 0} aria-controls={listId}
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            autoComplete="off" spellCheck={false} maxLength={200}
            placeholder="¿Qué quieres descubrir?"
            className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-foreground/40 sm:text-xl"
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing) return
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
                if (suggestions.length) setActive((value) => event.key === 'ArrowDown'
                  ? (value + 1) % suggestions.length
                  : (value <= 0 ? suggestions.length - 1 : value - 1))
              }
            }} />
          {loading ? <LoaderCircle size={20} className="shrink-0 animate-spin text-primary" aria-hidden="true" /> : null}
        </form>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-3 py-4 sm:px-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">
            {term ? 'Sugerencias para ti' : 'Empieza por aquí'}
          </p>
          <ul id={listId} role="listbox" aria-label="Sugerencias de búsqueda">
            {suggestions.map((item, index) => (
              <li key={item.href} id={`${listId}-${index}`} role="option" aria-selected={active === index}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActive(index)} onClick={() => navigate(item.href)}
                className={cn('flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3',
                  active === index ? 'bg-primary-soft text-primary' : 'hover:bg-secondary/60')}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Search size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-sm font-semibold">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-foreground/55">{item.kind}</span>
                  {item.description ? <span className="mt-1 block text-sm leading-5 text-foreground/65">{item.description}</span> : null}
                </span>
                <ArrowUpRight size={17} className="shrink-0 text-foreground/40" aria-hidden="true" />
              </li>
            ))}
          </ul>
          <p role="status" className="px-3 text-sm text-foreground/60">
            {loading ? 'Buscando artículos y guías…' : failed ? 'No pudimos cargar las notas y páginas. Puedes usar los accesos rápidos o intentar de nuevo.'
              : term && suggestions.length === 0 ? `No encontramos coincidencias para «${term}». Prueba con otras palabras.`
              : <span className="sr-only">{suggestions.length} sugerencias disponibles.</span>}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-secondary/30 px-6 py-4">
          <span className="text-xs text-foreground/55">↑ ↓ elegir · Enter abrir · Esc cerrar</span>
          {term ? <button type="button" onClick={() => navigate(`/busqueda?q=${encodeURIComponent(term)}`)}
            className="text-sm font-semibold text-primary hover:underline">Ver todos los resultados →</button>
            : <span className="text-xs text-foreground/45">Ctrl / ⌘ K</span>}
        </div>
      </div>
    </dialog>
  )
}
