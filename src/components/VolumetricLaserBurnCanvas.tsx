import { useEffect, useRef } from 'react'

// Vertex Shader: simple fullscreen quad
const VS_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Fragment Shader: Volumetric Laser Burn, Heat Distortion, Anamorphic Flare, and Molten Sparks
const FS_SOURCE = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_progress; // 0.0 to 1.0

// Procedural 2D Hash & Noise
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.05 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;

  // Normalized aspect ratio coordinates
  vec2 p = uv;
  p.x *= aspect;

  // Laser trajectory: sweeps horizontally across the center logo
  float t = smoothstep(0.04, 0.84, u_progress);
  float laser_x = mix(0.12, 0.88, t);
  float laser_y = 0.5 + sin(u_time * 14.0 + u_progress * 20.0) * 0.035;
  vec2 laser_pos = vec2(laser_x * aspect, laser_y);

  // Active laser intensity (switches off during final hold/solidification)
  float laser_active = smoothstep(0.02, 0.06, u_progress) * (1.0 - smoothstep(0.82, 0.90, u_progress));

  // 1. Heat Shimmer / Thermal Distortion Field
  float heat_mask = smoothstep(0.0, 0.45, uv.y - (laser_y - 0.12)) * exp(-abs(uv.x - laser_x) * 4.5) * laser_active;
  vec2 heat_offset = vec2(
    fbm(uv * 18.0 + vec2(0.0, -u_time * 3.5)) - 0.5,
    fbm(uv * 22.0 + vec2(u_time * 1.5, -u_time * 4.0)) - 0.5
  ) * 0.03 * heat_mask;

  vec2 distorted_uv = uv + heat_offset;

  vec3 col = vec3(0.0);

  // 2. Subtle cyber blueprint grid in the background
  vec2 grid = abs(fract(distorted_uv * vec2(28.0 * aspect, 28.0) - 0.5) - 0.5);
  float grid_line = step(grid.x, 0.025) + step(grid.y, 0.025);
  col += vec3(0.02, 0.035, 0.07) * grid_line * 0.35;

  // 3. Smoke & Hot Thermal Gas Plumes
  if (laser_active > 0.02) {
    float smoke = fbm(distorted_uv * 6.5 + vec2(0.0, -u_time * 1.6)) * heat_mask * 0.45;
    col += vec3(0.08, 0.12, 0.22) * smoke;
  }

  // 4. Volumetric Laser Beam, Contact Core & Anamorphic Lens Flare
  if (laser_active > 0.01) {
    // Vertical high-intensity cutting beam from top of screen
    float beam_dist = abs(p.x - laser_pos.x);
    float beam_vert = step(laser_pos.y - 0.02, p.y);
    float beam_core = exp(-beam_dist * 380.0) * beam_vert;
    float beam_glow = exp(-beam_dist * 35.0) * beam_vert * 0.6;

    vec3 beam_color = (vec3(1.0, 1.0, 1.0) * beam_core * 3.5 + vec3(0.25, 0.65, 1.0) * beam_glow * 1.8) * laser_active;
    col += beam_color;

    // Contact point high-energy blast core
    float d_contact = length(p - laser_pos);
    float contact_core = exp(-d_contact * 85.0) * 4.5;
    float contact_halo = exp(-d_contact * 16.0) * 1.4;
    vec3 contact_color = (vec3(1.0, 1.0, 1.0) * contact_core + vec3(0.35, 0.75, 1.0) * contact_halo) * laser_active;
    col += contact_color;

    // Anamorphic horizontal lens flare streak across the screen
    float flare_h = exp(-abs(p.y - laser_pos.y) * 160.0) * exp(-abs(p.x - laser_pos.x) * 3.5);
    col += vec3(0.4, 0.75, 1.0) * flare_h * 2.4 * laser_active;

    // Molten sparks halo
    float ring_dist = abs(d_contact - 0.12);
    float flare_ring = exp(-ring_dist * 50.0) * 0.4 * laser_active;
    col += vec3(1.0, 0.4, 0.1) * flare_ring;
  }

  // 5. Post-convergence global bloom flash (when laser finishes at 84% - 90%)
  float flash = smoothstep(0.82, 0.86, u_progress) * (1.0 - smoothstep(0.86, 0.94, u_progress));
  col += vec3(0.45, 0.7, 1.0) * flash * 0.75;

  // Soft edge vignette
  vec2 vig_uv = uv * (1.0 - uv.yx);
  float vig = vig_uv.x * vig_uv.y * 15.0;
  vig = clamp(pow(vig, 0.3), 0.0, 1.0);
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

