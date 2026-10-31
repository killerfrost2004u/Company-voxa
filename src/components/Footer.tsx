import { Logo } from './Logo'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Plans', href: '#plans' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="bg-black px-5 py-12 sm:px-8 lg:h-[8.9375rem] lg:p-0">
      <div
        data-reveal="fade"
        className="mx-auto flex max-w-[80rem] flex-col items-center justify-between gap-8 sm:gap-6 lg:h-full lg:flex-row lg:items-center lg:gap-0 lg:px-[2.375rem]"
      >
        {/* VOXA Brand Logo */}
        <a
          href="#home"
          aria-label="Voxa home"
          className="group inline-flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <Logo variant="full" size="md" />
        </a>

        {/* Studio Tagline */}
        <p className="font-dm text-center text-base font-bold text-white sm:text-lg lg:ml-[2.625rem] lg:text-left lg:text-[1.25rem] lg:leading-[1.0804] lg:whitespace-nowrap">
          Designing better digital experiences from Cairo to the world.
        </p>

        {/* Primary Navigation Links */}
        <nav aria-label="Footer" className="flex items-center justify-center gap-6 lg:ml-auto lg:gap-[1.875rem]">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-dm text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:text-voxa"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright Notice */}
        <p className="whitespace-nowrap font-dm text-[0.9375rem] text-[#767676] lg:ml-[2.5rem]">
          © 2026 Voxa Studio
        </p>
      </div>
    </footer>
  )
}
