import { getCountryCode } from '@/lib/countries'

const COUNTRY_DIAL_CODES: Record<string, string> = {
  AR: '54',
  BO: '591',
  BR: '55',
  CA: '1',
  CL: '56',
  CO: '57',
  CR: '506',
  DO: '1',
  EC: '593',
  ES: '34',
  FR: '33',
  GB: '44',
  GT: '502',
  HN: '504',
  IT: '39',
  MX: '52',
  NI: '505',
  PA: '507',
  PE: '51',
  PR: '1',
  PT: '351',
  PY: '595',
  SV: '503',
  US: '1',
  UY: '598',
  VE: '58'
}

export function getWhatsAppHref(phone: string | null, nationality: string | null | undefined) {
  if (!phone) return null

  const trimmed = phone.trim()
  if (!trimmed || trimmed.includes('@')) return null

  if (trimmed.startsWith('+')) {
    const internationalDigits = trimmed.replace(/\D/g, '')
    return internationalDigits.length >= 8 ? `https://wa.me/${internationalDigits}` : null
  }

  let digits = trimmed.replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.length < 8) return null

  const countryCode = getCountryCode(nationality ?? undefined)
  const dialCode = countryCode ? COUNTRY_DIAL_CODES[countryCode] : null

  if (!dialCode) return `https://wa.me/${digits}`

  if (digits.startsWith(dialCode) && digits.length > dialCode.length + 6) {
    if (countryCode === 'MX' && digits.startsWith('521')) {
      digits = `52${digits.slice(3)}`
    }

    return `https://wa.me/${digits}`
  }

  if (countryCode === 'MX') {
    if (digits.length === 10) {
      digits = `52${digits}`
    } else if (digits.length === 11 && digits.startsWith('1')) {
      digits = `52${digits.slice(1)}`
    }
  } else if (dialCode === '1') {
    if (digits.length === 10) digits = `1${digits}`
  } else {
    digits = `${dialCode}${digits}`
  }

  return `https://wa.me/${digits}`
}

export function normalizeExternalUrl(value: string | null) {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}
