'use client'

import { useRef, useState } from 'react'

const PDF_MAX_BYTES = 50 * 1024 * 1024

type PuckPdfFieldProps = {
  value: string
  onChange: (url: string) => void
  uploadPdf?: (file: File) => Promise<string>
}

export function PuckPdfField({ value, onChange, uploadPdf }: PuckPdfFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    if (file.type !== 'application/pdf') return setError('El archivo debe ser un PDF.')
    if (file.size > PDF_MAX_BYTES) return setError('El PDF no puede pesar más de 50 MB.')

    setError(null)
    setIsUploading(true)

    try {
      if (uploadPdf) onChange(await uploadPdf(file))
    } catch {
      setError('No fue posible subir el PDF. Inténtalo de nuevo.')
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="grid gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void handleFile(file)
        }}
      />
      <button
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="h-11 rounded-2xl border border-[hsl(var(--border))] px-4 text-sm font-semibold transition hover:bg-[hsl(var(--secondary))] disabled:opacity-60"
      >
        {isUploading ? 'Subiendo…' : value ? 'Reemplazar PDF' : 'Subir PDF'}
      </button>
      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-xs font-medium text-[hsl(var(--primary))] underline"
        >
          {decodeURIComponent(value.split('/').pop() ?? value)}
        </a>
      ) : (
        <p className="text-xs text-[hsl(var(--foreground))/0.55]">Máximo 50 MB.</p>
      )}
      {error ? (
        <p role="alert" className="text-xs font-medium text-[hsl(var(--danger))]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
