export type Language = 'en' | 'ar'

export interface TranslationDictionary {
  meta: {
    title: string
    description: string
    keywords: string
  }
  header: {
    home: string
    plans: string
    blog: string
    contact: string
    about: string
    startNow: string
    langButton: string
    langButtonAria: string
  }
  hero: {
    statusBadge: string
    titleLine1: string
    titleLine2: string
    titleLine2Accent: string
    description: string
    explorePlans: string
    seeHowWeWork: string
  }
  services: {
    badge: string
    title: string
    subtitle: string
    items: Array<{
      id: string
      num: string
      title: string
      desc: string
      features: string[]
    }>
  }
  whyVoxa: {
    badge: string
    title: string
    subtitle: string
    pillars: Array<{
      title: string
      desc: string
      stat: string
      statLabel: string
    }>
  }
  pricing: {
    badge: string
    title: string
    subtitle: string
    popularBadge: string
    currency: string
    startingAt: string
    choosePlan: string
    quoteCta: string
    plans: Array<{
      id: string
      name: string
      tagline: string
      price: string
      features: string[]
      highlight?: boolean
    }>
  }
  faq: {
    badge: string
    title: string
  }
  testimonials: {
    badge: string
    title: string
    subtitle: string
  }
  contact: {
    badge: string
    title: string
    subtitle: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    serviceLabel: string
    servicePlaceholder: string
    detailsLabel: string
    detailsPlaceholder: string
    submitBtn: string
    submittingBtn: string
    successTitle: string
    successDesc: string
    sendAnother: string
    officeTitle: string
    officeLocation: string
    whatsappDirect: string
    guarantee: string
  }
  cta: {
    subtitle: string
    title: string
    titleAccent: string
    copyEmail: string
    copied: string
    orEmailUs: string
  }
  footer: {
    tagline: string
    availableBadge: string
    quickLinksTitle: string
    contactTitle: string
    cairoOffice: string
    cairoEgypt: string
    emailUs: string
    callUs: string
    whatsapp: string
    copyright: string
    customCodeBadge: string
  }
  whatsapp: {
    tooltip: string
    ariaLabel: string
  }
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    meta: {
      title: 'Web Design & Development Agency in Egypt | Voxa Studio',
      description:
        'Voxa Studio turns bold ideas into high-performing websites, web apps, and e-commerce stores with transparent pricing and custom code in Egypt & MENA.',
      keywords:
        'web design agency egypt, web development company, custom web apps, e-commerce store development, UI UX design studio, Voxa Studio',
    },
    header: {
      home: 'Home',
      plans: 'Plans',
      blog: 'Blog',
      contact: 'Contact us',
      about: 'About us',
      startNow: 'Start Now',
      langButton: 'العربية',
      langButtonAria: 'Switch to Arabic language',
    },
    hero: {
      statusBadge: 'Available for new projects',
      titleLine1: 'From design',
      titleLine2: 'to ',
      titleLine2Accent: 'digital.',
      description:
        'Voxa turns bold ideas into beautiful, high-performing websites that feel as good as they function.',
      explorePlans: 'Explore our plans',
      seeHowWeWork: 'See how we work',
    },
    services: {
      badge: 'Core Expertise',
      title: 'Engineered for impact',
      subtitle:
        'We blend bespoke design systems with production-grade engineering to build websites that elevate brands and drive revenue.',
      items: [
        {
          id: 'ui-ux',
          num: '01',
          title: 'UI/UX Design Systems',
          desc: 'High-converting interfaces crafted with spatial depth, micro-interactions, and pixel-level brand identity.',
          features: ['Figma design systems', 'Interactive wireframing', 'User testing & research', 'Mobile-first workflows'],
        },
        {
          id: 'custom-web',
          num: '02',
          title: 'Custom Web Development',
          desc: 'Lightning-fast digital platforms built on clean React, Next.js, and TypeScript code without bloated templates.',
          features: ['95+ Google PageSpeed', 'Accessible & responsive', 'Dynamic CMS integration', 'Robust security'],
        },
        {
          id: 'ecommerce',
          num: '03',
          title: 'High-Converting E-Commerce',
          desc: 'Scalable storefronts optimized for effortless checkout, high conversion rates, and global payment gateways.',
          features: ['Payment gateway setup', 'Frictionless checkout', 'Catalog management', 'Fast mobile experience'],
        },
        {
          id: 'seo-growth',
          num: '04',
          title: 'SEO & Speed Optimization',
          desc: 'Dominate organic search with clean semantic markup, fast load times, and structured JSON-LD schemas.',
          features: ['Technical SEO audit', 'Core Web Vitals tuning', 'Schema.org markup', 'Targeted search ranking'],
        },
      ],
    },
    whyVoxa: {
      badge: 'The Voxa Advantage',
      title: 'Why brands choose us',
      subtitle:
        'We replace slow agency bureaucracy with transparent pricing, direct communication, and uncompromised custom code.',
      pillars: [
        {
          title: 'Transparent Pricing',
          desc: 'Clear, fixed-price tiers with zero hidden agency fees. You know exactly what you get and when.',
          stat: '100%',
          statLabel: 'Transparent',
        },
        {
          title: 'Custom Code Engineering',
          desc: 'No sluggish builders or bloated plugins. Pure modern code engineered for speed, safety, and longevity.',
          stat: '95+',
          statLabel: 'PageSpeed Score',
        },
        {
          title: 'Rapid Delivery',
          desc: 'Production-ready launches in 10 to 21 days with dedicated 1:1 direct technical support and warranty.',
          stat: '10-21',
          statLabel: 'Days to Launch',
        },
      ],
    },
    pricing: {
      badge: 'Transparent Pricing',
      title: 'Simple plans for ambitious brands',
      subtitle: 'Transparent investment, rapid timelines, and guaranteed custom code quality.',
      popularBadge: 'Most Popular',
      currency: 'EGP',
      startingAt: 'Starting at',
      choosePlan: 'Choose Plan',
      quoteCta: 'Request Custom Quote',
      plans: [
        {
          id: 'standard',
          name: 'Standard',
          tagline: 'Ideal for startups, campaigns, and high-impact landing pages.',
          price: '10,000',
          features: [
            'Bespoke custom landing page',
            'Full mobile & tablet responsiveness',
            'Lightning-fast performance (95+ PageSpeed)',
            'Direct WhatsApp & contact integration',
            'Essential SEO & Meta setup',
            '10-14 business days delivery',
            '30-day post-launch warranty',
          ],
        },
        {
          id: 'company',
          name: 'Company',
          tagline: 'Complete multi-page presence for established businesses.',
          price: '18,000',
          highlight: true,
          features: [
            'Full multi-page company website (up to 6 pages)',
            'Interactive animations & micro-interactions',
            'Bespoke UI/UX design in Figma',
            'Comprehensive technical SEO & Schema markup',
            'Interactive blog system & CMS ready',
            '14-21 business days delivery',
            '60-day post-launch warranty & 1:1 support',
          ],
        },
        {
          id: 'store',
          name: 'Store',
          tagline: 'A complete e-commerce platform built for Egyptian & MENA digital commerce.',
          price: '28,000',
          features: [
            'Complete custom e-commerce store with frictionless checkout',
            'Local payment gateways: Paymob, Fawry, InstaPay & Cards',
            'Shipping rate calculator & Bosta / Aramex integration',
            'Inventory, variant manager & coupon discount system',
            'Three months continuous VIP e-commerce support',
          ],
        },
        {
          id: 'enterprise',
          name: 'Enterprise / Custom',
          tagline: 'Tailored web applications, digital portals, and complex systems.',
          price: 'Custom Quote',
          features: [
            'Full custom web app or e-commerce store',
            'Payment gateway integration & user portals',
            'Custom database & API architecture',
            'Advanced analytics & conversion tracking',
            'Tailored timeline & milestone delivery',
            'Dedicated technical lead & SLA support',
          ],
        },
      ],
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Common Questions',
    },
    testimonials: {
      badge: 'Client Stories',
      title: 'Trusted by founders and growing brands',
      subtitle: 'Real feedback from teams who partnered with Voxa Studio to elevate their digital footprint.',
    },
    contact: {
      badge: 'Start a Project',
      title: "Let's build something exceptional",
      subtitle:
        'Have a project in mind or need expert guidance? Reach out today and receive a detailed proposal within 24 hours.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Ahmed El-Sayed',
      emailLabel: 'Work Email',
      emailPlaceholder: 'ahmed@company.com',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+20 1XX XXX XXXX',
      serviceLabel: 'Service Needed',
      servicePlaceholder: 'e.g., Company Website, Landing Page, E-Commerce',
      detailsLabel: 'Project Details & Goals',
      detailsPlaceholder: 'Tell us about your brand, requirements, timeline, and vision...',
      submitBtn: 'Send Project Request',
      submittingBtn: 'Sending...',
      successTitle: 'Thank you! We received your message.',
      successDesc: 'Our technical director will review your project details and reach out within 24 hours.',
      sendAnother: 'Send another message',
      officeTitle: 'Office & Studio',
      officeLocation: 'Cairo, Egypt (Serving clients globally)',
      whatsappDirect: 'Direct WhatsApp Support',
      guarantee: '100% Confidential. We sign NDAs on request.',
    },
    cta: {
      subtitle: 'HAVE A PROJECT IN MIND?',
      title: "Let's make something ",
      titleAccent: 'unforgettable.',
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      orEmailUs: 'or reach us directly at',
    },
    footer: {
      tagline: 'Designing better digital experiences from Cairo to the world.',
      availableBadge: 'Available for Q1 / Q2 Projects',
      quickLinksTitle: 'Quick Links',
      contactTitle: 'Contact & Location',
      cairoOffice: 'Headquarters: Cairo, Egypt',
      cairoEgypt: 'Cairo, Egypt',
      emailUs: 'voxaa.business@gmail.com',
      callUs: '+20 111 171 7189 / +20 112 553 7697',
      whatsapp: 'WhatsApp Support',
      copyright: '© 2026 Voxa Studio. All rights reserved.',
      customCodeBadge: 'Engineered with custom code & precision.',
    },
    whatsapp: {
      tooltip: 'Chat with VOXA on WhatsApp',
      ariaLabel: 'Open WhatsApp chat with Voxa Studio',
    },
  },
  ar: {
    meta: {
      title: 'شركة تصميم وتطوير مواقع وتطبيقات ويب في مصر | Voxa Studio',
      description:
        'استوديو Voxa المتخصص في تصميم وتطوير واجهات المستخدم، مواقع الويب، والمتاجر الإلكترونية باحترافية عالية وأسعار شفافة في مصر والعالم العربي. ابدأ مشروعك الآن!',
      keywords:
        'شركة تصميم مواقع, تطوير تطبيقات ويب, تصميم متجر إلكتروني, استوديو تصميم رقمي, برمجة مواقع في مصر, Voxa Studio',
    },
    header: {
      home: 'الرئيسية',
      plans: 'الباقات',
      blog: 'المدونة',
      contact: 'تواصل معنا',
      about: 'من نحن',
      startNow: 'ابدأ الآن',
      langButton: 'English',
      langButtonAria: 'التحويل للغة الإنجليزية',
    },
    hero: {
      statusBadge: 'متاح الآن لاستقبال مشاريع جديدة',
      titleLine1: 'من التصميم',
      titleLine2: 'إلى العالم ',
      titleLine2Accent: 'الرقمي.',
      description:
        'يحول استوديو Voxa الأفكار الجريئة إلى مواقع ويب فائقة الأداء والتصميم تمتاز بجمال المظهر وقوة الوظيفة.',
      explorePlans: 'استكشف باقاتنا',
      seeHowWeWork: 'شاهد كيف نعمل',
    },
    services: {
      badge: 'خدماتنا الأساسية',
      title: 'برمجة وتصميم لأعلى تأثير',
      subtitle:
        'نمزج بين أنظمة التصميم المخصصة وأحدث معايير هندسة البرمجيات لبناء مواقع تعزز قيمة علامتك التجارية وتزيد من أرباحك.',
      items: [
        {
          id: 'ui-ux',
          num: '٠١',
          title: 'تصميم واجهات وتجربة المستخدم (UI/UX)',
          desc: 'واجهات مستخدم تفاعلية وجذابة تركز على تحويل الزوار إلى عملاء، مع بناء أنظمة تصميم كاملة متوافقة مع هويتك.',
          features: ['أنظمة تصميم فيجما (Figma)', 'نماذج تفاعلية وسريعة', 'دراسة تجربة المستخدم وسلوكه', 'تصميم متوافق للهواتف'],
        },
        {
          id: 'custom-web',
          num: '٠٢',
          title: 'تطوير مواقع الويب المخصصة (Custom Code)',
          desc: 'منصات رقمية فائقة السرعة مبنية بكود برمجي مخصص ونظيف بأحدث تقنيات React و Next.js بعيداً عن القوالب البطيئة.',
          features: ['سرعة تحميل 95+ PageSpeed', 'تجاوب فائق مع جميع الشاشات', 'ربط لوحات التحكم CMS', 'أعلى معايير الأمان'],
        },
        {
          id: 'ecommerce',
          num: '٠٣',
          title: 'متاجر إلكترونية عالية التحويل',
          desc: 'متاجر قابلة للتوسع مصممة لتسهيل تجربة الشراء ورفع معدل التحويل مع ربط بوابات الدفع الإلكتروني المحلية والعالمية.',
          features: ['ربط بوابات الدفع المباشرة', 'شراء سلس وسريع بدون تعقيد', 'إدارة مرنة للمنتجات والمخزون', 'سرعة استثنائية للموبايل'],
        },
        {
          id: 'seo-growth',
          num: '٠٤',
          title: 'تحسين محركات البحث والسرعة (SEO)',
          desc: 'تصدر نتائج محركات البحث عبر كود دلالي نظيف، سرعة تحميل لحظية، ووسوم Schema JSON-LD متطورة.',
          features: ['فحص شامل للسيو التقني', 'تحسين مؤشرات الويب Core Web Vitals', 'بيانات منظمة Schema.org', 'تصدر الكلمات المفتاحية'],
        },
      ],
    },
    whyVoxa: {
      badge: 'ميزة استوديو Voxa',
      title: 'لماذا تختار الشركات استوديو Voxa؟',
      subtitle:
        'نستبدل بيروقراطية الشركات التقليدية بالشفافية الكاملة في الأسعار، التواصل المباشر، وجودة الكود المخصص بدون تنازلات.',
      pillars: [
        {
          title: 'أسعار شفافة وثابتة',
          desc: 'باقات واضحة بدون أي رسوم خفية أو تكاليف غير متوقعة. تعرف مسبقاً بالضبط ماذا ستحصل ومتى.',
          stat: '١٠٠٪',
          statLabel: 'شفافية ومصداقية',
        },
        {
          title: 'كود مخصص فائق الأداء',
          desc: 'لا نعتمد على القوالب الجاهزة أو الإضافات الثقيلة. كود برمجي حديث مخصص يضمن لك السرعة والأمان.',
          stat: '+٩٥',
          statLabel: 'مقياس أداء جوجل PageSpeed',
        },
        {
          title: 'تسليم سريع ودعم مستمر',
          desc: 'تسليم الموقع بالكامل في غضون ١٠ إلى ٢١ يوماً مع ضمان شامل ودعم فني مباشر شخصياً.',
          stat: '١٠-٢١',
          statLabel: 'يوم عمل للتسليم',
        },
      ],
    },
    pricing: {
      badge: 'أسعار وباقات واضحة',
      title: 'باقات مصممة لنمو أعمالك',
      subtitle: 'استثمار شفاف، مواعيد تسليم منضبطة، وضمان شامل لكود مخصص بجودة استثنائية.',
      popularBadge: 'الأكثر طلباً',
      currency: 'ج.م',
      startingAt: 'تبدأ من',
      choosePlan: 'اختر الباقة',
      quoteCta: 'طلب عرض سعر مخصص',
      plans: [
        {
          id: 'standard',
          name: 'standard - باقة البداية',
          tagline: 'مثالية للشركات الناشئة والحملات الإعلانية وصفحات الهبوط التسويقية.',
          price: '10,000',
          features: [
            'صفحة هبوط مخصصة بالكامل لعلامتك',
            'تجاوب كامل مع الجوال والأجهزة اللوحية',
            'سرعة فائقة تفوق 95+ في PageSpeed',
            'ربط مباشر مع الواتساب ونماذج التواصل',
            'تهيئة السيو الأساسي ووسوم Meta',
            'التسليم خلال 10 إلى 14 يوم عمل',
            'ضمان كامل ودعم فني لمدة شهر',
          ],
        },
        {
          id: 'company',
          name: 'Company - باقة الشركات',
          tagline: 'موقع متكامل للشركات والمؤسسات التي تبحث عن حضور رقمي احترافي.',
          price: '18,000',
          highlight: true,
          features: [
            'موقع شركات متكامل (حتى 6 صفحات)',
            'حركات تفاعلية وواجهات مستخدم مخصصة في فيجما',
            'تهيئة محركات البحث المتقدمة وبيانات Schema',
            'مدونة متكاملة مهيأة للسيو ونشر المقالات',
            'لوحة تحكم مرنة وسريعة لإدارة المحتوى',
            'التسليم خلال 14 إلى 21 يوم عمل',
            'ضمان ودعم فني مباشر لمدة 60 يوماً',
          ],
        },
        {
          id: 'store',
          name: 'المتجر الإلكتروني',
          tagline: 'منصة تجارة إلكترونية متكاملة لزيادة المبيعات والتحويلات.',
          price: '28,000',
          features: [
            'متجر إلكتروني متكامل وتجربة شراء سلسة',
            'ربط بوابات الدفع Paymob, Fawry, InstaPay',
            'تكامل مع شركات الشحن Bosta و Aramex',
            'إدارة المخزون ونظام كوبونات الخصم',
            'دعم فني ومتابعة دقيقة لمدة 3 أشهر',
          ],
        },
        {
          id: 'enterprise',
          name: 'أنظمة مكتملة',
          tagline: 'تطبيقات ويب مخصصة، منصات رقمية، وحلول متكاملة للمؤسسات.',
          price: 'عرض سعر مخصص',
          features: [
            'تطبيقات ويب متكاملة أو منصات سحابية مخصصة',
            'ربط بوابات الدفع الإلكتروني وبوابات المستخدمين',
            'هندسة قواعد البيانات وواجهات API متينة',
            'تتبع متقدم للتحويلات والتحليلات الرقمية',
            'جدول زمني مخصص وخطة تسليم مرحلية',
            'فريق هندسي متخصص مع اتفاقية مستوى خدمة SLA',
          ],
        },
      ],
    },
    faq: {
      badge: 'الأسئلة الشائعة',
      title: 'الأسئلة الشائعة',
    },
    testimonials: {
      badge: 'آراء وتقييمات العملاء',
      title: 'يثق بنا رواد الأعمال والشركات الناشئة',
      subtitle: 'شهادات وتجارب حقيقية لشركاء نجاحنا الذين طوروا تواجدهم الرقمي مع استوديو Voxa.',
    },
    contact: {
      badge: 'ابدأ مشروعك الآن',
      title: 'لنصنع معاً شيئاً استثنائياً',
      subtitle:
        'هل لديك فكرة مشروع أو ترغب باستشارة تقنية؟ تواصل معنا اليوم لتحصل على عرض عمل تفصيلي خلال 24 ساعة.',
      nameLabel: 'الاسم بالكامل',
      namePlaceholder: 'أحمد السيد',
      emailLabel: 'البريد الإلكتروني للعمل',
      emailPlaceholder: 'ahmed@company.com',
      phoneLabel: 'رقم الهاتف / الواتساب',
      phonePlaceholder: '01XXXXXXXXX',
      serviceLabel: 'الخدمة المطلوبة',
      servicePlaceholder: 'مثال: موقع شركة، صفحة هبوط، متجر إلكتروني',
      detailsLabel: 'تفاصيل المشروع وأهدافه',
      detailsPlaceholder: 'أخبرنا عن فكرة مشروعك، متطلباتك، والجدول الزمني المستهدف...',
      submitBtn: 'إرسال تفاصيل المشروع',
      submittingBtn: 'جارٍ الإرسال...',
      successTitle: 'شكراً لك! تم استلام رسالتك بنجاح.',
      successDesc: 'سيقوم مديرنا التقني بدراسة تفاصيل مشروعك والتواصل معك خلال 24 ساعة.',
      sendAnother: 'إرسال رسالة أخرى',
      officeTitle: 'المكتب والاستوديو',
      officeLocation: 'القاهرة، مصر (نخدم عملاءنا في مصر والخليج والعالم)',
      whatsappDirect: 'تواصل مباشر عبر الواتساب',
      guarantee: 'سرية تامة 100%. نوقع اتفاقيات عدم إفصاح (NDA) عند الطلب.',
    },
    cta: {
      subtitle: 'هل لديك مشروع في بالك؟',
      title: 'لنصنع معاً شيئاً ',
      titleAccent: 'لا يُنسى.',
      copyEmail: 'نسخ البريد',
      copied: 'تم النسخ!',
      orEmailUs: 'أو تواصل معنا مباشرة عبر البريد الإلكتروني',
    },
    footer: {
      tagline: 'نصمم ونطور تجارب رقمية استثنائية من القاهرة إلى العالم.',
      availableBadge: 'متاح للعمل على مشاريع جديدة',
      quickLinksTitle: 'روابط سريعة',
      contactTitle: 'التواصل والموقع',
      cairoOffice: 'المقر الرئيسي: القاهرة، جمهورية مصر العربية',
      cairoEgypt: 'القاهرة، مصر',
      emailUs: 'voxaa.business@gmail.com',
      callUs: '+20 111 171 7189 / +20 112 553 7697',
      whatsapp: 'تواصل واتساب',
      copyright: '© 2026 Voxa Studio. جميع الحقوق محفوظة.',
      customCodeBadge: 'صُنع بكل فخر بكود برمجي مخصص ودقة عالية.',
    },
    whatsapp: {
      tooltip: 'تواصل مع استوديو Voxa عبر واتساب',
      ariaLabel: 'فتح محادثة واتساب مع استوديو Voxa',
    },
  },
}
