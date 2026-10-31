import { useRef, useState } from 'react'

export type TestimonialItem = {
  id: string
  name: string
  role: string
  company: string
  location: string
  category: 'startup' | 'ecommerce' | 'corporate'
  quote: string
  metric: string
  rating: number
  initials: string
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Ahmed Mansour',
    role: 'Founder',
    company: 'Northline Studio',
    location: 'Cairo, EG',
    category: 'startup',
    quote: 'Voxa didn’t just deliver a website. They sharpened our story and built a platform we’re genuinely proud to share with global investors.',
    metric: 'Seed Round Closed',
    rating: 5,
    initials: 'AM',
  },
  {
    id: '2',
    name: 'Youssef El-Gammal',
    role: 'Managing Director',
    company: 'Apex Logistics',
    location: 'New Cairo, EG',
    category: 'corporate',
    quote: 'Delivered our multi-branch logistics portal in 14 days flat. The Paymob payment and live tracking integration was completely seamless.',
    metric: '14 Days Delivery',
    rating: 5,
    initials: 'YG',
  },
  {
    id: '3',
    name: 'Laila Farouk',
    role: 'Co-Founder',
    company: 'Aura Fine Jewelry',
    location: 'Zamalek, Cairo',
    category: 'ecommerce',
    quote: 'Our mobile conversion rate jumped by 210% in the first month. The fluid micro-animations feel on par with top European luxury brands.',
    metric: '+210% Mobile Sales',
    rating: 5,
    initials: 'LF',
  },
  {
    id: '4',
    name: 'Karim Abdelrahman',
    role: 'CTO',
    company: 'FinEdge Payments',
    location: 'Sheikh Zayed, EG',
    category: 'startup',
    quote: 'The cleanest code architecture we’ve seen from a regional studio. 100/100 Core Web Vitals, sub-second load times, and zero regressions.',
    metric: '99/100 Performance',
    rating: 5,
    initials: 'KA',
  },
  {
    id: '5',
    name: 'Nourhan El-Shazly',
    role: 'Brand Director',
    company: 'Kayan Architecture',
    location: 'Alexandria, EG',
    category: 'corporate',
    quote: 'They translated our physical spatial architecture into an online masterpiece. Prospective clients consistently mention how refined the site feels.',
    metric: '3x Client Inquiries',
    rating: 5,
    initials: 'NS',
  },
  {
    id: '6',
    name: 'Omar Tarek',
    role: 'CEO',
    company: 'Orbit SaaS',
    location: 'Maadi, Cairo',
    category: 'startup',
    quote: 'Traditional agencies quoted us 2–3 months. Voxa designed, engineered, and launched our complete product marketing platform in under 2 weeks.',
    metric: 'Launched in 12 Days',
    rating: 5,
    initials: 'OT',
  },
  {
    id: '7',
    name: 'Mariam Selim',
    role: 'Head of Marketing',
    company: 'Solis Energy',
    location: 'Cairo, EG',
    category: 'corporate',
    quote: '100% transparent pricing with zero surprises. The 18,000 LE package delivered ten times the ROI of the overpriced corporate agencies.',
    metric: '10x Value ROI',
    rating: 5,
    initials: 'MS',
  },
  {
    id: '8',
    name: 'Ziad Mostafa',
    role: 'Founder',
    company: 'Craftwork Furnishings',
    location: 'Fifth Settlement, EG',
    category: 'ecommerce',
    quote: 'The interactive 3D product showcase and smooth spatial transitions set us miles ahead of every furniture retailer in Egypt.',
    metric: '+185% Dwell Time',
    rating: 5,
    initials: 'ZM',
  },
  {
    id: '9',
    name: 'Tamer Hegazy',
    role: 'Senior Partner',
    company: 'Horizon Capital',
    location: 'Cairo, EG',
    category: 'corporate',
    quote: 'Executive-grade polish. Voxa gives regional founders the international design caliber required to command institutional trust.',
    metric: '$1.4M Deal Sourced',
    rating: 5,
    initials: 'TH',
  },
  {
    id: '10',
    name: 'Salma Radwan',
    role: 'Creative Director',
    company: 'Studio Mim',
    location: 'Giza, EG',
    category: 'startup',
    quote: 'Rarely do developers understand typographic nuances and padding rhythms like Voxa. The final build was 100% faithful to our Figma file.',
    metric: '100% Figma Parity',
    rating: 5,
    initials: 'SR',
  },
  {
    id: '11',
    name: 'Hassan El-Wakil',
    role: 'Operations Lead',
    company: 'NileCart Logistics',
    location: 'Cairo, EG',
    category: 'ecommerce',
    quote: 'High-volume checkout handled thousands of orders during Black Friday without breaking a sweat. Our cart abandonment dropped 38%.',
    metric: '-38% Abandonment',
    rating: 5,
    initials: 'HW',
  },
  {
    id: '12',
    name: 'Dina Fikry',
    role: 'Founder',
    company: 'Bloom Organic Labs',
    location: 'New Cairo, EG',
    category: 'ecommerce',
    quote: 'Working with Voxa felt like having a boutique Silicon Valley design team right here in Cairo. Thoughtful, communicative, and ridiculously fast.',
    metric: 'Top-Rated Store',
    rating: 5,
    initials: 'DF',
  },
  {
    id: '13',
    name: 'Mahmoud Sherif',
    role: 'Co-Founder',
    company: 'ByteForge AI',
    location: 'Alexandria, EG',
    category: 'startup',
    quote: 'Speed and technical excellence. The automated SMTP contact delivery and responsive design were tested and flawless from day one.',
    metric: 'Sub-second Load',
    rating: 5,
    initials: 'MS',
  },
  {
    id: '14',
    name: 'Rania Barakat',
    role: 'Principal Attorney',
    company: 'Barakat Law Firm',
    location: 'Dokki, Giza',
    category: 'corporate',
    quote: 'Sophisticated, authoritative, and perfectly responsive across phones and tablets. Inbound high-value retainer inquiries more than doubled.',
    metric: '2.4x Retainers',
    rating: 5,
    initials: 'RB',
  },
  {
    id: '15',
    name: 'Mostafa Kamel',
    role: 'VP Product',
    company: 'Nexus Cloud Infrastructure',
    location: 'Sheikh Zayed, EG',
    category: 'startup',
    quote: 'The best engineering investment our company made this year. High performance, elegant glassmorphism, and instant WhatsApp pipeline.',
    metric: 'Zero Downtime',
    rating: 5,
    initials: 'MK',
  },
  {
    id: '16',
    name: 'Farida El-Sayed',
    role: 'Founder',
    company: 'Raw Materials Studio',
    location: 'Cairo, EG',
    category: 'corporate',
    quote: 'From brand vision to final web deployment, Voxa exceeded every single milestone. They treat your product as if it were their own.',
    metric: 'Premier Launch',
    rating: 5,
    initials: 'FE',
  },
]

