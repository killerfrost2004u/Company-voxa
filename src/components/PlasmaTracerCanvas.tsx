import { useEffect, useRef } from 'react'

type Point = [number, number]
type Segment = {
  from: Point
  to: Point
  progressRange: [number, number]
}

// Letter strokes mapped to normalized [0..1000, 0..400] coordinate grid
const STROKES: Segment[] = [
  // V: down then up
  { from: [180, 100], to: [240, 280], progressRange: [0, 8] },
  { from: [240, 280], to: [300, 100], progressRange: [8, 16] },

  // O: approximated with 8 smooth line segments around ellipse center (420, 190)
  { from: [420, 100], to: [480, 130], progressRange: [16, 20] },
  { from: [480, 130], to: [485, 250], progressRange: [20, 24] },
  { from: [485, 250], to: [420, 280], progressRange: [24, 28] },
  { from: [420, 280], to: [355, 250], progressRange: [28, 32] },
  { from: [355, 250], to: [360, 130], progressRange: [32, 36] },
  { from: [360, 130], to: [420, 100], progressRange: [36, 40] },

  // X: two diagonals
  { from: [550, 105], to: [660, 275], progressRange: [40, 48] },
  { from: [660, 105], to: [550, 275], progressRange: [48, 56] },

  // A: left leg, right leg, crossbar
  { from: [730, 280], to: [795, 100], progressRange: [56, 62] },
  { from: [795, 100], to: [860, 280], progressRange: [62, 68] },
  { from: [752, 220], to: [838, 220], progressRange: [68, 72] },

  // Dot
  { from: [900, 260], to: [900, 275], progressRange: [72, 75] },
]

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

export function PlasmaTracerCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparksRef = useRef<Spark[]>([])
  const headPosRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      if (width === 0 || height === 0) return

      ctx.clearRect(0, 0, width, height)

      // Scale normalized 1000x400 coordinate space to fit canvas aspect ratio
      const scale = Math.min((width * 0.85) / 1000, (height * 0.75) / 400)
      const offsetX = (width - 1000 * scale) / 2
      const offsetY = (height - 400 * scale) / 2

      const transformPoint = (p: Point): Point => [p[0] * scale + offsetX, p[1] * scale + offsetY]

      // 1. Draw glowing traced paths up to current progress
      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      let currentHead: Point | null = null

      for (const seg of STROKES) {
        const [startP, endP] = seg.progressRange
        if (progress < startP) continue

        const p1 = transformPoint(seg.from)
        const p2 = transformPoint(seg.to)

        ctx.beginPath()
        ctx.moveTo(p1[0], p1[1])

        if (progress >= endP) {
          // Fully traced segment
          ctx.lineTo(p2[0], p2[1])
          ctx.lineWidth = 3 * scale
          ctx.strokeStyle = 'rgba(99, 161, 242, 0.45)'
          ctx.shadowBlur = 10 * scale
          ctx.shadowColor = '#63a1f2'
          ctx.stroke()

          // Brighter inner core
          ctx.beginPath()
          ctx.moveTo(p1[0], p1[1])
          ctx.lineTo(p2[0], p2[1])
          ctx.lineWidth = 1.2 * scale
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
          ctx.shadowBlur = 4 * scale
          ctx.shadowColor = '#ffffff'
          ctx.stroke()
        } else {
          // Partially traced active segment
          const t = (progress - startP) / (endP - startP)
          const currX = p1[0] + (p2[0] - p1[0]) * t
          const currY = p1[1] + (p2[1] - p1[1]) * t
          ctx.lineTo(currX, currY)

          ctx.lineWidth = 4 * scale
          ctx.strokeStyle = '#63a1f2'
          ctx.shadowBlur = 18 * scale
          ctx.shadowColor = '#63a1f2'
          ctx.stroke()

          // Inner spark
          ctx.beginPath()
          ctx.moveTo(p1[0], p1[1])
          ctx.lineTo(currX, currY)
          ctx.lineWidth = 1.8 * scale
          ctx.strokeStyle = '#ffffff'
          ctx.stroke()

          currentHead = [currX, currY]
        }
      }

      // 2. Active electric spark at tracer head
      if (currentHead && progress < 75) {
        headPosRef.current = { x: currentHead[0], y: currentHead[1] }

        // Spawn trailing sparks
        if (Math.random() < 0.8) {
          for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = (Math.random() * 2 + 1) * scale
            sparksRef.current.push({
              x: currentHead[0],
              y: currentHead[1],
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 1,
              maxLife: Math.random() * 20 + 15,
              color: Math.random() > 0.3 ? '#63a1f2' : '#ff5a3c',
            })
          }
        }

        // Draw electric comet head
        const grad = ctx.createRadialGradient(
          currentHead[0],
          currentHead[1],
          0,
          currentHead[0],
          currentHead[1],
          22 * scale,
        )
        grad.addColorStop(0, '#ffffff')
        grad.addColorStop(0.25, '#74b1ff')
        grad.addColorStop(0.7, 'rgba(99, 161, 242, 0.5)')
        grad.addColorStop(1, 'transparent')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(currentHead[0], currentHead[1], 22 * scale, 0, Math.PI * 2)
        ctx.fill()
      }

      // 3. Update & render particle sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 1 / s.maxLife

        if (s.life <= 0) {
          sparksRef.current.splice(i, 1)
          continue
        }

        ctx.fillStyle = s.color
        ctx.globalAlpha = Math.max(0, s.life)
        ctx.shadowBlur = 6 * scale
        ctx.shadowColor = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, Math.max(0.8, 2 * s.life * scale), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full z-[2]"
      style={{ opacity: progress >= 85 ? Math.max(0, 1 - (progress - 85) / 10) : 1 }}
    />
  )
}
