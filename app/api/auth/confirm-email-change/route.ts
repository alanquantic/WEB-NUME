import { NextRequest, NextResponse } from 'next/server'

import { ApiError } from '@/lib/api/errors'
import { clearAccessCookie, clearRefreshCookie } from '@/lib/auth/cookies'
import { rejectCrossSiteRequest } from '@/lib/auth/request-guard'
import { confirmEmailChangeWithToken } from '@/lib/auth/session'

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
    const result = await confirmEmailChangeWithToken(body.token)
    // La API cerró las sesiones de la cuenta: borramos también las cookies de
    // este navegador para que inicie sesión con el correo nuevo.
    const response = NextResponse.json(result)
    response.cookies.set(clearAccessCookie())
    response.cookies.set(clearRefreshCookie())
    return response
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        return NextResponse.json(
          { message: 'El enlace no es válido, ya se usó o expiró. Pide el cambio de nuevo desde tu perfil.' },
          { status: 401 }
        )
      }
      if (error.status === 409) {
        return NextResponse.json(
          { message: 'Ese correo ya está en uso por otra cuenta. Elige otro desde tu perfil.' },
          { status: 409 }
        )
      }
      if (error.status === 429 || error.status === 400) {
        const message =
          error.status === 429
            ? 'Demasiados intentos. Espera un momento y vuelve a intentarlo.'
            : error.problem.detail || 'No fue posible confirmar el cambio.'
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
