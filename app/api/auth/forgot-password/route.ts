import { NextRequest, NextResponse } from 'next/server'

import { ApiError } from '@/lib/api/errors'
import { requestPasswordReset } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  let body: { email?: string }

  try {
    body = (await request.json()) as { email?: string }
  } catch {
    return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 })
  }

  if (!body?.email) {
    return NextResponse.json({ message: 'El email es obligatorio.' }, { status: 400 })
  }

  try {
    const result = await requestPasswordReset(body.email)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof ApiError) {
      // 400 (validación) y 429 (rate limit) son significativos para el usuario.
      if (error.status === 400 || error.status === 429) {
        return NextResponse.json(
          {
            message:
              error.problem.detail || error.problem.title || 'No fue posible procesar la solicitud.'
          },
          { status: error.status }
        )
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
