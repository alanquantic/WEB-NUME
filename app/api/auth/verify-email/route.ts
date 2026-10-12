import { NextRequest, NextResponse } from 'next/server'

import { ApiError } from '@/lib/api/errors'
import { verifyEmailWithToken } from '@/lib/auth/session'
import { rejectCrossSiteRequest } from '@/lib/auth/request-guard'

export async function POST(request: NextRequest) {
  const rejected = rejectCrossSiteRequest(request)
  if (rejected) return rejected

  let body: { token?: string }

  try {
    body = (await request.json()) as { token?: string }
  } catch {
    return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 })
  }

  if (!body?.token) {
    return NextResponse.json({ message: 'El token es obligatorio.' }, { status: 400 })
  }

  try {
    const result = await verifyEmailWithToken(body.token)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof ApiError) {
      // 401 (token inválido, vencido o ya usado), 400 (validación) y 429 (rate
      // limit) son significativos para el usuario: se propagan tal cual.
      if (error.status === 401 || error.status === 400 || error.status === 429) {
        const message =
          error.status === 401
            ? 'El enlace de confirmación no es válido, ya se usó o expiró. Pide uno nuevo desde tu perfil.'
            : error.status === 429
              ? 'Demasiados intentos. Espera un momento y vuelve a intentarlo.'
              : error.problem.detail || error.problem.title || 'No fue posible confirmar tu correo.'
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
