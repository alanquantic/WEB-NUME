import type { TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        // Fondo blanco en ambos temas → texto/placeholder con colores fijos oscuros.
        'min-h-28 w-full rounded-3xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm text-[hsl(263_35%_18%)]',
        'placeholder:text-[hsl(255_10%_48%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]',
        props.className
      )}
    />
  )
}

