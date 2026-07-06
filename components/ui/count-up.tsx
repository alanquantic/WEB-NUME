'use client'

import { useEffect, useState } from 'react'

export function CountUp({ value, duration = 650 }: { value: number | string; duration?: number }) {
  const [display, setDisplay] = useState<number | string>(typeof value === 'number' ? 0 : value)

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplay(value)
      return
    }

    let raf = 0
    let startTime = 0
    const target = value

    const step = (now: number) => {
      if (!startTime) startTime = now
      const progress = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(target * eased))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setDisplay(target)
      }
    }

    raf = requestAnimationFrame(step)
    // Garantiza el valor final aunque requestAnimationFrame se pause (pestaña en segundo plano).
    const fallback = setTimeout(() => setDisplay(target), duration + 80)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [value, duration])

  return <>{display}</>
}
