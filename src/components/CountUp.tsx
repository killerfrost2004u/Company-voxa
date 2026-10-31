import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  to: number
  suffix?: string
  duration?: number
}

/** Counts from 0 to `to` once visible. The final value reserves the width so layout never shifts. */
export function CountUp({ to, suffix = '', duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          setValue(Math.round(to * (1 - Math.pow(1 - progress, 4))))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to, duration])

  return (
    <span ref={ref} className="relative inline-block align-top">
      <span className="invisible">
        {to}
        {suffix}
      </span>
      <span aria-hidden className="absolute inset-0">
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  )
}
