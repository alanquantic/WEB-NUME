import type { SafeUser } from '@/lib/api/contracts'

// Solo `false` explícito cuenta como pendiente: si la API todavía no manda el
// campo (`undefined`), no mostramos el aviso de confirmación.
export function isEmailUnverified(user: Pick<SafeUser, 'email_verified'> | null | undefined) {
  return user?.email_verified === false
}
