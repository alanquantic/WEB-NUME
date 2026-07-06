'use client'

import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import { useState } from 'react'

import { addSavedResult } from '@/lib/saved-results'

export function SaveResultButton({ label, value }: { label: string; value: number | string }) {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    addSavedResult({ label, value: String(value) })
    setSaved(true)
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={saved}
      className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft disabled:cursor-default disabled:opacity-70"
    >
      {saved ? (
        <>
          <BookmarkCheck size={16} aria-hidden /> Guardado en Mi carta
        </>
      ) : (
        <>
          <BookmarkPlus size={16} aria-hidden /> Guardar resultado
        </>
      )}
    </button>
  )
}
