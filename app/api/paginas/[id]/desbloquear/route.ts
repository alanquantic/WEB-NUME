import { NextRequest, NextResponse } from 'next/server'

import { createPageAccessCookie } from '@/lib/auth/cookies'
import { API_BASE_URL } from '@/lib/auth/session'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  let body: { password?: unknown }

  try {
    body = (await request.json()) as { password?: unknown }
  } catch {
    return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 })
  }

  if (typeof body?.password !== 'string' || !body.password) {
    return NextResponse.json({ message: 'La contraseña es obligatoria.' }, { status: 400 })
  }

  try {
    const upstream = await fetch(`${API_BASE_URL}/pages/${encodeURIComponent(params.id)}/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: body.password }),
      cache: 'no-store'
    })

    if (!upstream.ok) {
      return NextResponse.json({ message: 'No autorizado.' }, { status: upstream.status })
    }

    const { token, expires_at: expiresAt } = (await upstream.json()) as {
      token: string
      expires_at: string
    }
    const response = NextResponse.json({ ok: true })
    // La API ya validó `id` como slug o uuid, así que es seguro usarlo en el path.
    response.cookies.set(createPageAccessCookie(params.id, token, expiresAt))
    return response
  } catch {
    return NextResponse.json({ message: 'No se pudo conectar con el servidor.' }, { status: 502 })
  }
}
