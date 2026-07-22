import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { SafeUser } from '@/lib/api/contracts'
import { ACCESS_COOKIE } from '@/lib/auth/cookies'
import { API_BASE_URL } from '@/lib/auth/session'
import { getSignificadoEntry } from '@/lib/significados/data'

export const dynamic = 'force-dynamic'

// Verifica membresía activa leyendo la cookie de acceso y consultando /auth/me.
// Cualquier error o ausencia de token => no miembro (nunca se cuelga: hay timeout).
async function isActiveMember(): Promise<boolean> {
  const token = cookies().get(ACCESS_COOKIE)?.value
  if (!token) return false
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!response.ok) return false
    const user = (await response.json()) as SafeUser
    return Boolean(user?.has_active_membership)
  } catch {
    return false
  }
}

// Devuelve la interpretación de una posición del pináculo (concepto + número).
// El contenido premium SOLO se envía a miembros con membresía activa.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const concepto = searchParams.get('concepto') ?? ''
  const numero = searchParams.get('numero') ?? ''

  if (!(await isActiveMember())) {
    return NextResponse.json({ member: false })
  }

  const entry = getSignificadoEntry(concepto, numero)
  if (!entry) {
    return NextResponse.json({ member: true, found: false })
  }

  return NextResponse.json({
    member: true,
    found: true,
    concepto: {
      nombre: entry.concepto.nombre,
      etiqueta: entry.concepto.etiqueta,
      pregunta: entry.concepto.pregunta,
    },
    numero: entry.numero,
  })
}
