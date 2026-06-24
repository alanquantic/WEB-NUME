import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'h-11 w-full rounded-2xl border border-[hsl(var(--border))] bg-white px-4 text-sm',
        'placeholder:text-[hsl(var(--foreground))/0.45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]',
        props.className
      )}
    />
  )
}

