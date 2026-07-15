import { LogoutButton } from '@/components/auth/logout-button'
import { MembershipTierBadge } from '@/components/memberships/membership-tier-badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import type { SafeUser } from '@/lib/api/contracts'
import { getServerSessionUser } from '@/lib/auth/session'

function getDisplayName(user: SafeUser | null): string {
  const profile = user?.metadata?.profile
  const profileData =
    profile && typeof profile === 'object' ? (profile as Record<string, unknown>) : {}
  const value = (key: string) =>
    typeof profileData[key] === 'string' ? profileData[key].trim() : ''

  const fullName = [value('first_name'), value('last_name')].filter(Boolean).join(' ')
  const savedName = value('display_name') || fullName || value('nickname')

  if (savedName) return savedName

  const emailName = user?.email.split('@')[0]?.replace(/[._-]+/g, ' ').trim()
  return emailName
    ? emailName.replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase('es-MX'))
    : 'Usuario'
}

export default async function ProfilePage() {
  const user = await getServerSessionUser()
  const displayName = getDisplayName(user)

  return (
    <Card>
      <CardTitle>Resumen de cuenta</CardTitle>
      <CardDescription>Hola, {displayName}.</CardDescription>
      <CardContent className="grid gap-2 text-sm">
        <p>Email: {user?.email}</p>
        <p>Rol: {user?.role}</p>
        <p>Membresía activa: {user?.has_active_membership ? 'Sí' : 'No'}</p>
        <p className="flex flex-wrap items-center gap-2">
          <span>Tier actual:</span>
          <MembershipTierBadge tier={user?.current_membership} />
        </p>
      </CardContent>
      <div className="mt-6 border-t border-[hsl(var(--border))] pt-5">
        <LogoutButton />
      </div>
    </Card>
  )
}
