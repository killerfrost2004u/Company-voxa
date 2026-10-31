import { useEffect, useRef, useState } from 'react'
import { playSupernovaChime, playVortexSwell } from '@/lib/audio'
import { KineticFoldPreloader } from './KineticFoldPreloader'
import { ParticleVortexCanvas } from './ParticleVortexCanvas'
import { PlasmaTracerCanvas } from './PlasmaTracerCanvas'

export type PreloadVariant = 'a' | 'b' | 'c'

type PreloaderProps = {
  onComplete?: () => void
  forcedVariant?: PreloadVariant
}

export function Preloader({ onComplete, forcedVariant }: PreloaderProps) {
  // Determine variant from props, URL param ?preload=a|b|c, or localStorage (defaults to 'a')
  const [variant, setVariant] = useState<PreloadVariant>(() => {
    if (forcedVariant) return forcedVariant
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('preload')?.toLowerCase()
      if (param === 'a' || param === 'b' || param === 'c') return param
      const saved = localStorage.getItem('voxa_preload_variant') as PreloadVariant
      if (saved === 'a' || saved === 'b' || saved === 'c') return saved
    }
    return 'a'
  })

  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'counting' | 'holding' | 'exiting' | 'hidden'>('counting')
  const [isExploding, setIsExploding] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const completedRef = useRef(false)
  const soundEnabledRef = useRef(soundEnabled)
  soundEnabledRef.current = soundEnabled

  const runAnimation = () => {
    completedRef.current = false
    setIsExploding(false)
    setPhase('counting')
    setProgress(0)
    document.body.style.overflow = 'hidden'

    let frameId: number
    const startTime = performance.now()
    const targetDuration = 2200 // 2.2s cinematic sequence

    const updateCounter = (now: number) => {
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / targetDuration, 1)

      // Natural cubic ease-out
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

        const holdTimer = setTimeout(() => {
          sessionStorage.setItem('voxa_preloaded', 'true')
          setPhase('exiting')
          document.body.style.overflow = ''

          if (!completedRef.current) {
            completedRef.current = true
            onComplete?.()
          }

          const exitTimer = setTimeout(() => {
            setPhase('hidden')
          }, 850)

          return () => clearTimeout(exitTimer)
        }, 400)

        return () => clearTimeout(holdTimer)
      }
    }

    frameId = requestAnimationFrame(updateCounter)
    return () => cancelAnimationFrame(frameId)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const isReset = params.get('preload') === 'reset'
    if (isReset) {
      sessionStorage.removeItem('voxa_preloaded')
    }

    const hasPreloaded = sessionStorage.getItem('voxa_preloaded') === 'true'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // If previously preloaded and not requested via query param or switcher, skip
    if (hasPreloaded && !params.get('preload') && !prefersReducedMotion) {
      setPhase('hidden')
      onComplete?.()
      return
    }

    const cleanup = runAnimation()

    return () => {
      cleanup?.()
      document.body.style.overflow = ''
    }
  }, [variant, onComplete])

  const handleSwitchVariant = (next: PreloadVariant) => {
    setVariant(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('voxa_preload_variant', next)
    }
    runAnimation()
  }

  const handleReplay = () => {
    runAnimation()
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev
      if (next) playVortexSwell()
      return next
    })
  }

  if (phase === 'hidden') {
    return null
  }

  // Visual thresholds for Approach A
  const isFlash = progress >= 68 && progress <= 82
  const isEmbossed = progress >= 72

  return (
    <aside
      aria-label="Loading Voxa Studio"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#050608] p-6 transition-transform duration-[850ms] ease-[cubic-bezier(0.85,0,0.15,1)] sm:p-10 md:p-12 ${
        phase === 'exiting' ? '-translate-y-full shadow-[0_40px_100px_rgba(0,0,0,0.95)]' : 'translate-y-0'
      }`}
    >
      {/* Dynamic Backgrounds per Variant */}
      {variant === 'a' && <PlasmaTracerCanvas progress={progress} />}
      {variant === 'c' && <ParticleVortexCanvas progress={progress} isExploding={isExploding} />}

      {/* Atmospheric depth lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgb(99_161_242/0.14),transparent_75%)]"
      />

      {/* Top Bar: Brand, Variant Switcher & Sound */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase">
        <div className="flex items-center gap-2.5 text-white/70">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-flame opacity-75" />
            <span className="relative size-full rounded-full bg-flame" />
          </span>
          <span className="font-dm">VOXA DIGITAL LAB</span>
        </div>

        {/* Live Approach Switcher for User Testing */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md p-1 shadow-lg">
          <button
            type="button"
            onClick={() => handleSwitchVariant('a')}
            className={`cursor-pointer rounded-full px-2.5 py-1 font-dm text-[0.68rem] tracking-wider transition-all duration-300 ${
              variant === 'a'
                ? 'bg-voxa text-ink font-bold shadow-[0_0_12px_rgba(99,161,242,0.5)]'
                : 'text-white/60 hover:text-white'
            }`}
            title="Approach A: Plasma Spark Contour Tracer into 3D Embossed Logo"
          >
            A: Plasma Tracer
          </button>
          <button
            type="button"
            onClick={() => handleSwitchVariant('b')}
            className={`cursor-pointer rounded-full px-2.5 py-1 font-dm text-[0.68rem] tracking-wider transition-all duration-300 ${
              variant === 'b'
                ? 'bg-voxa text-ink font-bold shadow-[0_0_12px_rgba(99,161,242,0.5)]'
                : 'text-white/60 hover:text-white'
            }`}
            title="Approach B: Kinetic Fold & Laser Plane"
          >
            B: Kinetic Fold
          </button>
          <button
            type="button"
            onClick={() => handleSwitchVariant('c')}
            className={`cursor-pointer rounded-full px-2.5 py-1 font-dm text-[0.68rem] tracking-wider transition-all duration-300 ${
              variant === 'c'
                ? 'bg-voxa text-ink font-bold shadow-[0_0_12px_rgba(99,161,242,0.5)]'
                : 'text-white/60 hover:text-white'
            }`}
            title="Approach C: Cosmic Particle Vortex"
          >
            C: Cosmic Vortex
          </button>
        </div>

        {/* Sound & Replay Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReplay}
            className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-2.5 py-1 font-dm text-[0.68rem] tracking-wider text-white/70 hover:border-white/40 hover:text-white transition-all"
            title="Replay intro sequence"
          >
            ↺ REPLAY
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className={`cursor-pointer rounded-full border px-2.5 py-1 font-dm text-[0.68rem] tracking-wider transition-all duration-300 ${
              soundEnabled
                ? 'border-voxa bg-voxa/20 text-voxa shadow-[0_0_12px_rgba(99,161,242,0.4)]'
                : 'border-white/20 bg-white/5 text-white/50 hover:border-white/40 hover:text-white'
            }`}
          >
            {soundEnabled ? 'SOUND: ON ♫' : 'SOUND: OFF'}
          </button>
        </div>
      </div>

      {/* Centerpiece Container */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center select-none">
        {/* Flash Burst during Convergence (Phase 2) */}
        {variant === 'a' && (
          <div
            className="pointer-events-none absolute -inset-32 rounded-full transition-opacity duration-300"
            style={{
              opacity: isFlash ? 0.45 : 0,
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(99,161,242,0.4) 40%, transparent 70%)',
            }}
          />
        )}

        {/* VARIANT A: Plasma Spark Tracer -> 3D Embossed Logo (from Video Frames) */}
        {variant === 'a' && (
          <div className="relative flex flex-col items-center justify-center">
            {/* 3D Embossed Matte White VOXA Typography (Frame 60) */}
            <div
              className="flex items-baseline font-manrope font-extrabold tracking-[-0.04em] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                fontSize: 'clamp(4rem, 14vw, 10.5rem)',
                opacity: isEmbossed ? 1 : 0.05,
                transform: isEmbossed ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)',
                filter: isEmbossed
                  ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 4px 6px rgba(255,255,255,0.45))'
                  : 'none',
              }}
            >
              <span className="inline-block bg-gradient-to-b from-white via-[#f0f4fa] to-[#b8c6d9] bg-clip-text text-transparent">
                VOXA
              </span>
              <span
                className="inline-block text-flame transition-all duration-500"
                style={{
                  opacity: progress >= 75 ? 1 : 0,
                  transform: progress >= 75 ? 'scale(1)' : 'scale(0)',
                  filter: 'drop-shadow(0 0 20px rgba(255,90,60,0.85))',
                }}
              >
                .
              </span>
            </div>

            {/* Subtitle tag */}
            <div className="mt-2 overflow-hidden">
              <p
                className="font-dm text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-white/50 transition-all duration-700 delay-150"
                style={{
                  opacity: isEmbossed ? 1 : 0,
                  transform: isEmbossed ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                From Design To Digital
              </p>
            </div>
          </div>
        )}

        {/* VARIANT B: Kinetic Fold */}
        {variant === 'b' && <KineticFoldPreloader progress={progress} />}

        {/* VARIANT C: Cosmic Particle Vortex */}
        {variant === 'c' && (
          <div className="flex flex-col items-center">
            <div className="flex items-baseline font-manrope font-extrabold tracking-[-0.05em] text-paper text-6xl sm:text-9xl drop-shadow-[0_0_35px_rgba(99,161,242,0.3)]">
              <span>VOXA</span>
              <span className="text-flame">.</span>
            </div>
            <p className="mt-3 font-dm text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white/60">
              Cosmic Spatial Lab
            </p>
          </div>
        )}
      </div>

      {/* Bottom Bar: Minimalist Rounded Pill Progress Bar (Matching Frame 90) */}
      <div className="relative z-20 mx-auto flex w-full max-w-md flex-col items-center gap-3">
        {/* Progress Percentage & Status */}
        <div className="flex w-full items-center justify-between font-dm text-xs uppercase tracking-wider text-white/50">
          <span>{progress < 70 ? 'Synthesizing Contour Geometry...' : progress < 100 ? 'Calibrating 3D Space...' : 'System Ready'}</span>
          <span className="font-manrope text-base sm:text-lg font-bold text-white tabular-nums">
            {String(progress).padStart(2, '0')}%
          </span>
        </div>

        {/* Minimalist Pill Container (Frame 90) */}
        <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-white/10 bg-white/5 p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
          {/* Glowing Fill Bar */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-voxa via-[#80b9ff] to-white transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(99,161,242,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  )
}
