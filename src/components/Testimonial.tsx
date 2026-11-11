import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export type TestimonialItem = {
  id: string
  name: string
  nameAr?: string
  role: string
  roleAr?: string
  company: string
  companyAr?: string
  location: string
  locationAr?: string
  category: 'startup' | 'ecommerce' | 'corporate'
  quote: string
  quoteAr?: string
  metric: string
  metricAr?: string
  rating: number
  initials: string
  initialsAr?: string
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Ahmed Mansour',
    nameAr: 'أحمد منصور',
    role: 'Founder',
    roleAr: 'المؤسس',
    company: 'Northline Studio',
    companyAr: 'استوديو Northline',
    location: 'Cairo, EG',
    locationAr: 'القاهرة، مصر',
    category: 'startup',
    quote: 'Voxa didn’t just deliver a website. They sharpened our story and built a platform we’re genuinely proud to share with global investors.',
    quoteAr: 'لم يقتصر عمل Voxa على تطوير موقع ويب فقط، بل صاغوا قصة علامتنا التجارية وبنوا منصة نفخر بعرضها أمام المستثمرين العالميين.',
    metric: 'Seed Round Closed',
    metricAr: 'إغلاق جولة Seed',
    rating: 5,
    initials: 'AM',
    initialsAr: 'أم',
  },
  {
    id: '2',
    name: 'Youssef El-Gammal',
    nameAr: 'يوسف الجمال',
    role: 'Managing Director',
    roleAr: 'المدير التنفيذي',
    company: 'Apex Logistics',
    companyAr: 'أبيكس للخدمات اللوجستية',
    location: 'New Cairo, EG',
    locationAr: 'القاهرة الجديدة، مصر',
    category: 'corporate',
    quote: 'Delivered our multi-branch logistics portal in 14 days flat. The Paymob payment and live tracking integration was completely seamless.',
    quoteAr: 'تم تسليم بوابة الشحن المتكاملة لجميع فروعنا خلال 14 يوماً فقط. كان ربط الدفع الإلكتروني عبر Paymob والتتبع اللحظي فائق السلاسة.',
    metric: '14 Days Delivery',
    metricAr: 'تسليم في 14 يوماً',
    rating: 5,
    initials: 'YG',
    initialsAr: 'يج',
  },
  {
    id: '3',
    name: 'Laila Farouk',
    nameAr: 'ليلى فاروق',
    role: 'Co-Founder',
    roleAr: 'شريك مؤسس',
    company: 'Aura Fine Jewelry',
    companyAr: 'مجوهرات Aura',
    location: 'Zamalek, Cairo',
    locationAr: 'الزمالك، القاهرة',
    category: 'ecommerce',
    quote: 'Our mobile conversion rate jumped by 210% in the first month. The fluid micro-animations feel on par with top European luxury brands.',
    quoteAr: 'ارتفع معدل التحويل عبر الهواتف الذكية بنسبة 210% في أول شهر. الحركات الدقيقة وتجربة التصفح تضاهي أرقى العلامات الأوروبية الفاخرة.',
    metric: '+210% Mobile Sales',
    metricAr: '+210% مبيعات الجوال',
    rating: 5,
    initials: 'LF',
    initialsAr: 'لف',
  },
  {
    id: '4',
    name: 'Karim Abdelrahman',
    nameAr: 'كريم عبدالرحمن',
    role: 'CTO',
    roleAr: 'الرئيس التقني (CTO)',
    company: 'FinEdge Payments',
    companyAr: 'FinEdge للحلول المالية',
    location: 'Sheikh Zayed, EG',
    locationAr: 'الشيخ زايد، مصر',
    category: 'startup',
    quote: 'The cleanest code architecture we’ve seen from a regional studio. 100/100 Core Web Vitals, sub-second load times, and zero regressions.',
    quoteAr: 'أنظف معمارية كود برمجية رأيناها من استوديو في المنطقة. 100/100 في مؤشرات الأداء، سرعة تحميل لحظية، وصفر أخطاء.',
    metric: '99/100 Performance',
    metricAr: '99/100 أداء قياسي',
    rating: 5,
    initials: 'KA',
    initialsAr: 'كع',
  },
  {
    id: '5',
    name: 'Nourhan El-Shazly',
    nameAr: 'نورهان الشاذلي',
    role: 'Brand Director',
    roleAr: 'مديرة الهوية التجارية',
    company: 'Kayan Architecture',
    companyAr: 'كيان للاستشارات المعمارية',
    location: 'Alexandria, EG',
    locationAr: 'الإسكندرية، مصر',
    category: 'corporate',
    quote: 'They translated our physical spatial architecture into an online masterpiece. Prospective clients consistently mention how refined the site feels.',
    quoteAr: 'ترجموا فلسفتنا المعمارية والهندسية إلى تحفة رقمية على الإنترنت. العملاء المحتملون يبدون إعجابهم دائماً بدقة وفخامة تفاصيل الموقع.',
    metric: '3x Client Inquiries',
    metricAr: '3 أضعاف طلبات المشاريع',
    rating: 5,
    initials: 'NS',
    initialsAr: 'نش',
  },
  {
    id: '6',
    name: 'Omar Tarek',
    nameAr: 'عمر طارق',
    role: 'CEO',
    roleAr: 'الرئيس التنفيذي',
    company: 'Orbit SaaS',
    companyAr: 'منصة Orbit السحابية',
    location: 'Maadi, Cairo',
    locationAr: 'المعادي، القاهرة',
    category: 'startup',
    quote: 'Traditional agencies quoted us 2–3 months. Voxa designed, engineered, and launched our complete product marketing platform in under 2 weeks.',
    quoteAr: 'الشركات التقليدية طلبت مهلة 2-3 أشهر للتسليم. استوديو Voxa صمم وبرمج وأطلق منصتنا التسويقية كاملة في أقل من أسبوعين.',
    metric: 'Launched in 12 Days',
    metricAr: 'إطلاق في 12 يوماً',
    rating: 5,
    initials: 'OT',
    initialsAr: 'عط',
  },
  {
    id: '7',
    name: 'Mariam Selim',
    nameAr: 'مريم سليم',
    role: 'Head of Marketing',
    roleAr: 'رئيسة التسويق',
    company: 'Solis Energy',
    companyAr: 'سوليس لحلول الطاقة',
    location: 'Cairo, EG',
    locationAr: 'القاهرة، مصر',
    category: 'corporate',
    quote: '100% transparent pricing with zero surprises. The 18,000 LE package delivered ten times the ROI of the overpriced corporate agencies.',
    quoteAr: 'أسعار شفافة بنسبة 100% وبدون أي مفاجآت أو تكاليف خفية. باقة الشركات حققت لنا عائداً على الاستثمار يفوق وكالات الدعاية الكبرى.',
    metric: '10x Value ROI',
    metricAr: '10 أضعاف عائد الاستثمار',
    rating: 5,
    initials: 'MS',
    initialsAr: 'مس',
  },
  {
    id: '8',
    name: 'Ziad Mostafa',
    nameAr: 'زياد مصطفى',
    role: 'Founder',
    roleAr: 'المؤسس',
    company: 'Craftwork Furnishings',
    companyAr: 'كرافت وورك للأثاث',
    location: 'Fifth Settlement, EG',
    locationAr: 'التجمع الخامس، مصر',
    category: 'ecommerce',
    quote: 'The interactive 3D product showcase and smooth spatial transitions set us miles ahead of every furniture retailer in Egypt.',
    quoteAr: 'عرض المنتجات التفاعلي ثلاثي الأبعاد والانتقالات المكانية جعلتنا نتفوق بأشواط على جميع متاجر الأثاث والديكور في مصر.',
    metric: '+185% Dwell Time',
    metricAr: '+185% وقت التصفح',
    rating: 5,
    initials: 'ZM',
    initialsAr: 'زم',
  },
  {
    id: '9',
    name: 'Tamer Hegazy',
    nameAr: 'تامر حجازي',
    role: 'Senior Partner',
    roleAr: 'شريك رئيسي',
    company: 'Horizon Capital',
    companyAr: 'هورايزون كابيتال',
    location: 'Cairo, EG',
    locationAr: 'القاهرة، مصر',
    category: 'corporate',
    quote: 'Executive-grade polish. Voxa gives regional founders the international design caliber required to command institutional trust.',
    quoteAr: 'دقة وفخامة استثنائية. استوديو Voxa يمنح الشركات الصاعدة في المنطقة المستوى التصميمي العالمي اللازم لكسب ثقة المؤسسات الاستثمارية.',
    metric: '$1.4M Deal Sourced',
    metricAr: 'صفقات استثمارية كبرى',
    rating: 5,
    initials: 'TH',
    initialsAr: 'تح',
  },
  {
    id: '10',
    name: 'Salma Radwan',
    nameAr: 'سلمى رضوان',
    role: 'Creative Director',
    roleAr: 'المديرة الإبداعية',
    company: 'Studio Mim',
    companyAr: 'استوديو ميم للتصميم',
    location: 'Giza, EG',
    locationAr: 'الجيزة، مصر',
    category: 'startup',
    quote: 'Rarely do developers understand typographic nuances and padding rhythms like Voxa. The final build was 100% faithful to our Figma file.',
    quoteAr: 'نادراً ما تجد مطورين يفهمون الفروق الدقيقة في الخطوط وتباعد المساحات مثل Voxa. الموقع المبرمج جاء مطابقاً لملف فيجما بنسبة 100%.',
    metric: '100% Figma Parity',
    metricAr: '100% مطابقة لفيجما',
    rating: 5,
    initials: 'SR',
    initialsAr: 'سر',
  },
  {
    id: '11',
    name: 'Hassan El-Wakil',
    nameAr: 'حسن الوكيل',
    role: 'Operations Lead',
    roleAr: 'مدير العمليات',
    company: 'NileCart Logistics',
    companyAr: 'نايل كارت للتجارة',
    location: 'Cairo, EG',
    locationAr: 'القاهرة، مصر',
    category: 'ecommerce',
    quote: 'High-volume checkout handled thousands of orders during Black Friday without breaking a sweat. Our cart abandonment dropped 38%.',
    quoteAr: 'صفحة الدفع السريعة تعاملت مع آلاف الطلبات في البلاك فرايداي بكفاءة تامة. انخفض معدل ترك سلة الشراء بنسبة 38%.',
    metric: '-38% Abandonment',
    metricAr: '-38% ترك السلة',
    rating: 5,
    initials: 'HW',
    initialsAr: 'حو',
  },
  {
    id: '12',
    name: 'Dina Fikry',
    nameAr: 'دينا فكري',
    role: 'Founder',
    roleAr: 'المؤسسة',
    company: 'Bloom Organic Labs',
    companyAr: 'بلوم أورجانيك',
    location: 'New Cairo, EG',
    locationAr: 'القاهرة الجديدة، مصر',
    category: 'ecommerce',
    quote: 'Working with Voxa felt like having a boutique Silicon Valley design team right here in Cairo. Thoughtful, communicative, and ridiculously fast.',
    quoteAr: 'العمل مع فريق Voxa كان أشبه بالتعاون مع فريق تصميم نخبوي في وادي السيليكون هنا في القاهرة. احترافية عالية وسرعة مذهلة.',
    metric: 'Top-Rated Store',
    metricAr: 'متجر بأعلى تقييم',
    rating: 5,
    initials: 'DF',
    initialsAr: 'دف',
  },
  {
    id: '13',
    name: 'Mahmoud Sherif',
    nameAr: 'محمود شريف',
    role: 'Co-Founder',
    roleAr: 'شريك مؤسس',
    company: 'ByteForge AI',
    companyAr: 'بايت فورج للذكاء الاصطناعي',
    location: 'Alexandria, EG',
    locationAr: 'الإسكندرية، مصر',
    category: 'startup',
    quote: 'Speed and technical excellence. The automated SMTP contact delivery and responsive design were tested and flawless from day one.',
    quoteAr: 'سرعة وإتقان تقني مبهر. ربط نماذج التواصل التلقائي عبر SMTP والتجاوب مع الهواتف تم اختباره وعمل بدون أي أخطاء من اليوم الأول.',
    metric: 'Sub-second Load',
    metricAr: 'سرعة استجابة فائقة',
    rating: 5,
    initials: 'MS',
    initialsAr: 'مش',
  },
  {
    id: '14',
    name: 'Rania Barakat',
    nameAr: 'رانيا بركات',
    role: 'Principal Attorney',
    roleAr: 'المحامية الرئيسية',
    company: 'Barakat Law Firm',
    companyAr: 'مكتب بركات للمحاماة',
    location: 'Dokki, Giza',
    locationAr: 'الدقي، الجيزة',
    category: 'corporate',
    quote: 'Sophisticated, authoritative, and perfectly responsive across phones and tablets. Inbound high-value retainer inquiries more than doubled.',
    quoteAr: 'موقع يعكس الوقار والمصداقية، وسلس تماماً على الهواتف والأجهزة اللوحية. تضاعفت طلبات الاستشارات والتوكيلات القانونية رفيعة المستوى.',
    metric: '2.4x Retainers',
    metricAr: '2.4x طلبات استشارات',
    rating: 5,
    initials: 'RB',
    initialsAr: 'رب',
  },
  {
    id: '15',
    name: 'Mostafa Kamel',
    nameAr: 'مصطفى كامل',
    role: 'VP Product',
    roleAr: 'نائب رئيس المنتجات',
    company: 'Nexus Cloud Infrastructure',
    companyAr: 'نيكسوس للبنية السحابية',
    location: 'Sheikh Zayed, EG',
    locationAr: 'الشيخ زايد، مصر',
    category: 'startup',
    quote: 'The best engineering investment our company made this year. High performance, elegant glassmorphism, and instant WhatsApp pipeline.',
    quoteAr: 'أفضل استثمار برمجي قامت به شركتنا هذا العام. أداء فائق وتصميم زجاجي حديث مع قناة مباشرة وفورية للتواصل عبر واتساب.',
    metric: 'Zero Downtime',
    metricAr: 'تشغيل مستمر 100%',
    rating: 5,
    initials: 'MK',
    initialsAr: 'مك',
  },
  {
    id: '16',
    name: 'Farida El-Sayed',
    nameAr: 'فريدة السيد',
    role: 'Founder',
    roleAr: 'المؤسسة',
    company: 'Raw Materials Studio',
    companyAr: 'استوديو المواد الخام',
    location: 'Cairo, EG',
    locationAr: 'القاهرة، مصر',
    category: 'corporate',
    quote: 'From brand vision to final web deployment, Voxa exceeded every single milestone. They treat your product as if it were their own.',
    quoteAr: 'من الرؤية الأولية للهوية وحتى الإطلاق النهائي للموقع، تجاوز استوديو Voxa كل التوقعات. يتعاملون مع مشروعك وكأنه ملك لهم.',
    metric: 'Premier Launch',
    metricAr: 'إطلاق استثنائي',
    rating: 5,
    initials: 'FE',
    initialsAr: 'فس',
  },
]

