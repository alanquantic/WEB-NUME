import { Sparkle } from 'lucide-react'

import { cn } from '@/lib/utils'

export function SparkleField({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <Sparkle className="absolute left-[6%] top-[20%] opacity-40" size={16} />
      <Sparkle className="absolute right-[10%] top-[16%] opacity-25" size={28} />
      <Sparkle className="absolute right-[22%] bottom-[18%] opacity-30" size={14} />
      <Sparkle className="absolute left-[18%] bottom-[24%] opacity-20" size={22} />
      <Sparkle className="absolute left-[46%] top-[10%] opacity-20" size={12} />
    </div>
  )
}
