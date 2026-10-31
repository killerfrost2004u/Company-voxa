import { useEffect, useRef, useState } from 'react'
import { playSupernovaChime, playVortexSwell } from '@/lib/audio'
import { ParticleVortexCanvas } from './ParticleVortexCanvas'

type PreloaderProps = {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'counting' | 'holding' | 'exiting' | 'hidden'>('counting')
  const [isExploding, setIsExploding] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const completedRef = useRef(false)
  const soundEnabledRef = useRef(soundEnabled)
  soundEnabledRef.current = soundEnabled

  useEffect(() => {
    // Allow URL override ?preload=reset to easily test the preloader anytime
    const params = new URLSearchParams(window.location.search)
    if (params.get('preload') === 'reset') {
      sessionStorage.removeItem('voxa_preloaded')
    }

    // Check if user already saw the preloader in this session
    const hasPreloaded = sessionStorage.getItem('voxa_preloaded') === 'true'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (hasPreloaded || prefersReducedMotion) {
      setPhase('hidden')
      onComplete?.()
      return
    }

    // Lock body scroll during preload
    document.body.style.overflow = 'hidden'

    let frameId: number
    const startTime = performance.now()
    const targetDuration = 1900 // ~1.9 seconds total count duration

    const updateCounter = (now: number) => {
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / targetDuration, 1)

      // Exponential ease-out curve for natural, weighted acceleration
      const eased = 1 - Math.pow(1 - rawProgress, 3)
      const currentCount = Math.min(Math.floor(eased * 100), 100)

      setProgress(currentCount)

      if (rawProgress < 1) {
        frameId = requestAnimationFrame(updateCounter)
      } else {
        setProgress(100)
        setIsExploding(true)
        setPhase('holding')

        if (soundEnabledRef.current) {
          playSupernovaChime()
        }

        // Brief hold at 100% with supernova particles before curtain split
        const holdTimer = setTimeout(() => {
          sessionStorage.setItem('voxa_preloaded', 'true')
          setPhase('exiting')
          document.body.style.overflow = ''

          if (!completedRef.current) {
            completedRef.current = true
            onComplete?.()
          }

          // Complete curtain unmount after transition completes (850ms)
          const exitTimer = setTimeout(() => {
            setPhase('hidden')
          }, 850)

          return () => clearTimeout(exitTimer)
        }, 340)

        return () => clearTimeout(holdTimer)
      }
    }

    frameId = requestAnimationFrame(updateCounter)

    return () => {
      cancelAnimationFrame(frameId)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev
      if (next) {
        playVortexSwell()
      }
      return next
    })
  }

  if (phase === 'hidden') {
    return null
  }

  // Letter reveal thresholds based on loading progress
  const showV = progress >= 15
  const showO = progress >= 35
  const showX = progress >= 55
  const showA = progress >= 75
  const showDot = progress >= 90

  return (
    <aside
      aria-label="Loading Voxa Studio"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-ink p-6 transition-transform duration-[850ms] ease-[cubic-bezier(0.85,0,0.15,1)] sm:p-10 md:p-14 ${
        phase === 'exiting' ? '-translate-y-full shadow-[0_40px_100px_rgba(0,0,0,0.95)]' : 'translate-y-0'
      }`}
    >
      {/* 3D Cosmic Particle Vortex & Supernova Canvas (Approach C) */}
      <ParticleVortexCanvas progress={progress} isExploding={isExploding} />

      {/* Atmospheric radial depth glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgb(99_161_242/0.1),transparent_75%)]"
      />

      {/* Top Bar: Brand Meta, Status & Sound Toggle */}
      <div className="relative z-10 flex items-center justify-between text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase">
        <div className="flex items-center gap-2.5 text-white/60">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-flame opacity-75" />
            <span className="relative size-full rounded-full bg-flame" />
          </span>
          <span className="font-dm">VOXA SPATIAL LAB</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSound}
            className={`cursor-pointer rounded-full border px-3 py-1 font-dm text-[0.7rem] tracking-[0.15em] transition-all duration-300 ${
              soundEnabled
                ? 'border-voxa bg-voxa/20 text-voxa shadow-[0_0_12px_rgba(99,161,242,0.4)]'
                : 'border-white/20 bg-white/5 text-white/50 hover:border-white/40 hover:text-white'
            }`}
          >
            {soundEnabled ? 'SOUND: ON ♫' : 'SOUND: OFF'}
          </button>

          <div className="hidden sm:flex items-center gap-3 text-white/40 font-dm">
            <span>CAIRO, EG</span>
            <span className="text-white/20">•</span>
            <span>EST. 2025</span>
          </div>
        </div>
      </div>

      {/* Centerpiece: Masked Typographic Stagger & Converging Mark */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        {/* Large Brand Typography with Overflow Masking */}
        <div className="flex items-baseline overflow-hidden font-manrope text-[4.5rem] font-extrabold tracking-[-0.05em] text-paper sm:text-[7.5rem] md:text-[10rem] lg:text-[12rem] leading-none select-none drop-shadow-[0_0_35px_rgba(99,161,242,0.2)]">
          <span
            className={`inline-block transition-all duration-700 ease-[var(--ease-expo)] ${
              showV ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            V
          </span>
          <span
            className={`inline-block transition-all duration-700 ease-[var(--ease-expo)] ${
              showO ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            O
          </span>
          <span
            className={`inline-block transition-all duration-700 ease-[var(--ease-expo)] ${
              showX ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            X
          </span>
          <span
            className={`inline-block transition-all duration-700 ease-[var(--ease-expo)] ${
              showA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            A
          </span>
          <span
            className={`inline-block text-flame transition-all duration-500 ease-[var(--ease-expo)] ${
              showDot
                ? 'scale-100 translate-y-0 opacity-100 drop-shadow-[0_0_24px_rgba(255,90,60,0.85)]'
                : 'scale-0 translate-y-8 opacity-0'
            }`}
          >
            .
          </span>
        </div>

        {/* Dynamic Editorial Subtitle */}
        <div className="mt-4 sm:mt-6 overflow-hidden">
          <p
            className={`font-dm text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-white/60 transition-all duration-700 delay-200 ease-[var(--ease-expo)] ${
              showX ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Spatial Design & Digital Architecture
          </p>
        </div>
      </div>

      {/* Bottom Bar: Tabular Counter & Progress Bar */}
      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
        <div className="flex items-end justify-between font-dm text-xs sm:text-sm">
          <span className="text-white/40 tracking-[0.12em] uppercase">
            {progress < 100 ? 'Synthesizing 3D Elements...' : 'Singularity Achieved'}
          </span>
          <div className="font-manrope text-3xl sm:text-5xl font-extrabold tracking-tight text-voxa tabular-nums leading-none">
            {String(progress).padStart(2, '0')}
            <span className="text-lg sm:text-2xl font-bold text-white/50 ml-0.5">%</span>
          </div>
        </div>

        {/* Sleek Progress Track */}
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-voxa via-[#74b1ff] to-flame transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Glowing head indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-2.5 rounded-full bg-flame shadow-[0_0_14px_#ff5a3c] transition-[left] duration-150 ease-out"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  )
}
