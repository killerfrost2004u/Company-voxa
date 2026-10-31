import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  color: string
  angle: number
  orbitRadius: number
  orbitSpeed: number
  alpha: number
  initialOrbit: number
}

type ParticleVortexCanvasProps = {
  progress: number
  isExploding: boolean
  className?: string
}

const COLORS = [
  'rgba(99, 161, 242, ', // Electric Blue (Voxa)
  'rgba(116, 177, 255, ', // Cyan Blue
  'rgba(255, 90, 60, ',   // Flame Orange
  'rgba(255, 254, 250, ', // Paper White
  'rgba(200, 225, 255, ', // Star Silver
]

export function ParticleVortexCanvas({ progress, isExploding, className = '' }: ParticleVortexCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const progressRef = useRef(progress)
  const isExplodingRef = useRef(isExploding)

  progressRef.current = progress
  isExplodingRef.current = isExploding

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX - width / 2
      mouseRef.current.y = e.clientY - height / 2
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Particle Count optimized for 60fps across devices
    const particleCount = window.innerWidth < 768 ? 220 : 420
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const orbit = Math.random() * (Math.min(width, height) * 0.45) + 30
      const angle = Math.random() * Math.PI * 2
      const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)]

      particles.push({
        x: Math.cos(angle) * orbit,
        y: Math.sin(angle) * orbit,
        z: (Math.random() - 0.5) * 500,
        vx: 0,
        vy: 0,
        vz: 0,
        radius: Math.random() * 2.2 + 0.8,
        color: baseColor,
        angle,
        orbitRadius: orbit,
        initialOrbit: orbit,
        orbitSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        alpha: Math.random() * 0.7 + 0.3,
      })
    }

    particlesRef.current = particles

    let prevTime = performance.now()
    const fov = 400

    const render = (time: number) => {
      const delta = Math.min((time - prevTime) / 1000, 0.1)
      prevTime = time

      ctx.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const currentProg = progressRef.current / 100
      const exploding = isExplodingRef.current

      // Dynamic speed multiplier based on progress (accelerates as counter reaches 100)
      const speedMultiplier = 1 + currentProg * 3.5

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (exploding) {
          // Supernova explosion physics
          if (p.vx === 0 && p.vy === 0) {
            const burstSpeed = Math.random() * 800 + 400
            const burstAngle = Math.atan2(p.y, p.x) + (Math.random() - 0.5) * 0.4
            p.vx = Math.cos(burstAngle) * burstSpeed
            p.vy = Math.sin(burstAngle) * burstSpeed
            p.vz = (Math.random() - 0.5) * 600
          }

          p.x += p.vx * delta
          p.y += p.vy * delta
          p.z += p.vz * delta
          p.alpha = Math.max(0, p.alpha - delta * 1.2)
        } else {
          // Vortex Orbital Motion
          p.angle += p.orbitSpeed * speedMultiplier * delta * 60

          // Inward gravity pull as progress nears 100
          const compression = Math.max(0.15, 1 - currentProg * 0.45)
          const targetOrbit = p.initialOrbit * compression

          p.orbitRadius += (targetOrbit - p.orbitRadius) * 0.05

          // Calculate 3D position
          let targetX = Math.cos(p.angle) * p.orbitRadius
          let targetY = Math.sin(p.angle) * p.orbitRadius
          p.z += Math.sin(p.angle * 2) * 2

          // Interactive subtle mouse repulsion / attraction
          if (mouseRef.current.active) {
            const dx = targetX - mouseRef.current.x
            const dy = targetY - mouseRef.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 220 && dist > 1) {
              const force = (220 - dist) / 220
              targetX += (dx / dist) * force * 35
              targetY += (dy / dist) * force * 35
            }
          }

          p.x = targetX
          p.y = targetY
        }

        // 3D Perspective Projection
        const scale = fov / (fov + p.z)
        if (scale <= 0) continue

        const screenX = centerX + p.x * scale
        const screenY = centerY + p.y * scale
        const screenRadius = Math.max(0.5, p.radius * scale)

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${Math.min(1, Math.max(0, p.alpha * scale))})`
        ctx.fill()

        // Occasional light connections between nearby particles for constellation feel
        if (i % 4 === 0 && !exploding && currentProg > 0.3) {
          for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
            const p2 = particles[j]
            const p2Scale = fov / (fov + p2.z)
            const p2ScreenX = centerX + p2.x * p2Scale
            const p2ScreenY = centerY + p2.y * p2Scale

            const dist = Math.hypot(screenX - p2ScreenX, screenY - p2ScreenY)
            if (dist < 65) {
              ctx.beginPath()
              ctx.moveTo(screenX, screenY)
              ctx.lineTo(p2ScreenX, p2ScreenY)
              ctx.strokeStyle = `rgba(99, 161, 242, ${(1 - dist / 65) * 0.18 * p.alpha})`
              ctx.lineWidth = 0.75
              ctx.stroke()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
