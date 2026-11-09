import { useEffect, useState } from 'react'
import { assets } from '@/lib/assets'
import { Logo } from './Logo'
import { navigate } from '@/lib/router'

// Widths are the Figma text boxes, which keeps the link positions exact on desktop.
const NAV = [
  { label: 'Home', href: '#home', className: 'lg:w-[4.25rem]' },
  { label: 'plans', href: '#plans', className: 'lg:w-[3.9375rem]' },
  { label: 'Blog', href: '/blog', className: 'lg:w-[4.25rem]' },
  { label: 'Contact us', href: '#contact', className: 'lg:w-[8rem]' },
  { label: 'About us', href: '#about', className: 'lg:w-[6.4375rem]' },
]

function StartNowArrow() {
  return (
    <span className="relative flex h-[0.625rem] w-[0.5625rem] items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
      <img
        src={assets.arrowUpRight}
        alt=""
        className="h-[0.6875rem] w-[0.75rem] max-w-none -rotate-90"
      />
    </span>
  )
}

export function Header({ isLoaded = true }: { isLoaded?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isLoaded) return
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isLoaded])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    navigate(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,opacity,transform] duration-500 ${
        !isLoaded
          ? 'pointer-events-none -translate-y-full opacity-0'
          : 'animate-header-in'
      } ${
        solid
          ? 'bg-ink/80 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[80rem] items-center px-5 sm:px-8 lg:h-[5.8125rem] lg:pl-[2.4375rem] lg:pr-[2.6875rem]">
        <a
          href="/"
          aria-label="Voxa home"
          onClick={(e) => handleNavClick(e, '/')}
          className="group inline-flex items-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <Logo variant="full" size="md" />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-[2.875rem] lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`group relative whitespace-nowrap font-manrope text-[1.4799rem] font-bold leading-[1.485] text-white ${item.className ?? ''}`}
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-right scale-x-0 rounded-full bg-voxa transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="btn-shine group ml-auto hidden h-[2.8125rem] w-[8.9375rem] items-center justify-center gap-[0.625rem] rounded-full bg-voxa px-[1.4375rem] pb-[0.3125rem] pt-[0.25rem] font-manrope text-[1rem] font-bold leading-[2.1976rem] text-white transition-shadow duration-300 hover:shadow-[0_0.5rem_1.75rem_-0.5rem_rgb(99_161_242/0.8)] sm:inline-flex lg:ml-[4.0625rem]"
        >
          Start Now
          <StartNowArrow />
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40 sm:ml-3 lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${
                open ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${
                open ? '-translate-y-[5px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-expo)] lg:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <div className="flex flex-col px-5 pb-8 pt-2 sm:px-8">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
                className={`border-b border-white/10 py-4 font-manrope text-[1.75rem] font-bold capitalize text-white transition-[translate,opacity,color] duration-500 hover:text-voxa ${
                  open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              tabIndex={open ? 0 : -1}
              className="mt-6 inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-voxa font-manrope text-lg font-bold text-white shadow-lg active:scale-95"
            >
              Start Now
              <StartNowArrow />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
