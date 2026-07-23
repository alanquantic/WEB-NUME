import { NextRequest, NextResponse } from 'next/server'

import { ApiError } from '@/lib/api/errors'
import { resetPasswordWithToken } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  let body: { token?: string; password?: string }

  try {
    body = (await request.json()) as { token?: string; password?: string }
  } catch {
    return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 })
  }

  if (!body?.token || !body?.password) {
    return NextResponse.json(
      { message: 'Token y nueva contraseña son obligatorios.' },
      { status: 400 }
    )
  }

  try {
    const result = await resetPasswordWithToken(body.token, body.password)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof ApiError) {
      // 401 (token inválido/expirado), 400 (validación) y 429 (rate limit)
      // son significativos para el usuario: se propagan tal cual.
      if (error.status === 401 || error.status === 400 || error.status === 429) {
        const message =
          error.status === 401
            ? 'El enlace de restablecimiento no es válido o ya expiró. Solicita uno nuevo.'
            : error.problem.detail || error.problem.title || 'No fue posible actualizar la contraseña.'
        return NextResponse.json({ message }, { status: error.status })
      }

      return NextResponse.json(
        { message: 'El servicio de autenticación no está disponible. Intenta más tarde.' },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { message: 'No se pudo conectar con el servidor de autenticación.' },
      { status: 502 }
    )
  }
}
