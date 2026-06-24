import type { TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-28 w-full rounded-3xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm',
        'placeholder:text-[hsl(var(--foreground))/0.45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]',
        props.className
      )}
    />
  )
}

