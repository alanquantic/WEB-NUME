import { calculateCompatibility } from '@/lib/numerology/compatibility'

export type CompatibilityEmailInput = {
  name: string
  email: string
  dateA: string
  dateB: string
  acceptTerms: true
}

export function validBirthDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
    && value >= '1900-01-01' && value <= new Date().toISOString().slice(0, 10)
}

export function parseCompatibilityEmail(value: unknown): CompatibilityEmailInput | null {
  if (!value || typeof value !== 'object') return null
  const data = value as Record<string, unknown>
  if (typeof data.name !== 'string' || !data.name.trim() || data.name.length > 120) return null
  if (typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email.trim())) return null
  if (data.acceptTerms !== true || !validBirthDate(data.dateA) || !validBirthDate(data.dateB)) return null
  return { name: data.name.trim(), email: data.email.trim().toLowerCase(), dateA: data.dateA, dateB: data.dateB, acceptTerms: true }
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

export function compatibilityEmail(input: CompatibilityEmailInput) {
  // Recalculate on the server; do not accept arbitrary email content from a client.
  const result = calculateCompatibility(input.dateA, input.dateB)
  if (!result) throw new Error('No se pudo calcular la compatibilidad.')
  const sections = [
    { title: 'Fortalezas', items: result.strengths },
    { title: 'Retos', items: result.challenges },
    { title: 'Consejos para la pareja', items: result.advice },
  ]
  const formatDate = (date: string) => date.split('-').reverse().join('/')
  const text = [
    `Hola, ${input.name}.`, 'Este es tu resultado de Numerología de pareja.',
    `Fechas: ${formatDate(input.dateA)} y ${formatDate(input.dateB)}`,
    `Números: ${result.numberA} + ${result.numberB}`, result.label, result.description,
    'La energía entre ustedes', result.energy,
    ...sections.flatMap((section) => [section.title, ...section.items.map((item) => `• ${item}`)]),
    'Numerología Cotidiana · Laura L. Rodríguez',
    'https://www.numerologia-cotidiana.com/numerologia-de-pareja/',
    'Recibes este correo porque solicitaste el resultado de la calculadora.',
  ].join('\n\n')
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f6f3f8;font-family:Arial,sans-serif;color:#302435">
    <main style="max-width:600px;margin:24px auto;padding:32px;background:#ffffff;border-radius:20px">
      <p style="color:#693061;font-weight:bold">NUMEROLOGÍA COTIDIANA</p>
      <h1 style="color:#693061">Tu numerología de pareja</h1>
      <p>Hola, ${escapeHtml(input.name)}. Este es el resultado que solicitaste.</p>
      <p>Fechas: ${formatDate(input.dateA)} y ${formatDate(input.dateB)}</p>
      <div style="padding:24px;background:#f6f0f7;border-radius:16px;text-align:center">
        <p style="font-size:32px;color:#693061;font-weight:bold">${result.numberA} + ${result.numberB}</p>
        <h2>${escapeHtml(result.label)}</h2><p style="line-height:1.7">${escapeHtml(result.description)}</p>
      </div>
      <h2>La energía entre ustedes</h2><p style="line-height:1.7">${escapeHtml(result.energy)}</p>
      ${sections.map((section) => `<h2 style="color:#693061">${section.title}</h2><ul>${section.items.map((item) => `<li style="margin-bottom:12px;line-height:1.7">${escapeHtml(item)}</li>`).join('')}</ul>`).join('')}
      <p><a href="https://www.numerologia-cotidiana.com/numerologia-de-pareja/" style="color:#693061">Volver a Numerología Cotidiana</a></p>
      <p style="font-size:12px;color:#756b78">Laura L. Rodríguez · Recibes este correo porque solicitaste el resultado de la calculadora.</p>
    </main></body></html>`
  return { subject: 'Tu resultado de Numerología de pareja', text, html }
}
