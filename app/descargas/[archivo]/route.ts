import { NextResponse } from 'next/server'

import { getDescarga, getDescargaUrl } from '@/lib/descargas/archivos'

export const dynamic = 'force-dynamic'

// Público: /descargas/{slug}.pdf -> PDF vigente en Cloudinary. Redirección
// temporal (302) y sin caché para que cambiar el destino surta efecto de
// inmediato; un 301 quedaría guardado en los navegadores.
export function GET(_request: Request, { params }: { params: { archivo: string } }) {
  const descarga = getDescarga(params.archivo)

  if (!descarga) {
    return new NextResponse('Archivo no encontrado', { status: 404 })
  }

  const response = NextResponse.redirect(getDescargaUrl(descarga), 302)
  response.headers.set('Cache-Control', 'no-store')
  return response
}
