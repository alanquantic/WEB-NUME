import { NextResponse, type NextRequest } from 'next/server'

const STATE_CHANGING = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

function originOf(value: string | null): string | null {
  if (!value) return null
  try {
    return new URL(value).origin
  } catch {
    return null
  }
}

// Orígenes válidos: el del propio request y el configurado en NEXT_PUBLIC_APP_URL
// (detrás del proxy del hosting ambos deberían coincidir).
function allowedOrigins(request: NextRequest): Set<string> {
  const origins = new Set<string>([request.nextUrl.origin])
  const configured = originOf(process.env.NEXT_PUBLIC_APP_URL ?? null)
  if (configured) origins.add(configured)
  return origins
}

/**
 * Protección CSRF para route handlers que cambian estado y usan las cookies de
 * sesión: el request debe venir del propio sitio y, si trae cuerpo, ser JSON.
 * Devuelve la respuesta de error, o null si el request es válido.
 */
export function rejectCrossSiteRequest(request: NextRequest): NextResponse | null {
  if (!STATE_CHANGING.has(request.method)) return null

  const origin = originOf(request.headers.get('origin')) ?? originOf(request.headers.get('referer'))
  if (origin) {
    if (!allowedOrigins(request).has(origin)) {
      return NextResponse.json({ message: 'Origen no permitido.' }, { status: 403 })
    }
  } else if (request.headers.get('sec-fetch-site') !== 'same-origin') {
    // Sin Origin ni Referer solo se acepta si el navegador declara same-origin.
    return NextResponse.json({ message: 'Origen no permitido.' }, { status: 403 })
  }

  // Un formulario HTML de otro sitio solo puede mandar text/plain,
  // form-urlencoded o multipart; exigir JSON cierra esa vía.
  const hasBody = Number(request.headers.get('content-length') ?? '0') > 0
  const contentType = request.headers.get('content-type') ?? ''
  if (hasBody && !contentType.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ message: 'Tipo de contenido no soportado.' }, { status: 415 })
  }

  return null
}

// Segmentos de ruta del BFF: sin separadores, recorridos ni caracteres que
// permitan salir de `/api/v1` en la URL de la API.
export function isSafePathSegment(segment: string): boolean {
  return segment.length > 0 && segment !== '.' && segment !== '..' && !/[/\\?#%\s]/.test(segment)
}
