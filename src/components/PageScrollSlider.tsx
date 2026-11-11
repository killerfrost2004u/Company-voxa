import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'plans', label: 'Plans' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
]

export function PageScrollSlider() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const currentScroll = window.scrollY
          const percent = docHeight > 0 ? Math.min(Math.max((currentScroll / docHeight) * 100, 0), 100) : 0
          setScrollPercent(percent)

          // Determine active section on desktop HUD only
          if (window.innerWidth >= 768) {
            const scrollPos = currentScroll + window.innerHeight * 0.35
            for (let i = SECTIONS.length - 1; i >= 0; i--) {
              const el = document.getElementById(SECTIONS[i].id)
              if (el && el.offsetTop <= scrollPos) {
                setActiveSection(SECTIONS[i].id)
                break
              }
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Drag / Click on slider to scroll page
  const scrollToPercent = (percent: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetY = (percent / 100) * docHeight
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percent = Math.min(Math.max((clickY / rect.height) * 100, 0), 100)
    scrollToPercent(percent)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percent = Math.min(Math.max((clickY / rect.height) * 100, 0), 100)
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetY = (percent / 100) * docHeight
    window.scrollTo({ top: targetY, behavior: 'auto' })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false)
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // Ignore if pointer capture was already released
    }
  }

  return (
    <>
      {/* Top Radiant Reading Progress Bar */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[65] h-[3px] w-full bg-transparent"
      >
        <div
          className="h-full bg-gradient-to-r from-voxa via-[#80b9ff] to-flame shadow-[0_0_12px_rgba(99,161,242,0.9)] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Floating High-Tech Vertical Scroll Slider HUD on Right Edge */}
      <aside
        aria-label="Page scroll position slider"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 select-none"
      >
        {/* Quick Jump Up Button */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top of website"
          className="cursor-pointer flex size-6 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/50 hover:text-voxa hover:border-voxa/50 backdrop-blur-md transition-all text-[0.65rem] shadow-sm hover:scale-110 active:scale-95"
        >
          ▲
        </button>

        {/* Engineered Slider Track Housing */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="group relative flex h-48 sm:h-60 w-5 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/70 p-1 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-voxa/40 hover:bg-black/85"
        >
          {/* Subtle Millimeter Calibration Marks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-3 left-1/2 -translate-x-1/2 flex flex-col justify-between opacity-25"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-1.5 h-[1px] bg-white/60" />
            ))}
          </div>

          {/* Central Vertical Rail Guide */}
          <div className="relative h-full w-1 rounded-full bg-white/10 overflow-hidden">
            {/* Filled Progress Gradient inside rail */}
            <div
              className="w-full bg-gradient-to-b from-voxa via-[#80b9ff] to-flame transition-[height] duration-75"
              style={{ height: `${scrollPercent}%` }}
            />
          </div>

          {/* Laser Slider Bead / Scrubber Handle */}
          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full border border-white bg-voxa shadow-[0_0_12px_#63a1f2,0_0_24px_rgba(99,161,242,0.8)] transition-all duration-100 ${
              isDragging ? 'scale-125 bg-flame shadow-[0_0_16px_#ff5a3c]' : 'group-hover:scale-110'
            }`}
            style={{
              top: `clamp(6px, ${scrollPercent}%, calc(100% - 18px))`,
            }}
          >
            {/* Inner Core Light */}
            <span className="absolute inset-0.5 rounded-full bg-white" />
          </div>

          {/* Live Tooltip Flyout on Hover or Drag */}
          <div
            className={`pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-lg border border-white/15 bg-[#080a0f]/95 px-2.5 py-1.5 font-dm text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 ${
              isHovered || isDragging
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
          >
            <span className="capitalize text-voxa">{activeSection}</span>
            <span className="text-white/40">•</span>
            <span className="font-manrope font-bold text-white/90 tabular-nums">
              {Math.round(scrollPercent)}%
            </span>
          </div>
        </div>

        {/* Quick Jump Down Button */}
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            })
          }
          aria-label="Scroll to bottom of website"
          className="cursor-pointer flex size-6 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/50 hover:text-voxa hover:border-voxa/50 backdrop-blur-md transition-all text-[0.65rem] shadow-sm hover:scale-110 active:scale-95"
        >
          ▼
        </button>
      </aside>
    </>
  )
}