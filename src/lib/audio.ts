/**
 * Lightweight, zero-dependency Web Audio synthesizer for Approach C spatial soundscapes.
 * Safe against autoplay restrictions (silently ignores if context is suspended or blocked).
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioCtx) {
      audioCtx = new AudioCtx()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

/**
 * High-tech laser cutting beam sizzle & hum for Approach C WebGL Volumetric Laser Burn.
 */
export function playLaserSizzle() {
  try {
    const ctx = getAudioContext()
    if (!ctx || ctx.state !== 'running') return

    // Carrier tone
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(80, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 1.8)

    // Resonant bandpass filter sweeps with heat
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(450, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 1.8)
    filter.Q.setValueAtTime(3.0, ctx.currentTime)

    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.3)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 2.1)
  } catch {
    // Silently ignore
  }
}

export function playVortexSwell() {
  try {
    const ctx = getAudioContext()
    if (!ctx || ctx.state !== 'running') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(65, ctx.currentTime) // Low C
    osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 1.6)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(180, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 1.6)

    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 1.9)
  } catch {
    // Silently ignore if blocked by browser policy
  }
}

/**
 * Crystalline shimmer chime when the supernova burst explodes at 100%.
 */
export function playSupernovaChime() {
  try {
    const ctx = getAudioContext()
    if (!ctx || ctx.state !== 'running') return

    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51] // C5, E5, G5, C6, E6
    const now = ctx.currentTime

    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + index * 0.04)

      gain.gain.setValueAtTime(0.001, now + index * 0.04)
      gain.gain.linearRampToValueAtTime(0.08 / (index + 1), now + index * 0.04 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.04 + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + index * 0.04)
      osc.stop(now + index * 0.04 + 1.3)
    })
  } catch {
    // Silently ignore
  }
}
