'use client'

import { useEffect, useState } from 'react'

import {
  ALL_GRANTED,
  DEFAULT_DENIED,
  readConsent,
  updateConsent,
  writeConsent,
  type ConsentSettings
} from '@/lib/analytics'

// Banner de consentimiento compatible con Consent Mode v2.
// Guarda la elección en cookie propia y llama a gtag('consent', 'update', ...).
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    if (stored) {
      // Reafirmar con GA cada carga por si el snippet aún no había recibido update.
      updateConsent(stored.s)
      return
    }
    setVisible(true)
  }, [])

  function persist(settings: ConsentSettings) {
    writeConsent(settings)
    updateConsent(settings)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card p-5 shadow-panel sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-sm text-foreground/80">
          <p className="font-medium text-foreground">Usamos cookies</p>
          <p className="mt-1 leading-6">
            Utilizamos cookies para analizar el uso del sitio y mejorar tu experiencia.
            Puedes aceptarlas o rechazar las opcionales.{' '}
            <a href="/paginas/politica-de-privacidad" className="underline">
              Más información
            </a>
            .
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-2 sm:flex-nowrap">
          <button
            type="button"
            onClick={() => persist(DEFAULT_DENIED)}
            className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary/20"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => persist(ALL_GRANTED)}
            className="rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow hover:opacity-95"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