function repeatToFill<T>(items: T[], minLength: number = 8): T[] {
  if (items.length === 0) return []
  let result = [...items]
  while (result.length < minLength) {
    result = [...result, ...items]
  }
  // Double the array for a seamless 0% -> -50% CSS marquee translation
  return [...result, ...result]
}

export function Testimonial() {
  const { lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<'all' | 'startup' | 'ecommerce' | 'corporate'>('all')

  const filtered =
    activeCategory === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === activeCategory)

  // Split into two rows for staggered infinite floating animation marquee
  const row1 = filtered.slice(0, Math.ceil(filtered.length / 2))
  const row2 = filtered.slice(Math.ceil(filtered.length / 2))

  const track1Items = repeatToFill(row1.length > 0 ? row1 : filtered)
  const track2Items = repeatToFill(row2.length > 0 ? row2 : filtered)

  const categories = [
    { id: 'all', label: lang === 'ar' ? `الكل (${TESTIMONIALS.length})` : `All (${TESTIMONIALS.length})` },
    { id: 'startup', label: lang === 'ar' ? 'الشركات الناشئة' : 'Tech & Startups' },
    { id: 'ecommerce', label: lang === 'ar' ? 'المتاجر الإلكترونية' : 'E-Commerce' },
    { id: 'corporate', label: lang === 'ar' ? 'الشركات والخدمات' : 'Corporate & Services' },
  ]

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative overflow-hidden bg-black py-24 sm:py-32 select-none"
    >
      {/* Ambient background depth lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[70rem] -z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgb(99_161_242/0.08),transparent_75%)]"
      />

      <div className="relative mx-auto max-w-[82rem] px-5 sm:px-8 mb-10 sm:mb-14 text-center">
        {/* Rating Pill Badge */}
        <div data-reveal="pop" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md mb-6">
          <div className="flex text-[#ffb800] text-sm tracking-widest">
            {'★'.repeat(5)}
          </div>
          <span className="font-dm text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-voxa">
            {lang === 'ar'
              ? 'تقييم 5.0 من أكثر من 20 مؤسس شركة'
              : '5.0 RATED BY 20+ FOUNDERS'}
          </span>
        </div>

        {/* Section Heading */}
        <h2
          data-reveal="blur"
          className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-tight max-w-4xl mx-auto"
        >
          {lang === 'ar' ? (
            <>
              مصمم لمؤسسي الشركات الذين <span className="text-voxa">لا يقبلون بأنصاف الحلول.</span>
            </>
          ) : (
            <>
              Built for founders who <span className="text-voxa">refuse to compromise.</span>
            </>
          )}
        </h2>
        <p
          data-reveal="up"
          className="mt-4 max-w-3xl mx-auto font-manrope text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed text-voxa"
        >
          {lang === 'ar'
            ? 'تجارب رقمية متطورة تُعزز الثقة وتزيد المبيعات والأرباح.'
            : 'Next-generation digital experiences that build trust and drive conversions.'}
        </p>
        <p
          data-reveal="up"
          className="mt-3 max-w-2xl mx-auto font-dm text-base sm:text-lg leading-relaxed text-[#aaa7a0]"
        >
          {lang === 'ar'
            ? 'من القاهرة والإسكندرية إلى دبي والرياض ولندن، نشارك الفرق الطموحة لبناء تجارب رقمية تزيد من مبيعاتها وأرباحها.'
            : 'From Cairo and Alexandria to Dubai and London, we partner with ambitious teams to engineer digital experiences that convert.'}
        </p>

        {/* Controls Bar: Category Filter Pills + Live Stream Indicator */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
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

          {/* Live Floating Animation Stream Status */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-dm text-xs font-semibold text-emerald-300 tracking-wide uppercase">
              {lang === 'ar' ? 'عرض حي لآراء العملاء • قف بالماوس للإيقاف' : 'Automated Founder Stream • Hover to Pause'}
            </span>
          </div>
        </div>
      </div>

      {/* Pure Automated Infinite Floating Animation - Wrapped in dir="ltr" to maintain consistent coordinate space across RTL & LTR */}
      <div
        dir="ltr"
        className="group relative flex flex-col gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {/* Track 1: Smooth Leftward Floating Animation */}
        <div className="flex w-max gap-6 animate-marquee-left will-change-transform transform-gpu group-hover:[animation-play-state:paused] px-4 pointer-events-auto">
          {track1Items.map((item, index) => (
            <TestimonialCard key={`t1-${item.id}-${index}`} item={item} />
          ))}
        </div>

        {/* Track 2: Smooth Rightward Floating Animation */}
        <div className="flex w-max gap-6 animate-marquee-right will-change-transform transform-gpu group-hover:[animation-play-state:paused] px-4 pointer-events-auto">
          {track2Items.map((item, index) => (
            <TestimonialCard key={`t2-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const name = isAr && item.nameAr ? item.nameAr : item.name
  const role = isAr && item.roleAr ? item.roleAr : item.role
  const company = isAr && item.companyAr ? item.companyAr : item.company
  const location = isAr && item.locationAr ? item.locationAr : item.location
  const quote = isAr && item.quoteAr ? item.quoteAr : item.quote
  const metric = isAr && item.metricAr ? item.metricAr : item.metric
  const initials = isAr && item.initialsAr ? item.initialsAr : item.initials

  return (
    <article
      dir={isAr ? 'rtl' : 'ltr'}
      className="group/card relative flex w-[22rem] sm:w-[26rem] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-voxa/50 hover:bg-[#141414] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(99,161,242,0.18)] select-none text-left rtl:text-right will-change-transform transform-gpu"
    >
      {/* Decorative ambient watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-3 rtl:right-auto rtl:-left-3 -bottom-5 font-serif text-8xl font-black text-white/[0.03] select-none transition-transform duration-500 group-hover/card:scale-110 group-hover/card:text-voxa/[0.06]"
      >
        “
      </div>

      {/* Header: Stars & Metric Badge */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex text-[#ffb800] text-sm tracking-wider drop-shadow-[0_0_8px_rgba(255,184,0,0.4)]">
            {'★'.repeat(item.rating)}
          </div>
          <span className="rounded-full border border-voxa/30 bg-voxa/10 px-2.5 py-0.5 font-dm text-[0.68rem] font-bold text-voxa tracking-wider uppercase shadow-[0_0_10px_rgba(99,161,242,0.2)]">
            {metric}
          </span>
        </div>

        {/* Body Quote */}
        <blockquote className="font-manrope text-sm sm:text-base leading-relaxed text-white/90 font-medium">
          “{quote}”
        </blockquote>
      </div>

      {/* Footer: Avatar, Name, Role, Location */}
      <footer className="relative z-10 mt-6 flex items-center gap-3.5 border-t border-white/10 pt-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-voxa to-flame font-manrope text-xs font-black text-ink shadow-[0_0_12px_rgba(99,161,242,0.5)]">
          {initials}
        </div>
        <div className="min-w-0 flex-1 text-left rtl:text-right">
          <div className="flex items-center gap-1.5">
            <span className="font-manrope text-sm font-bold text-white truncate">{name}</span>
            <span className="size-1 rounded-full bg-voxa shadow-[0_0_6px_#63a1f2]" />
            <span className="font-dm text-xs text-white/50 truncate">{location}</span>
          </div>
          <p className="font-dm text-xs text-white/60 truncate">
            {role}, <span className="text-white/80 font-medium">{company}</span>
          </p>
        </div>
      </footer>
    </article>
  )
}
