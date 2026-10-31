import { useEffect, useRef, useState } from 'react'
import { playSupernovaChime, playVortexSwell } from '@/lib/audio'
import { logos } from '@/lib/assets'
import { PlasmaTracerCanvas } from './PlasmaTracerCanvas'

type PreloaderProps = {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'counting' | 'holding' | 'exiting' | 'hidden'>('counting')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const completedRef = useRef(false)
  const soundEnabledRef = useRef(soundEnabled)
  soundEnabledRef.current = soundEnabled

  const runAnimation = () => {
    completedRef.current = false
    setPhase('counting')
    setProgress(0)
    document.body.style.overflow = 'hidden'

    if (soundEnabledRef.current) {
      playVortexSwell()
    }

    let frameId: number
    const startTime = performance.now()
    const targetDuration = 2400 // 2.4s cinematic sequence

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

    const holdParam = params.get('preload')
    if (holdParam === 'hold' || (holdParam !== null && holdParam !== 'reset' && !isNaN(Number(holdParam)))) {
      const fixedProgress = holdParam === 'hold' ? 75 : Math.min(Math.max(Number(holdParam), 0), 100)
      setProgress(fixedProgress)
      setPhase('holding')
      document.body.style.overflow = 'hidden'
      return
    }

    const hasPreloaded = sessionStorage.getItem('voxa_preloaded') === 'true'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // If previously preloaded and not requested via reset query param, skip immediately
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
  }, [onComplete])

  const handleReplay = () => {
    runAnimation()
  }

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

  // Visual thresholds for convergence
  const isFlash = progress >= 68 && progress <= 82
  const isEmbossed = progress >= 72

  return (
    <aside
      aria-label="Loading Voxa Studio"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#040507] p-6 transition-transform duration-[850ms] ease-[cubic-bezier(0.85,0,0.15,1)] sm:p-10 md:p-12 ${
        phase === 'exiting' ? '-translate-y-full shadow-[0_40px_100px_rgba(0,0,0,0.95)]' : 'translate-y-0'
      }`}
    >
      {/* Background Plasma Spark Optical Tracer */}
      <PlasmaTracerCanvas progress={progress} />

      {/* Atmospheric depth radial lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgb(99_161_242/0.14),transparent_75%)]"
      />

      {/* Top Bar: Brand & Controls */}
      <div className="relative z-20 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase">
        <div className="flex items-center gap-2.5 text-white/70">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-flame opacity-75" />
            <span className="relative size-full rounded-full bg-flame" />
          </span>
          <span className="font-dm">VOXA DIGITAL LAB</span>
        </div>

        {/* Sound & Replay Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReplay}
            className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-3 py-1 font-dm text-[0.7rem] tracking-wider text-white/70 hover:border-white/40 hover:text-white transition-all shadow-sm"
            title="Replay intro sequence"
          >
            ↺ REPLAY
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className={`cursor-pointer rounded-full border px-3 py-1 font-dm text-[0.7rem] tracking-wider transition-all duration-300 shadow-sm ${
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
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center select-none pointer-events-none">
        {/* Flash Burst during Convergence */}
        <div
          className="pointer-events-none absolute -inset-32 rounded-full transition-opacity duration-300 z-[1]"
          style={{
            opacity: isFlash ? 0.45 : 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(99,161,242,0.45) 40%, transparent 70%)',
          }}
        />

        {/* Background Atmospheric Ambient Aura */}
        <div
          className="pointer-events-none absolute -inset-24 rounded-full blur-3xl transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(99,161,242,0.35) 0%, rgba(255,90,60,0.2) 50%, transparent 75%)',
            opacity: isEmbossed ? 0.6 : Math.max(0.15, (progress / 100) * 0.4),
          }}
        />

        {/* Background Giant VOXA Emblem Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden z-[1]"
        >
          <img
            src={logos.icon}
            alt=""
            className="size-72 sm:size-88 md:size-[28rem] lg:size-[32rem] object-contain blur-[2px] transition-all duration-700 select-none filter drop-shadow-[0_0_60px_rgba(99,161,242,0.55)] drop-shadow-[0_0_120px_rgba(255,90,60,0.2)]"
            style={{
              opacity: isEmbossed ? 0.18 : Math.max(0.04, (progress / 100) * 0.12),
              transform: isEmbossed ? 'scale(1.04)' : 'scale(0.92)',
            }}
          />
        </div>

        {/* Centered Stack: Emblem Badge + 3D Official VOXA Brand Logo + Subtitle */}
        <div className="relative z-[3] flex flex-col items-center justify-center gap-3 sm:gap-4">
          {/* Official VOXA Icon Badge with Glowing Flame Dot */}
          <div
            className="relative flex items-center justify-center size-20 sm:size-24 md:size-28 rounded-2xl sm:rounded-3xl border border-white/20 bg-white/[0.04] p-3 shadow-[0_0_30px_rgba(99,161,242,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: isEmbossed ? 1 : 0.08,
              transform: isEmbossed ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(12px)',
            }}
          >
            <img
              src={logos.icon}
              alt=""
              aria-hidden="true"
              className="size-full object-contain rounded-xl filter drop-shadow-[0_0_15px_rgba(99,161,242,0.7)]"
            />
            {/* Neon Flame Dot Accent */}
            <span
              className="absolute -bottom-1 -right-1 size-3.5 sm:size-4 rounded-full bg-flame transition-all duration-500"
              style={{
                opacity: progress >= 75 ? 1 : 0,
                transform: progress >= 75 ? 'scale(1)' : 'scale(0)',
                filter: 'drop-shadow(0 0 12px #ff5a3c)',
              }}
            />
          </div>

          {/* 3D Embossed Official VOXA Logo Asset (Not font typography) */}
          <div
            className="relative flex items-center justify-center select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: isEmbossed ? 1 : 0.08,
              transform: isEmbossed ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(12px)',
              filter: isEmbossed
                ? 'drop-shadow(0 18px 36px rgba(0,0,0,0.95)) drop-shadow(0 0 28px rgba(99,161,242,0.85)) drop-shadow(0 0 60px rgba(99,161,242,0.4))'
                : 'none',
            }}
          >
            <img
              src={logos.wordmark}
              alt="VOXA"
              className="h-14 sm:h-18 md:h-22 lg:h-26 w-auto max-w-[85vw] object-contain select-none"
            />
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden">
            <p
              className="font-dm text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-white/60 transition-all duration-700 delay-150"
              style={{
                opacity: isEmbossed ? 1 : 0,
                transform: isEmbossed ? 'translateY(0)' : 'translateY(10px)',
                textShadow: '0 0 12px rgba(99,161,242,0.6)',
              }}
            >
              From Design To Digital
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Engineered Precision Slider with Millimeter Ticks */}
      <div className="relative z-20 mx-auto flex w-full max-w-lg flex-col items-center gap-3">
        {/* Progress Percentage & Status */}
        <div className="flex w-full items-center justify-between font-dm text-xs uppercase tracking-wider text-white/50">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-voxa animate-pulse" />
            <span>
              {progress < 70
                ? 'Synthesizing Contour Geometry...'
                : progress < 100
                ? 'Calibrating 3D Space...'
                : 'System Ready'}
            </span>
          </span>
          <span className="font-manrope text-base sm:text-lg font-bold text-white tabular-nums">
            {String(progress).padStart(2, '0')}%
          </span>
        </div>

        {/* Engineered Progress Track Housing */}
        <div className="relative h-3 w-full overflow-hidden rounded-full border border-white/20 bg-black/60 p-0.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] backdrop-blur-md">
          {/* Subtle Millimeter Calibration Ticks */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-between px-3 py-1 opacity-25">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="h-full w-[1px] bg-white/40" />
            ))}
          </div>

          {/* Glowing Fill Bar */}
          <div
            className="relative h-full rounded-full transition-[width] duration-150 ease-out bg-gradient-to-r from-voxa via-[#80b9ff] to-white shadow-[0_0_16px_rgba(99,161,242,0.9)]"
            style={{ width: `${progress}%` }}
          >
            {/* Blazing Laser Tip / Spark Head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-white shadow-[0_0_12px_#63a1f2]" />
          </div>
        </div>
      </div>
    </aside>
  )
}