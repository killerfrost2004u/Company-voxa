import { useRef, type PointerEvent } from 'react'
import { assets, logos } from '@/lib/assets'
import { delay } from '@/lib/style'

const lineMask = 'block overflow-hidden pb-[0.16em] -mb-[0.16em]'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // Mouse parallax for the stars and glow (fine pointers only).
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    sectionRef.current.style.setProperty('--px', x.toFixed(3))
    sectionRef.current.style.setProperty('--py', y.toFixed(3))
  }
  const onPointerLeave = () => {
    sectionRef.current?.style.setProperty('--px', '0')
    sectionRef.current?.style.setProperty('--py', '0')
  }

  const onMagneticMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16
    const y = (e.clientY - rect.top - rect.height / 2) * 0.16
    e.currentTarget.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
  }

  const onMagneticLeave = (e: PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[14.5313rem] -translate-x-1/2 transition-transform duration-1000 ease-out"
        style={{ transform: 'translate3d(calc(var(--px, 0) * 1.5rem), calc(var(--py, 0) * 1rem), 0)' }}
      >
        <img
          src={assets.heroGlow}
          alt=""
          className="h-[43.4375rem] w-[82.9375rem] max-w-none animate-breathe"
        />
      </div>

      <div className="relative mx-auto max-w-[80rem] px-5 pb-12 pt-[7.5rem] sm:px-8 sm:pt-[9rem] lg:h-[50.3125rem] lg:px-0 lg:pb-0 lg:pl-[2.3781rem] lg:pt-[9.2694rem]">
        <div className="relative z-[2]">
          <div
            data-reveal="up"
            style={delay(80)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1.5 pr-3.5 backdrop-blur-md"
          >
            <div className="flex size-5 items-center justify-center rounded-full bg-voxa/20">
              <img src={logos.icon} alt="" className="size-3.5 object-contain" />
            </div>
            <span className="relative flex size-[0.5rem] shrink-0">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-flame" />
              <span className="relative size-full rounded-full bg-flame" />
            </span>
            <span className="font-dm text-[0.75rem] font-bold uppercase tracking-[0.12em] text-paper lg:text-[0.8139rem]">
              Available for new projects
            </span>
          </div>

          <h1
            data-reveal-group
            className="mt-8 font-manrope text-[clamp(3.25rem,15vw,6.5rem)] font-bold leading-[0.947] tracking-[-0.05918em] text-paper lg:mt-[2.8119rem] lg:text-[7.1033rem]"
          >
            <span className={lineMask}>
              <span data-reveal="rise" style={delay(160)} className="block">
                From design
              </span>
            </span>
            <span className={lineMask}>
              <span data-reveal="rise" style={delay(280)} className="block">
                to <span className="text-voxa">digital.</span>
              </span>
            </span>
          </h1>

          <p
            data-reveal="up"
            style={delay(440)}
            className="mt-7 max-w-[36.9963rem] font-manrope text-[1.125rem] leading-[1.5] text-[#b7b3ac] sm:text-[1.3rem] lg:mt-[4.2313rem] lg:text-[1.4799rem] lg:leading-[1.485]"
          >
            Voxa turns bold ideas into beautiful, high-performing websites that feel as good as they
            function.
          </p>

          <div
            data-reveal="up"
            style={delay(580)}
            className="mt-9 flex flex-wrap items-center gap-x-[2.2198rem] gap-y-6 lg:ml-[0.1132rem] lg:mt-[3.15rem]"
          >
            <a
              href="#plans"
              onPointerMove={onMagneticMove}
              onPointerLeave={onMagneticLeave}
              className="btn-shine group inline-flex items-center justify-center gap-[0.8139rem] border-[0.074rem] border-transparent bg-voxa px-5 py-3.5 font-dm text-[1.125rem] font-bold leading-[1.05] text-ash transition-[box-shadow,background-color] duration-300 hover:shadow-[0_0.75rem_2rem_-0.75rem_rgb(99_161_242/0.9)] sm:text-[1.25rem] lg:px-[1.5539rem] lg:py-[1.1099rem] lg:text-[1.4799rem]"
            >
              Explore our plans
              <span className="flex size-[1.4059rem] items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <img src={assets.arrowRight} alt="" className="h-[0.8201rem] w-[0.9372rem] max-w-none" />
              </span>
            </a>

            <a href="#services" className="group inline-flex items-start gap-[0.4244rem] font-dm font-bold">
              <span className="relative block h-[1.9238rem] whitespace-nowrap text-[1.1839rem] leading-[1.3125] text-paper lg:w-[9.9519rem]">
                See how we work
                <span className="absolute inset-x-0 bottom-0 h-[0.074rem] bg-paper" />
                <span className="absolute inset-x-0 bottom-0 h-[0.074rem] origin-left scale-x-0 bg-voxa transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100" />
              </span>
              <span className="text-[1.0359rem] leading-[1.5] text-flame transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                ↘
              </span>
            </a>
          </div>
        </div>

        <div
          data-reveal="scale"
          style={delay(260)}
          className="pointer-events-none relative mx-auto -mb-6 mt-4 aspect-[626.45/649] w-full max-w-[24rem] sm:max-w-[28rem] lg:absolute lg:left-[calc(50%+1.3956rem)] lg:top-[7.3125rem] lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-[40.5625rem] lg:w-[39.153rem] lg:max-w-none"
        >
          <div
            className="size-full transition-transform duration-700 ease-out"
            style={{ transform: 'translate3d(calc(var(--px, 0) * -1.5rem), calc(var(--py, 0) * -1.25rem), 0)' }}
          >
            <div className="size-full animate-float">
              <img src={assets.stars} alt="" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
