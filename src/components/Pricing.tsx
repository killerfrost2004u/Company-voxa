import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { assets } from '@/lib/assets'
import { delay, vars } from '@/lib/style'
import { Logo } from './Logo'
import { useLanguage } from '@/context/LanguageContext'

type Plan = {
  name: string
  nameAr?: string
  tierNumber: string
  description: string
  descriptionAr?: string
  amount: string
  amountAr?: string
  amountPrefix?: string
  amountPrefixAr?: string
  amountSuffix?: string
  amountSuffixAr?: string
  isCustomQuote?: boolean
  popular?: boolean
  timeline: string
  timelineAr?: string
  scope: string
  scopeAr?: string
  features: string[]
  featuresAr?: string[]
  layout: Record<`--${string}`, string>
  descriptionClass: string
  featureClass: (index: number) => string
  outlined?: boolean
  listGap: string
  itemHeight: string
}

const PLANS: Plan[] = [
  {
    name: 'Standard',
    nameAr: 'standard - باقة البداية',
    tierNumber: '01',
    description: 'A focused launch package for founders who need a high-converting first impression.',
    descriptionAr: 'صفحة هبوط مخصصة للشركات الناشئة وأصحاب الأعمال الراغبين في انطلاقة قوية وتحويل الزوار لعملاء.',
    amount: '10,000',
    amountAr: '10,000',
    amountPrefix: 'LE',
    amountPrefixAr: 'ج.م',
    amountSuffix: '/ project',
    amountSuffixAr: '/ مشروع',
    timeline: 'Delivery: 10-14 Days',
    timelineAr: 'التسليم: 10 - 14 يوم عمل',
    scope: 'Ideal for: High-growth startups, personal brands & product launches',
    scopeAr: 'مثالية لـ: إطلاق المنتجات، الشركات الناشئة، وبناء العلامة الشخصية',
    features: [
      'One high-converting bespoke landing page',
      'Fully responsive & adaptive across all mobile devices',
      'High-performance asset & font optimization',
      'Lead capture form & direct WhatsApp button',
      'One month dedicated customer service & warranty',
    ],
    featuresAr: [
      'صفحة هبوط مخصصة بالكامل (UI/UX فريد بدون قوالب جاهزة)',
      'تجاوب فائق وسلس عبر كافة شاشات الهواتف والأجهزة اللوحية',
      'تهيئة قصوى للأصول والخطوط لأعلى سرعة تحميل (PageSpeed 95+)',
      'نموذج التقاط بيانات العملاء مع ربط فوري بزر واتساب',
      'دعم فني وضمان شامل لمدة شهر كامل بعد الإطلاق',
    ],
    outlined: true,
    descriptionClass: 'font-dm max-w-[19.5625rem]',
    featureClass: (i) =>
      i === 0 ? 'font-dm font-semibold leading-[1.3624]' : 'font-manrope font-semibold leading-[1.3624]',
    listGap: 'gap-[0.875rem]',
    itemHeight: 'lg:h-[1.75rem] gap-[0.75rem]',
    layout: {
      '--pad': '1.125rem',
      '--title-mt': '2rem',
      '--desc-mt': '2rem',
      '--price-mt': '1.8rem',
      '--list-mt': '1.8rem',
      '--list-ml': '0rem',
      '--row-h': '5.2rem',
      '--le-size': '0.8732rem',
      '--le-top': '3.2rem',
      '--num-size': '3.5rem',
      '--num-left': '1.6088rem',
      '--per-size': '0.9605rem',
      '--per-left': '11.8025rem',
      '--per-top': '3rem',
    },
  },
  {
    name: 'Company',
    nameAr: 'Company - باقة الشركات',
    tierNumber: '02',
    description: 'Everything an ambitious company needs to run and grow its online presence.',
    descriptionAr: 'الحل الشامل والمثالي للشركات والمؤسسات الطامحة لترسيخ حضور رقمي استثنائي ومتكامل.',
    amount: '18,000',
    amountAr: '18,000',
    amountPrefix: 'LE',
    amountPrefixAr: 'ج.م',
    amountSuffix: '/ project',
    amountSuffixAr: '/ مشروع',
    popular: true,
    timeline: 'Delivery: 3-4 Weeks',
    timelineAr: 'التسليم: 14 - 21 يوم عمل',
    scope: 'Ideal for: Established businesses, agencies & corporate brands',
    scopeAr: 'مثالية لـ: الشركات القائمة، المكاتب المهنية، والمؤسسات التجارية',
    features: [
      'Multi-page bespoke website (Home, About, Services, Contact)',
      'Custom admin dashboard & operational metrics',
      'Headless CMS integration for dynamic blog & case studies',
      'Advanced technical SEO & Core Web Vitals architecture',
      'Three months dedicated customer service & SLA',
    ],
    featuresAr: [
      'موقع متعدد الصفحات متكامل (الرئيسية، من نحن، الخدمات، تواصل معنا)',
      'لوحة تحكم مخصصة وإحصائيات تشغيلية لإدارة المحتوى',
      'تكامل مدونة ديناميكية (Headless CMS) ودراسات الحالة',
      'تهيئة تقنية متقدمة لمحركات البحث (SEO & Core Web Vitals)',
      'دعم فني مخصص وضمان تشغيل لمدة 3 أشهر',
    ],
    descriptionClass: 'font-manrope font-medium max-w-[21.75rem]',
    featureClass: () => 'font-dm font-medium leading-[0.975]',
    listGap: 'gap-[0.875rem]',
    itemHeight: 'lg:h-[1.25rem] gap-[0.625rem]',
    layout: {
      '--pad': '1.5rem',
      '--title-mt': '2rem',
      '--desc-mt': '2rem',
      '--price-mt': '2.2rem',
      '--list-mt': '1.8rem',
      '--list-ml': '-0.5rem',
      '--row-h': '5rem',
      '--le-size': '0.7904rem',
      '--le-top': '3rem',
      '--num-size': '3.5rem',
      '--num-left': '1.2644rem',
      '--per-size': '0.8695rem',
      '--per-left': '13.9906rem',
      '--per-top': '2.8rem',
    },
  },
  {
    name: 'Store',
    nameAr: 'المتجر الإلكتروني',
    tierNumber: '03',
    description: 'A complete e-commerce platform built for Egyptian & MENA digital commerce.',
    descriptionAr: 'منصة تجارة إلكترونية متكاملة مصممة خصيصاً للشركات والعلامات التجارية لزيادة المبيعات.',
    amount: '28,000',
    amountAr: '28,000',
    amountPrefix: 'LE',
    amountPrefixAr: 'ج.م',
    amountSuffix: '/ project',
    amountSuffixAr: '/ مشروع',
    timeline: 'Delivery: 4-5 Weeks',
    timelineAr: 'التسليم: 3 - 4 أسابيع',
    scope: 'Ideal for: D2C brands, fashion, retail, F&B & merchandise',
    scopeAr: 'مثالية لـ: العلامات التجارية، متاجر التجزئة، وتجار السلع الرقمية والمادية',
    features: [
      'Complete custom e-commerce store with frictionless checkout',
      'Local payment gateways: Paymob, Fawry, InstaPay & Cards',
      'Shipping rate calculator & Bosta / Aramex integration',
      'Inventory, variant manager & coupon discount system',
      'Three months continuous VIP e-commerce support',
    ],
    featuresAr: [
      'متجر إلكتروني متكامل وسريع مع تجربة دفع وشراء بدون تعقيد',
      'ربط بوابات الدفع الإلكتروني (Paymob, Fawry, InstaPay & Cards)',
      'حاسبة شحن مدمجة وتكامل مع شركات الشحن المحلية (Bosta / Aramex)',
      'إدارة المخزون والخيارات ونظام كوبونات الخصم الذكية',
      'دعم فني ومتابعة دقيقة لمدة 3 أشهر كاملة',
    ],
    descriptionClass: 'font-manrope font-medium max-w-[20.5rem]',
    featureClass: () => 'font-dm font-medium leading-[0.975]',
    listGap: 'gap-[0.875rem]',
    itemHeight: 'lg:h-[1.25rem] gap-[0.625rem]',
    layout: {
      '--pad': '1.5rem',
      '--title-mt': '2rem',
      '--desc-mt': '2rem',
      '--price-mt': '2.2rem',
      '--list-mt': '1.8rem',
      '--list-ml': '0rem',
      '--row-h': '5rem',
      '--le-size': '0.8402rem',
      '--le-top': '3rem',
      '--num-size': '3.5rem',
      '--num-left': '1.5475rem',
      '--per-size': '0.9242rem',
      '--per-left': '14rem',
      '--per-top': '2.8rem',
    },
  },
  {
    name: 'Enterprise',
    nameAr: 'أنظمة مكتملة',
    tierNumber: '04',
    description: 'Bespoke software architecture engineered for mission-critical web applications.',
    descriptionAr: 'حلول وتطبيقات ويب سحابية معقدة، بوابات رقمية، وتكاملات مخصصة مبنية على مقاس احتياجاتك.',
    amount: 'Custom Quote',
    amountAr: 'عرض سعر مخصص',
    amountPrefix: '',
    amountPrefixAr: '',
    amountSuffix: 'Bespoke',
    amountSuffixAr: 'حسب المتطلبات',
    isCustomQuote: true,
    timeline: 'Delivery: Tailored Roadmap',
    timelineAr: 'الجدول: حسب حجم المتطلبات',
    scope: 'Ideal for: SaaS platforms, complex marketplaces & scale-ups',
    scopeAr: 'مثالية لـ: المنصات الرقمية الكبرى، تطبيقات SaaS، والأنظمة المخصصة',
    features: [
      'Custom full-stack web application & cloud database',
      'Tailored API endpoints, microservices & webhooks',
      'Multi-role permission controls & enterprise security',
      'Dedicated lead developer & project architect',
      'Six months continuous SLA & priority emergency line',
    ],
    featuresAr: [
      'هندسة معمارية مخصصة بالكامل Full-Stack وبوابات ويب',
      'أنظمة مصادقة وحسابات مستخدمين معقدة مع أذونات وصلاحيات',
      'ربط واجهات برمجة التطبيقات (APIs) وخدمات الطرف الثالث',
      'معايير أمان مصرفية ومراقبة أداء على مدار الساعة 24/7',
      'اتفاقية مستوى خدمة SLA ودعم فني وهندسي استراتيجي لمدة 6 أشهر',
    ],
    descriptionClass: 'font-manrope font-medium max-w-[20rem]',
    featureClass: () => 'font-manrope font-medium leading-[0.975]',
    listGap: 'gap-[0.875rem]',
    itemHeight: 'lg:h-[1.25rem] gap-[0.625rem]',
    layout: {
      '--pad': '1.5rem',
      '--title-mt': '2rem',
      '--desc-mt': '2rem',
      '--price-mt': '2rem',
      '--list-mt': '1.5rem',
      '--list-ml': '0rem',
      '--row-h': '5rem',
      '--le-size': '0.8402rem',
      '--le-top': '3rem',
      '--num-size': '2.2rem',
      '--num-left': '0rem',
      '--per-size': '0.9242rem',
      '--per-left': '13rem',
      '--per-top': '2.8rem',
    },
  },
]

