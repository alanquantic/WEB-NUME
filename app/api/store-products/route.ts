import { NextRequest, NextResponse } from 'next/server'

import { getServerSessionUser } from '@/lib/auth/session'

const STORE_API_URL = (
  process.env.STORE_API_URL ?? 'https://tienda.numerologia-cotidiana.com'
).replace(/\/$/, '')

// Buscador de productos de la tienda para el admin de "Productos promocionados".
// Proxy al endpoint público de la tienda (que ya filtra solo productos activos).
export async function GET(request: NextRequest) {
  const user = await getServerSessionUser()
  if (user?.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const query = new URLSearchParams({ limit: '12' })
  const q = request.nextUrl.searchParams.get('q')?.trim()
  if (q) query.set('keyword', q.slice(0, 100))

  try {
    const res = await fetch(`${STORE_API_URL}/api/products/related?${query.toString()}`, {
      cache: 'no-store'
    })
    if (!res.ok) {
      return NextResponse.json({ message: 'Store unavailable' }, { status: 502 })
    }
    const json = (await res.json()) as { data?: unknown[] }
    return NextResponse.json({ data: json.data ?? [] })
  } catch {
    return NextResponse.json({ message: 'Store unavailable' }, { status: 502 })
  }
}
