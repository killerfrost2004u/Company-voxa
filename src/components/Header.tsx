import { useEffect, useState } from 'react'
import { assets } from '@/lib/assets'
import { Logo } from './Logo'
import { navigate } from '@/lib/router'
import { useLanguage } from '@/context/LanguageContext'

function StartNowArrow() {
  return (
    <span className="relative flex h-[0.625rem] w-[0.5625rem] items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
      <img
        src={assets.arrowUpRight}
        alt=""
        className="h-[0.6875rem] w-[0.75rem] max-w-none -rotate-90 rtl:scale-x-[-1]"
      />
    </span>
  )
}

function GlobeIcon() {
  return (
    <svg
      className="size-3.5 text-voxa"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

export function Header({ isLoaded = true }: { isLoaded?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  const navItems = [
    { label: t.header.home, href: '#home' },
    { label: t.header.plans, href: '#plans' },
    { label: t.header.blog, href: '/blog' },
    { label: t.header.contact, href: '#contact' },
    { label: t.header.about, href: '#about' },
  ]

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

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en')
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
      <div className="mx-auto flex h-[4.5rem] max-w-[80rem] items-center px-5 sm:px-8 lg:h-[5.8125rem] lg:px-[2.4375rem]">
        <a
          href="/"
          aria-label="Voxa home"
          onClick={(e) => handleNavClick(e, '/')}
          className="group inline-flex items-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <Logo variant="full" size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="ms-auto hidden items-center gap-[2.25rem] lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group relative whitespace-nowrap font-manrope text-sm lg:text-[0.95rem] font-semibold text-white/80 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 rounded-full bg-voxa transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Action Controls: Language Toggle & Start Now */}
        <div className="ms-auto flex items-center gap-3 sm:gap-4 lg:ms-[2.5rem]">
          {/* Global Language Toggle Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-manrope text-xs font-semibold text-white/90 shadow-sm backdrop-blur-md transition-all hover:border-voxa/60 hover:bg-voxa/10 hover:text-white active:scale-95"
            aria-label={t.header.langButtonAria}
          >
            <GlobeIcon />
            <span>{t.header.langButton}</span>
          </button>

          {/* Desktop Start Now CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-shine group hidden h-[2.5rem] items-center justify-center gap-2 rounded-full bg-voxa px-5 font-manrope text-xs sm:text-sm font-bold text-ash transition-all hover:shadow-[0_0.5rem_1.75rem_-0.5rem_rgb(99_161_242/0.8)] active:scale-95 sm:inline-flex"
          >
            {t.header.startNow}
            <StartNowArrow />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40 lg:hidden"
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
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-expo)] lg:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <div className="flex flex-col px-5 pb-8 pt-2 sm:px-8">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
                className={`border-b border-white/10 py-3.5 font-manrope text-base sm:text-lg font-semibold capitalize text-white/90 transition-colors hover:text-voxa ${
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
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-voxa font-manrope text-base font-bold text-ash shadow-lg active:scale-95"
            >
              {t.header.startNow}
              <StartNowArrow />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
