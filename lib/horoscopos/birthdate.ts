// Soporta las 365 URLs antiguas /horoscopo-numerologico-para-los-nacidos-el-{dia}-de-{mes}
// (sin año: no usamos 29 de febrero).
const MESES_CANONICOS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
] as const

type Mes = (typeof MESES_CANONICOS)[number]

const DIAS_POR_MES: Record<Mes, number> = {
  enero: 31,
  febrero: 28,
  marzo: 31,
  abril: 30,
  mayo: 31,
  junio: 30,
  julio: 31,
  agosto: 31,
  septiembre: 30,
  octubre: 31,
  noviembre: 30,
  diciembre: 31
}

const SLUG_RE = /^horoscopo-numerologico-para-los-nacidos-el-(\d{1,2})-de-([a-z]+)$/

export const MESES_NACIMIENTO = MESES_CANONICOS

export function getBirthdateSlugs(): string[] {
  const slugs: string[] = []
  for (const mes of MESES_CANONICOS) {
    const total = DIAS_POR_MES[mes]
    for (let dia = 1; dia <= total; dia++) {
      slugs.push(`horoscopo-numerologico-para-los-nacidos-el-${dia}-de-${mes}`)
    }
  }
  return slugs
}

export function parseBirthdateSlug(slug: string): { dia: number; mes: Mes } | null {
  const match = SLUG_RE.exec(slug)
  if (!match) return null
  const dia = Number(match[1])
  const mes = match[2] as Mes
  if (!MESES_CANONICOS.includes(mes)) return null
  if (!Number.isInteger(dia) || dia < 1 || dia > DIAS_POR_MES[mes]) return null
  return { dia, mes }
}

// Reduce el día de nacimiento al número numerológico, preservando 11 y 22 como maestros.
export function reduceBirthDay(dia: number): number {
  if (dia === 11 || dia === 22) return dia
  let value = dia
  while (value > 9) {
    value = String(value)
      .split('')
      .reduce((acc, d) => acc + Number(d), 0)
    if (value === 11 || value === 22) return value
  }
  return value
}

export function capitalizeMes(mes: Mes): string {
  return mes.charAt(0).toUpperCase() + mes.slice(1)
}
