import { useEffect } from 'react'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Page-wide scroll effects:
 * - adds `.is-in` to `[data-reveal]` / `[data-reveal-group]` elements as they enter the viewport
 * - shifts `[data-parallax="<speed>"]` elements vertically relative to the viewport centre
 */
export function useScrollEffects(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const targets = document.querySelectorAll<HTMLElement>(
      '[data-reveal-group], [data-reveal]:not([data-reveal-group] [data-reveal])',
    )
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const observeTarget = (el: HTMLElement) => {
      if (el.classList.contains('is-in')) return
      const rect = el.getBoundingClientRect()
      // If already inside the visible viewport, reveal immediately without requiring scroll
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add('is-in')
      } else {
        observer.observe(el)
      }
    }

    targets.forEach(observeTarget)

    // Watch for dynamically mounted DOM elements (e.g. view mode toggle between deck and columns)
    const mutationObserver = new MutationObserver(() => {
      const freshTargets = document.querySelectorAll<HTMLElement>(
        '[data-reveal-group]:not(.is-in), [data-reveal]:not([data-reveal-group] [data-reveal]):not(.is-in)',
      )
      freshTargets.forEach(observeTarget)
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (!items.length) return

    // Applied offsets, subtracted from the measured rect so the shift doesn't feed back into itself.
    const applied = new Map<HTMLElement, number>()
    let frame = 0
    const update = () => {
      frame = 0
      const mid = window.innerHeight / 2
      for (const el of items) {
        const rect = el.getBoundingClientRect()
        const top = rect.top - (applied.get(el) ?? 0)
        if (top + rect.height < -200 || top > window.innerHeight + 200) continue
        const speed = Number(el.dataset.parallax) || 0.1
        const offset = (top + rect.height / 2 - mid) * -speed
        applied.set(el, offset)
        el.style.translate = `0 ${offset.toFixed(1)}px`
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled])
}