export function VolumetricLaserBurnCanvas({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparkCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparksRef = useRef<Spark[]>([])

  useEffect(() => {
    const glCanvas = glCanvasRef.current
    const sparkCanvas = sparkCanvasRef.current
    if (!glCanvas || !sparkCanvas) return

    const gl = (glCanvas.getContext('webgl2') ||
      glCanvas.getContext('webgl') ||
      glCanvas.getContext('experimental-webgl')) as WebGLRenderingContext | null

    if (!gl) {
      console.warn('WebGL not supported for Volumetric Laser Burn, falling back gracefully.')
      return
    }

    const sparkCtx = sparkCanvas.getContext('2d')

    // 1. Compile Shader Program
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VS_SOURCE)
    const fragShader = createShader(gl.FRAGMENT_SHADER, FS_SOURCE)
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    // 2. Setup Fullscreen Quad Buffer
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const aPosition = gl.getAttribLocation(program, 'a_position')
    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uProgress = gl.getUniformLocation(program, 'u_progress')

    // 3. Resize Handler
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)

      const w = window.innerWidth
      const h = window.innerHeight

      glCanvas.width = w * dpr
      glCanvas.height = h * dpr
      gl.viewport(0, 0, glCanvas.width, glCanvas.height)

      sparkCanvas.width = w * dpr
      sparkCanvas.height = h * dpr
      if (sparkCtx) {
        sparkCtx.setTransform(1, 0, 0, 1, 0, 0)
        sparkCtx.scale(dpr, dpr)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    let animationFrameId: number
    const startTime = performance.now()

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const normProgress = Math.min(Math.max(progress / 100, 0), 1)

      // --- A. Render WebGL Volumetric Laser Shader ---
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(aPosition)
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(uResolution, glCanvas.width, glCanvas.height)
      gl.uniform1f(uTime, elapsed)
      gl.uniform1f(uProgress, normProgress)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      // --- B. Render Physics-based Incandescent Sparks ---
      if (sparkCtx) {
        const w = window.innerWidth
        const h = window.innerHeight
        sparkCtx.clearRect(0, 0, w, h)

        const isLaserActive = normProgress > 0.04 && normProgress < 0.84
        if (isLaserActive) {
          const tProgress = Math.min(Math.max((normProgress - 0.04) / 0.8, 0), 1)
          const laserX = (0.12 + tProgress * 0.76) * w
          const laserY = (0.5 + Math.sin(elapsed * 14.0 + normProgress * 20.0) * 0.035) * h

          // Spawn molten sparks
          for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = Math.random() * 6 + 2.5
            sparksRef.current.push({
              x: laserX,
              y: laserY,
              vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 3,
              vy: Math.sin(angle) * speed - Math.random() * 5, // upward burst
              life: 1,
              maxLife: Math.random() * 25 + 15,
              color: Math.random() > 0.4 ? '#ff7a29' : Math.random() > 0.5 ? '#ffcc00' : '#ffffff',
              size: Math.random() * 2.5 + 1,
            })
          }
        }

        // Draw and update sparks
        sparkCtx.save()
        for (let i = sparksRef.current.length - 1; i >= 0; i--) {
          const s = sparksRef.current[i]
          s.x += s.vx
          s.y += s.vy
          s.vy += 0.16 // gravity
          s.vx *= 0.98 // air resistance
          s.life -= 1 / s.maxLife

          if (s.life <= 0) {
            sparksRef.current.splice(i, 1)
            continue
          }

          sparkCtx.globalAlpha = Math.max(0, s.life)
          sparkCtx.fillStyle = s.color
          sparkCtx.shadowBlur = 8
          sparkCtx.shadowColor = s.color
          sparkCtx.beginPath()
          sparkCtx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2)
          sparkCtx.fill()
        }
        sparkCtx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (positionBuffer) gl.deleteBuffer(positionBuffer)
      if (program) gl.deleteProgram(program)
    }
  }, [progress])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 size-full overflow-hidden z-[1]">
      {/* 1. Main WebGL Shader Quad */}
      <canvas ref={glCanvasRef} className="absolute inset-0 size-full" />
      {/* 2. Incandescent Flying Sparks Overlay */}
      <canvas ref={sparkCanvasRef} className="absolute inset-0 size-full" />
    </div>
  )
}
