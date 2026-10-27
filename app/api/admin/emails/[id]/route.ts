import { NextResponse } from 'next/server'
import { getServerSessionUser } from '@/lib/auth/session'
import { isResendEmailId } from '@/lib/orders/email'

export const dynamic = 'force-dynamic'

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } })
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getServerSessionUser()
    if (!user) return json({ message: 'Inicia sesión para consultar el correo.' }, 401)
    if (user.role !== 'admin') return json({ message: 'Acceso exclusivo para administradores.' }, 403)
    if (!isResendEmailId(params.id)) return json({ message: 'El ID del correo no es válido.' }, 400)

    const key = process.env.RESEND_API_KEY
    if (!key) return json({ message: 'La consulta de correos aún no está configurada.' }, 503)

    const response = await fetch(`https://api.resend.com/emails/${params.id}`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    })
    if (!response.ok) {
      if (response.status === 404) return json({ message: 'No se encontró este correo en Resend.' }, 404)
      if (response.status === 429) return json({ message: 'Resend recibió demasiadas consultas. Intenta de nuevo en unos segundos.' }, 429)
      return json({ message: 'No se pudo consultar Resend. Revisa el acceso de la integración.' }, 502)
    }
    const email = await response.json()
    if (email.id !== params.id || typeof email.last_event !== 'string' || !Array.isArray(email.to)) {
      return json({ message: 'Resend devolvió una respuesta inesperada.' }, 502)
    }
    // Return only tracking data. Never expose message bodies or provider errors.
    return json({
      id: email.id,
      subject: typeof email.subject === 'string' ? email.subject : '',
      to: email.to.filter((value: unknown) => typeof value === 'string'),
      lastEvent: email.last_event,
      checkedAt: new Date().toISOString()
    })
  } catch {
    return json({ message: 'No se pudo consultar el estado del correo. Intenta de nuevo.' }, 503)
  }
}
