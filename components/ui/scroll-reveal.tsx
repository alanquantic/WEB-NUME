'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
  duration?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 28,
  duration = 700,
  once = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={cn('scroll-reveal', isVisible && 'is-visible', className)}
      style={
        {
          ['--reveal-delay' as string]: `${delay}ms`,
          ['--reveal-distance' as string]: `${distance}px`,
          ['--reveal-duration' as string]: `${duration}ms`
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
