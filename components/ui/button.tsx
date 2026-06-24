import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'secondary' | 'ghost' | 'danger'
  }
>

const variants = {
  default: 'bg-[hsl(var(--primary))] text-white hover:opacity-90',
  secondary: 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:opacity-90',
  ghost: 'bg-transparent text-[hsl(var(--foreground))] hover:bg-black/5',
  danger: 'bg-[hsl(var(--danger))] text-white hover:opacity-90'
}

export function Button({
  className,
  children,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

