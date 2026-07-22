export type SavedResult = {
  id: string
  label: string
  value: string
  date: string
  /** Datos usados en el cálculo, legibles (p. ej. "Nacimiento: 30/11/1997 · Mes: Julio"). */
  detail?: string
  /** Ruta interna al cálculo con los datos precargados (query params). */
  href?: string
}

const KEY = 'nume_saved_results'
const MAX = 40

export function getSavedResults(): SavedResult[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SavedResult[]) : []
  } catch {
    return []
  }
}

export function addSavedResult(input: {
  label: string
  value: string
  detail?: string
  href?: string
}): void {
  if (typeof window === 'undefined') return
  try {
    const list = getSavedResults().filter((item) => item.label !== input.label)
    const entry: SavedResult = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label: input.label,
      value: input.value,
      date: new Date().toISOString(),
      ...(input.detail ? { detail: input.detail } : {}),
      ...(input.href ? { href: input.href } : {})
    }
    list.unshift(entry)
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)))
  } catch {
    // localStorage no disponible: el resultado simplemente no se guarda
  }
}

export function removeSavedResult(id: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(getSavedResults().filter((item) => item.id !== id))
    )
  } catch {
    // no-op
  }
}

export function clearSavedResults(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    // no-op
  }
}
