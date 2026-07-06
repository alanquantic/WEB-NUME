import { NextRequest, NextResponse } from 'next/server'

import { createAccessCookie, createRefreshCookie } from '@/lib/auth/cookies'
import { ApiError } from '@/lib/api/errors'
import { loginWithCredentials } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string }

  try {
    body = (await request.json()) as { email?: string; password?: string }
  } catch {
    return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 })
  }

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { message: 'Email y contraseña son obligatorios.' },
      { status: 400 }
    )
  }

  try {
    const session = await loginWithCredentials(body.email, body.password)
    const response = NextResponse.json({ user: session.user })
    response.cookies.set(createAccessCookie(session.access_token))
    response.cookies.set(createRefreshCookie(session.refresh_token))
    return response
  } catch (error) {
    if (error instanceof ApiError) {
      // 401 (credenciales), 400 (validación) y 429 (rate limit) son
      // significativos para el usuario: se propagan tal cual.
      if (error.status === 401 || error.status === 400 || error.status === 429) {
        return NextResponse.json(
          { message: error.problem.detail || error.problem.title || 'No fue posible iniciar sesión.' },
          { status: error.status }
        )
      }

      // 404 / 5xx suelen indicar que el API está mal configurado o caído
      // (p. ej. NEXT_PUBLIC_API_BASE_URL sin `/api/v1`). Devolvemos 502.
      return NextResponse.json(
        {
          message:
            'El servicio de autenticación no está disponible. Revisa la configuración del API (NEXT_PUBLIC_API_BASE_URL).'
        },
        { status: 502 }
      )
    }

    // Fallo de red o backend inalcanzable.
    return NextResponse.json(
      { message: 'No se pudo conectar con el servidor de autenticación.' },
      { status: 502 }
    )
  }
}
