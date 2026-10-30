import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { compatibilityEmail, parseCompatibilityEmail } from '@/lib/email/compatibility'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowedOrigins = new Set([request.nextUrl.origin, process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '')])
  if (origin && !allowedOrigins.has(origin)) {
    return NextResponse.json({ message: 'Solicitud no permitida.' }, { status: 403 })
  }
  let input
  try {
    const raw = await request.text()
    if (raw.length > 4096) return NextResponse.json({ message: 'Solicitud demasiado grande.' }, { status: 413 })
    input = parseCompatibilityEmail(JSON.parse(raw))
  } catch {
    return NextResponse.json({ message: 'Datos de solicitud inválidos.' }, { status: 400 })
  }
  if (!input) return NextResponse.json({ message: 'Revisa tu nombre, correo, fechas y aceptación de términos.' }, { status: 400 })
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ message: 'El envío de correo no está disponible en este momento.' }, { status: 503 })

  // Identical submissions and retries in the same day share an idempotency key.
  const fingerprint = createHash('sha256').update(JSON.stringify({ ...input, day: new Date().toISOString().slice(0, 10) })).digest('hex')
  try {
    const mail = compatibilityEmail(input)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `compatibility-${fingerprint}` },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Numerología Cotidiana <no-reply@numerologia-cotidiana.com>',
        to: [input.email], ...mail,
      }),
      signal: AbortSignal.timeout(15000),
    })
    const data = await response.json()
    if (!response.ok || !data.id) {
      console.error('Compatibility email rejected', { status: response.status, code: data.name })
      return NextResponse.json({ message: 'No pudimos enviar tu resultado. Intenta nuevamente en unos minutos.' }, { status: 502 })
    }
    return NextResponse.json({ message: 'Tu resultado fue enviado por correo.', id: data.id })
  } catch {
    return NextResponse.json({ message: 'No pudimos confirmar el envío. Puedes intentar nuevamente.' }, { status: 502 })
  }
}
