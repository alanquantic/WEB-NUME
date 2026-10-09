'use client'

import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import { useState } from 'react'

import { trackCalculatorResultSave } from '@/lib/analytics/calculator'
import type { CalculatorId } from '@/lib/analytics/events'
import { addSavedResult } from '@/lib/saved-results'

export function SaveResultButton({
  label,
  value,
  detail,
  href,
  calculatorId
}: {
  label: string
  value: number | string
  /** Datos usados en el cálculo, legibles, para mostrarse en Mi carta. */
  detail?: string
  /** Ruta al cálculo con los datos precargados; Mi carta la usa como link. */
  href?: string
  /** ID de la calculadora que produjo este resultado, para analytics. */
  calculatorId?: CalculatorId
}) {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    addSavedResult({ label, value: String(value), detail, href })
    setSaved(true)
    if (calculatorId) trackCalculatorResultSave(calculatorId)
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
