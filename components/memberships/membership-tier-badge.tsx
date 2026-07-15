import { Badge } from '@/components/ui/badge'
import type { MembershipTier } from '@/lib/api/contracts'
import { cn } from '@/lib/utils'

const tierLabels: Record<MembershipTier, string> = {
  none: 'Sin membresía',
  membresia_180: '180 días',
  membresia_365: '365 días'
}

export function MembershipTierBadge({
  tier,
  className
}: {
  tier: MembershipTier | null | undefined
  className?: string
}) {
  const resolvedTier = tier ?? 'none'

  return (
    <Badge
      className={cn(
        resolvedTier === 'none'
          ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))/0.72]'
          : 'bg-[hsl(var(--primary))/0.15] text-[hsl(var(--primary))]',
        className
      )}
    >
      {tierLabels[resolvedTier]}
    </Badge>
  )
}
