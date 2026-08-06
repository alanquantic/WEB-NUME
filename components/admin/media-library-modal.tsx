'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { MediaImageItem } from '@/lib/api/contracts'
import { createMediaUploadSignature, getMediaImages } from '@/lib/api/media'
import { cn } from '@/lib/utils'

function resolveError(error: unknown): string {
  const message = error instanceof Error ? error.message : ''
  if (message.includes('401') || message.includes('403'))
    return 'No tienes permisos para gestionar la biblioteca.'
  return message || 'No fue posible completar la operación.'
}

function formatBytes(value: number | null): string {
  if (!value || value <= 0) return ''
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`
  return `${(value / (1024 * 1024)).toFixed(1)} MB`
}

type MediaLibraryModalProps = {
  open: boolean
  initialUrl?: string
  onClose: () => void
  onSelect: (url: string) => void
}

export function MediaLibraryModal({
  open,
  initialUrl,
  onClose,
  onSelect
}: MediaLibraryModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState<MediaImageItem[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUrl, setSelectedUrl] = useState<string>(initialUrl ?? '')

  useEffect(() => {
    if (!open) return
    setSelectedUrl(initialUrl ?? '')
    if (items.length === 0 && !isLoading) void load(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function load(reset = false) {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getMediaImages(reset ? undefined : cursor ?? undefined)
      setItems((prev) => (reset ? response.items : [...prev, ...response.items]))
      setCursor(response.next_cursor)
    } catch (caught) {
      console.error('[MediaLibrary] load error', caught)
      setError(resolveError(caught))
    } finally {
      setIsLoading(false)
    }
  }

  function confirmSelection(url: string) {
    if (!url) return
    onSelect(url)
    onClose()
  }

  async function handleUpload(file: File) {
    setIsUploading(true)
    setError(null)
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
      if (!response.ok) throw new Error(`Upload failed with status ${response.status}`)

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
        original_filename: uploaded.original_filename ?? null,
        created_at: uploaded.created_at ?? null
      }
      setItems((prev) => [nextItem, ...prev])
      setSelectedUrl(nextItem.url)
    } catch (caught) {
      console.error('[MediaLibrary] upload error', caught)
      setError(resolveError(caught))
    } finally {
      setIsUploading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-6 py-4">
          <div>
            <h2 className="font-display text-xl font-semibold">Biblioteca de medios</h2>
            <p className="text-sm text-[hsl(var(--foreground))/0.6]">
              Selecciona una imagen existente o sube una nueva a Cloudinary.
            </p>
          </div>
          <Button type="button" variant="secondary" onClick={onClose}>
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
              if (file) void handleUpload(file)
              if (fileInputRef.current) fileInputRef.current.value = ''
            }}
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Subiendo…' : 'Subir imagen'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void load(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando…' : 'Recargar'}
          </Button>
          <div className="min-w-[260px] flex-1 rounded-2xl border border-dashed border-[hsl(var(--border))] px-4 py-3 text-sm text-[hsl(var(--foreground))/0.6]">
            {selectedUrl ? selectedUrl : 'Aún no has seleccionado una imagen.'}
          </div>
          <Button
            type="button"
            onClick={() => confirmSelection(selectedUrl)}
            disabled={!selectedUrl}
          >
            Usar imagen
          </Button>
        </div>

        {error ? (
          <p className="px-6 pt-4 text-sm font-medium text-[hsl(var(--danger))]">{error}</p>
        ) : null}

        <div className="grid flex-1 gap-4 overflow-y-auto p-6 md:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const isActive = selectedUrl === item.url
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedUrl(item.url)
                    confirmSelection(item.url)
                  }}
                  className={cn(
                    'overflow-hidden rounded-[1.5rem] border text-left transition',
                    isActive
                      ? 'border-[hsl(var(--primary))] shadow-lg shadow-[hsl(var(--primary))/0.15]'
                      : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/0.35]'
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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

            {!isLoading && items.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-[hsl(var(--border))] px-6 py-10 text-sm text-[hsl(var(--foreground))/0.6]">
                Todavía no hay imágenes en tu biblioteca.
              </div>
            ) : null}
          </div>

          <aside className="grid content-start gap-4 rounded-[1.5rem] border border-[hsl(var(--border))] bg-[hsl(var(--secondary))/0.45] p-4">
            {selectedUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedUrl}
                  alt="Imagen seleccionada"
                  className="h-52 w-full rounded-[1.25rem] object-cover"
                />
                <div className="grid gap-2 text-sm">
                  <p className="font-semibold">URL seleccionada</p>
                  <p className="break-all text-[hsl(var(--foreground))/0.65]">{selectedUrl}</p>
                </div>
              </>
            ) : (
              <p className="text-sm text-[hsl(var(--foreground))/0.6]">
                Elige una imagen para verla aquí antes de asignarla.
              </p>
            )}

            {cursor ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => void load(false)}
                disabled={isLoading}
              >
                {isLoading ? 'Cargando…' : 'Cargar más'}
              </Button>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  )
}