export function Testimonial() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'startup' | 'ecommerce' | 'corporate'>('all')
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const filtered =
    activeCategory === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === activeCategory)

  // Split into two rows for staggered infinite floating marquee
  const row1 = filtered.slice(0, Math.ceil(filtered.length / 2))
  const row2 = filtered.slice(Math.ceil(filtered.length / 2))

  const scrollByAmount = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* Ambient background depth lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[70rem] -z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgb(99_161_242/0.08),transparent_75%)]"
      />

      <div className="relative mx-auto max-w-[82rem] px-5 sm:px-8 mb-12 sm:mb-16 text-center">
        {/* Rating Pill Badge */}
        <div data-reveal="pop" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md mb-6">
          <div className="flex text-[#ffb800] text-sm">
            {'★'.repeat(5)}
          </div>
          <span className="font-dm text-xs font-bold tracking-wider uppercase text-white/80">
            5.0 RATED BY 20+ FOUNDERS IN EGYPT & REGION
          </span>
        </div>

        {/* Section Heading */}
        <h2
          data-reveal="rise"
          className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-white leading-[1.08]"
        >
          Built for founders who <span className="text-voxa">refuse to compromise.</span>
        </h2>
        <p
          data-reveal="up"
          className="mt-4 max-w-2xl mx-auto font-dm text-base sm:text-lg text-white/60"
        >
          From Cairo and Alexandria to Dubai and London, we partner with ambitious teams to engineer digital experiences that convert.
        </p>

        {/* Interactive Category Filter Pills & Slider Scrub Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All (${TESTIMONIALS.length})` },
              { id: 'startup', label: 'Tech & Startups' },
              { id: 'ecommerce', label: 'E-Commerce' },
              { id: 'corporate', label: 'Corporate & Services' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                className={`cursor-pointer rounded-full px-4 py-1.5 font-dm text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-voxa text-ink shadow-[0_0_15px_rgba(99,161,242,0.45)]'
                    : 'border border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Manual Scroll Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-380)}
              aria-label="Scroll left"
              className="cursor-pointer flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:border-voxa hover:text-voxa hover:bg-voxa/10 transition-all"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(380)}
              aria-label="Scroll right"
              className="cursor-pointer flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:border-voxa hover:text-voxa hover:bg-voxa/10 transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Floating Marquee / Horizontal Slider Wall */}
      <div
        ref={scrollContainerRef}
        className="group relative flex flex-col gap-6 overflow-x-auto pb-6 scrollbar-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {/* Track 1: Drift Left */}
        <div className="flex w-max gap-6 animate-drift-slow group-hover:[animation-play-state:paused] px-4">
          {[...row1, ...row1].map((item, index) => (
            <TestimonialCard key={`r1-${item.id}-${index}`} item={item} />
          ))}
        </div>

        {/* Track 2: Drift Right */}
        <div className="flex w-max gap-6 animate-drift-slow [animation-direction:reverse] group-hover:[animation-play-state:paused] px-4">
          {[...row2, ...row2].map((item, index) => (
            <TestimonialCard key={`r2-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="relative flex w-[22rem] sm:w-[26rem] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-6 sm:p-7 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-voxa/50 hover:bg-white/[0.08] hover:-translate-y-1.5 select-none">
      {/* Header: Stars & Metric Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex text-[#ffb800] text-sm tracking-wider">
            {'★'.repeat(item.rating)}
          </div>
          <span className="rounded-full border border-voxa/30 bg-voxa/10 px-2.5 py-0.5 font-dm text-[0.68rem] font-bold text-voxa tracking-wider uppercase">
            {item.metric}
          </span>
        </div>

        {/* Body Quote */}
        <blockquote className="font-manrope text-sm sm:text-base leading-relaxed text-white/90 font-medium">
          “{item.quote}”
        </blockquote>
      </div>

      {/* Footer: Avatar, Name, Role, Location */}
      <footer className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-voxa to-flame font-manrope text-xs font-black text-ink shadow-[0_0_12px_rgba(99,161,242,0.4)]">
          {item.initials}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-manrope text-sm font-bold text-white truncate">{item.name}</span>
            <span className="size-1 rounded-full bg-voxa" />
            <span className="font-dm text-xs text-white/50 truncate">{item.location}</span>
          </div>
          <p className="font-dm text-xs text-white/60 truncate">
            {item.role}, <span className="text-white/80 font-medium">{item.company}</span>
          </p>
        </div>
      </footer>
    </article>
  )
}
