'use client'

import { useState } from 'react'

export function ExportOrdersButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function download(form: HTMLFormElement | null) {
    if (!form || !form.reportValidity()) return
    const month = String(new FormData(form).get('month') ?? '')
    setLoading(true)
    setError('')
    try {
      const query = new URLSearchParams(month ? { month } : {})
      const response = await fetch(`/api/admin/orders/export?${query}`, { cache: 'no-store' })
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message ?? 'No se pudo exportar el archivo.')
      }
      const url = URL.createObjectURL(await response.blob())
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `pedidos-${month || 'todos'}.csv`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se pudo exportar el archivo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button type="button" disabled={loading} onClick={event => void download(event.currentTarget.form)}
        className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/5 disabled:opacity-50">
        {loading ? 'Exportando…' : 'Exportar CSV'}
      </button>
      {error ? <p role="alert" className="w-full text-sm text-red-700">{error}</p> : null}
    </>
  )
}