function onTiltMove(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -3.5
  const rotateY = ((x - centerX) / centerX) * 3.5

  card.style.setProperty('--mx', `${x}px`)
  card.style.setProperty('--my', `${y}px`)
  card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`
}

function onTiltLeave(e: PointerEvent<HTMLElement>) {
  const card = e.currentTarget
  card.style.transform = ''
}

type PricingProps = {
  onChoosePlan: (plan: string) => void
}

export function Pricing({ onChoosePlan }: PricingProps) {
  const { lang, t } = useLanguage()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const headerRef = useRef<HTMLParagraphElement>(null)
  const [blurSplit, setBlurSplit] = useState<{ sharpEnd: number; blurStart: number; blurFull: number }>({
    sharpEnd: 55,
    blurStart: 45,
    blurFull: 70,
  })

  useEffect(() => {
    const computeSplit = () => {
      if (!titleRef.current || !headerRef.current) return
      const tRect = titleRef.current.getBoundingClientRect()
      const hRect = headerRef.current.getBoundingClientRect()

      if (tRect.height <= 0) return

      if (window.innerWidth < 1024) {
        setBlurSplit({ sharpEnd: 60, blurStart: 45, blurFull: 75 })
        return
      }

      // Exact intersection on desktop
      const crossStartPct = ((hRect.top - tRect.top) / tRect.height) * 100
      const sharpEnd = Math.max(35, Math.min(65, Math.round(crossStartPct - 8)))
      const blurStart = Math.max(25, Math.min(55, Math.round(sharpEnd - 10)))
      const blurFull = Math.min(90, Math.max(50, Math.round(crossStartPct + 8)))

      setBlurSplit((prev) =>
        prev.sharpEnd === sharpEnd && prev.blurStart === blurStart && prev.blurFull === blurFull
          ? prev
          : { sharpEnd, blurStart, blurFull },
      )
    }

    computeSplit()

    let frame = 0
    const onUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          computeSplit()
        })
      }
    }

    window.addEventListener('resize', onUpdate)
    window.addEventListener('scroll', onUpdate, { passive: true })
    return () => {
      window.removeEventListener('resize', onUpdate)
      window.removeEventListener('scroll', onUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      id="plans"
      aria-labelledby="pricing-title"
      className="relative px-5 pb-24 pt-16 sm:px-8 lg:px-0 lg:pb-[6rem] lg:pt-[7.5rem]"
    >
      {/* Background Title Watermark: Full 195px font glyphs preserved with zero clipping */}
      <div data-parallax="0.08" className="relative z-0 lg:absolute lg:inset-x-0 lg:top-0 pointer-events-none select-none">
        <h2
          ref={titleRef}
          id="pricing-title"
          data-reveal="blur"
          style={{
            '--sharp-end': `${blurSplit.sharpEnd}%`,
            '--blur-start': `${blurSplit.blurStart}%`,
            '--blur-full': `${blurSplit.blurFull}%`,
          } as React.CSSProperties}
          className="-mb-[8vw] text-center font-manrope text-[26vw] font-bold leading-none text-white/70 lg:absolute lg:left-1/2 lg:top-[5.5rem] lg:mb-0 lg:-ml-[20.875rem] lg:w-[41.8125rem] lg:text-left lg:text-[12.1875rem] pointer-events-none select-none"
        >
          <span className="relative block select-none leading-none">
            {/* Sharp top half (above crossing line) */}
            <span
              aria-hidden="true"
              className="block text-white/60 leading-none select-none"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 0%, black var(--blur-start, 45%), transparent var(--sharp-end, 55%))',
                maskImage:
                  'linear-gradient(to bottom, black 0%, black var(--blur-start, 45%), transparent var(--sharp-end, 55%))',
              }}
            >
              Pricing
            </span>
            {/* Blurred portion (from middle crossing line through to the bottom of the letters - zero cut!) */}
            <span
              className="absolute inset-0 block text-white/60 leading-none select-none filter blur-[10px] lg:blur-[14px]"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, transparent var(--blur-start, 45%), black var(--blur-full, 70%), black 100%)',
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, transparent var(--blur-start, 45%), black var(--blur-full, 70%), black 100%)',
              }}
            >
              Pricing
            </span>
          </span>
        </h2>
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto mb-10 max-w-[76rem] lg:mb-12 lg:px-4">
        <span className="font-dm text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-voxa flex items-center gap-2">
          <span className="size-2 rounded-full bg-voxa animate-ping-soft" />
          {t.pricing.badge}
        </span>
        <p
          ref={headerRef}
          className="mt-1 font-manrope text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
        >
          {lang === 'ar'
            ? 'باقات وأسعار واضحة ومدروسة للسوق المصري والخليجي والعالمي.'
            : 'Transparent pricing tailored for the Egyptian & global market.'}
        </p>
      </div>

      {/* STACK CARDS DECK (4 Egyptian market tiers with 3D tilt & smooth stacking) */}
      <div
        className="relative mx-auto flex max-w-[76rem] flex-col space-y-12 sm:space-y-16 lg:space-y-20 lg:px-4"
      >
        {PLANS.map((plan, i) => {
          const topOffsets = [
            'top-[5.5rem] lg:top-[6.5rem]',
            'top-[6.75rem] lg:top-[7.75rem]',
            'top-[8rem] lg:top-[9rem]',
            'top-[9.25rem] lg:top-[10.25rem]',
          ]
          const zIndexes = ['z-10', 'z-20', 'z-30', 'z-40']

          const planName = lang === 'ar' && plan.nameAr ? plan.nameAr : plan.name
          const planDesc = lang === 'ar' && plan.descriptionAr ? plan.descriptionAr : plan.description
          const planTimeline = lang === 'ar' && plan.timelineAr ? plan.timelineAr : plan.timeline
          const planScope = lang === 'ar' && plan.scopeAr ? plan.scopeAr : plan.scope
          const planAmount = lang === 'ar' && plan.amountAr ? plan.amountAr : plan.amount
          const planAmountPrefix = lang === 'ar' ? (plan.amountPrefixAr ?? plan.amountPrefix) : plan.amountPrefix
          const planAmountSuffix = lang === 'ar' ? (plan.amountSuffixAr ?? plan.amountSuffix) : plan.amountSuffix
          const planFeatures = lang === 'ar' && plan.featuresAr ? plan.featuresAr : plan.features

          return (
            <div
              key={plan.name}
              data-reveal="lift"
              style={delay(i * 120)}
              className={`sticky ${topOffsets[i]} ${zIndexes[i]} transition-all duration-500`}
            >
              <article
                onPointerMove={onTiltMove}
                onPointerLeave={onTiltLeave}
                style={vars(plan.layout)}
                className={`group relative flex min-h-[420px] sm:min-h-[460px] lg:h-[490px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0e0e]/95 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-expo)] hover:border-voxa/50 ${
                  plan.popular
                    ? 'ring-1 ring-voxa/60 shadow-[0_30px_70px_-15px_rgba(99,161,242,0.35)]'
                    : ''
                }`}
              >
                <div className="glass [--glass-alpha:0.45]" />

                {/* Specular spotlight glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(40rem_circle_at_var(--mx,50%)_var(--my,0%),rgb(99_161_242/0.2),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Top Bar of the Card */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-dm text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] text-voxa uppercase">
                      {lang === 'ar' ? `الباقة ${plan.tierNumber}` : `TIER ${plan.tierNumber}`}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-0.5 font-dm text-[0.7rem] sm:text-xs font-semibold text-white/70">
                      {planTimeline}
                    </span>
                  </div>

                  {plan.popular && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-voxa/60 bg-ash/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-voxa shadow-[0_0_18px_rgba(99,161,242,0.4)] backdrop-blur-md animate-[pulse_3s_ease-in-out_infinite]">
                      <span className="size-1.5 rounded-full bg-flame animate-pulse shadow-[0_0_8px_#ff5a3c]" />
                      <span>{t.pricing.popularBadge}</span>
                    </div>
                  )}
                </div>

                {/* Main Grid: Left Details & Right Deliverables */}
                <div className="relative z-10 my-auto grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_1.2fr] lg:gap-12 items-center">
                  {/* Left Column: Plan Title, Description, Price, CTA */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white">
                        {planName}
                      </h3>

                      <p className="mt-3 font-manrope text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-white/80 max-w-[32rem]">
                        {planDesc}
                      </p>

                      <p className="mt-2 font-dm text-xs sm:text-sm text-voxa font-semibold tracking-wide">
                        {planScope}
                      </p>
                    </div>

                    {/* Price Display with Shimmer Text */}
                    <div className="mt-5 sm:mt-7 flex items-baseline gap-2.5 rtl:flex-row-reverse rtl:justify-end">
                      {planAmountPrefix && (
                        <span className="font-dm text-sm sm:text-base font-bold text-white/50">
                          {planAmountPrefix}
                        </span>
                      )}
                      <span className={`font-manrope font-black tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.12)] ${
                        plan.isCustomQuote
                          ? 'text-3xl sm:text-4xl lg:text-5xl text-shimmer'
                          : 'text-4xl sm:text-6xl lg:text-7xl text-white group-hover:text-shimmer transition-colors'
                      }`}>
                        {planAmount}
                      </span>
                      {planAmountSuffix && (
                        <span className="font-dm text-xs sm:text-sm font-medium text-voxa">
                          {planAmountSuffix}
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6 sm:mt-7">
                      <a
                        href="#contact"
                        onClick={() => onChoosePlan(plan.name)}
                        className="btn-shine group/btn inline-flex h-12 w-full sm:w-auto sm:px-8 items-center justify-center gap-3 rounded-full bg-voxa font-manrope text-base sm:text-lg font-bold text-ash transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgb(99_161_242/0.95)] hover:-translate-y-0.5 active:scale-95"
                      >
                        {plan.isCustomQuote
                          ? (lang === 'ar' ? 'طلب عرض سعر مخصص' : 'Request Custom Quote')
                          : (lang === 'ar' ? `اختر ${planName}` : `Choose ${plan.name}`)}
                        <span className="flex size-3.5 items-center justify-center transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5">
                          <img
                            src={assets.arrowUpRightLarge}
                            alt=""
                            className="size-3.5 max-w-none -rotate-90 rtl:scale-x-[-1]"
                          />
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Full Scope & Included Deliverables */}
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6 lg:p-7 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-voxa/30">
                    <div className="flex items-center justify-between mb-4">
                      <span className="block font-dm text-[0.7rem] sm:text-xs font-bold tracking-[0.16em] uppercase text-white/50">
                        {lang === 'ar' ? 'المخرجات والمميزات المشمولة' : 'DELIVERABLES & FEATURES'}
                      </span>
                      <Logo tone="paper" variant="wordmark" size="sm" />
                    </div>

                    <ul className="flex flex-col gap-3">
                      {planFeatures.map((feature, f) => (
                        <li key={feature} className="group/item flex items-center gap-3 transition-transform duration-300 hover:translate-x-1 rtl:hover:-translate-x-1">
                          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-voxa/20 text-voxa shadow-[0_0_8px_rgba(99,161,242,0.3)] transition-colors duration-300 group-hover/item:bg-voxa group-hover/item:text-ash">
                            <img src={assets.check} alt="" className="size-3" />
                          </div>
                          <span className={`text-xs sm:text-sm lg:text-base text-white/90 ${plan.featureClass(f)}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-[0.7rem] sm:text-xs font-dm text-white/40">
                      <span>{lang === 'ar' ? 'ملكية كود كاملة وحقوق مسجلة' : 'Full IP transfer & code ownership'}</span>
                      <span className="text-voxa">{lang === 'ar' ? 'ضمان أداء معتمد' : 'Guaranteed SLA'}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Details */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[0.75rem] font-dm text-white/40">
                  <span>VOXA STUDIO // PACKAGE {plan.tierNumber}</span>
                  <span className="text-voxa">Scroll to stack next plan ↓</span>
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
