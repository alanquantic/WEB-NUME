import Person from '@/resources/person'

export type ExpressionResult = {
  expression: number
  soul: number
  personality: number
}

// El motor Person ya asigna valor a vocales acentuadas y a la ñ,
// así que solo normalizamos espacios y mayúsculas.
function sanitizeName(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

export function calculateExpression(fullName: string): ExpressionResult | null {
  const normalized = sanitizeName(fullName)
  if (!normalized) return null

  const [name = '', ...rest] = normalized.split(' ')
  const lastName = rest.join(' ')
  const person = new Person({ name, lastName })

  return {
    expression: person.calcName(),
    soul: person.calcSoulNumber(),
    personality: person.calcSoulExpresion()
  }
}
