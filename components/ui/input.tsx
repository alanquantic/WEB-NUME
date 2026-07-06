import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        // El input es blanco en ambos temas, por eso texto y placeholder usan
        // colores fijos oscuros (no --foreground, que en dark se vuelve claro y
        // desaparecería sobre el blanco).
        'h-11 w-full rounded-2xl border border-[hsl(var(--border))] bg-white px-4 text-sm text-[hsl(263_35%_18%)]',
        'placeholder:text-[hsl(255_10%_48%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]',
        props.className
      )}
    />
  )
}

