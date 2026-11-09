import { Logo } from './Logo'
import { navigate } from '@/lib/router'
import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { lang, t } = useLanguage()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  const navLinks = [
    { label: t.header.home, href: '#home' },
    { label: t.header.plans, href: '#plans' },
    { label: t.header.blog, href: '/blog' },
    { label: t.faq.badge, href: '#faq' },
    { label: t.header.contact, href: '#contact' },
    { label: t.header.about, href: '#about' },
  ]

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050608] px-5 pt-16 pb-28 sm:px-8 sm:pt-20 sm:pb-24 lg:px-[6.1rem] lg:pt-24 lg:pb-28">
      <div className="mx-auto max-w-[80rem]">
        {/* Main 3-Column Agency Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Studio Mission (lg: 5 cols) */}
          <div className="flex flex-col items-start lg:col-span-5">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              aria-label="Voxa Studio home"
              className="group inline-flex items-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <Logo variant="full" size="md" />
            </a>

            <p className="mt-5 max-w-[24rem] font-dm text-[1rem] leading-[1.65] text-white/70 sm:text-[1.125rem]">
              {t.footer.tagline}
            </p>

            {/* Live Availability Status Pill */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-[#25D366] opacity-75" />
                <span className="relative size-full rounded-full bg-[#25D366]" />
              </span>
              <span className="font-dm text-xs font-semibold tracking-wide text-white/90">
                {t.footer.availableBadge}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (lg: 3 cols) */}
          <div className="flex flex-col lg:col-span-3">
            <h3 className="font-dm text-xs font-extrabold uppercase tracking-[0.16em] text-voxa">
              {t.footer.quickLinksTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-manrope text-[1rem] font-medium text-white/80 transition-colors duration-200 hover:text-voxa"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Studio Coordinates (lg: 4 cols) */}
          <div className="flex flex-col lg:col-span-4">
            <h3 className="font-dm text-xs font-extrabold uppercase tracking-[0.16em] text-voxa">
              {t.footer.contactTitle}
            </h3>
            <div className="mt-5 space-y-3.5 font-dm text-[0.9375rem] text-white/70">
              <p className="flex items-center gap-2.5 text-white/90">
                <span className="size-2 rounded-full bg-voxa" />
                <span>{t.footer.cairoEgypt}</span>
              </p>
              <p>
                <a
                  href="mailto:voxaa.business@gmail.com"
                  className="font-medium text-white hover:text-voxa transition-colors"
                >
                  voxaa.business@gmail.com
                </a>
              </p>
              <div className="flex flex-col gap-1.5 pt-1 text-xs text-white/60">
                <a
                  href="https://wa.me/201111717189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +20 1111 717 189
                </a>
                <a
                  href="https://wa.me/201125537697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Direct: +20 1125 537 697
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Divider & Credits */}
        <div className="mt-14 border-t border-white/10 pt-8 sm:mt-16">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left rtl:sm:text-right">
            <p className="font-dm text-xs sm:text-sm text-white/50">
              {t.footer.copyright}
            </p>
            <p className="font-dm text-xs text-white/40">
              {t.footer.customCodeBadge}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
