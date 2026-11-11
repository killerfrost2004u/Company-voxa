import { useState } from 'react'
import { delay } from '@/lib/style'
import { useLanguage } from '@/context/LanguageContext'

export interface FAQItem {
  id: string
  questionAr: string
  questionEn: string
  answerAr: string
  answerEn: string
}

export const FAQS: FAQItem[] = [
  {
    id: 'services',
    questionAr: 'ما هي الخدمات التي يقدمها استوديو Voxa لتصميم وتطوير المواقع؟',
    questionEn: 'What services does Voxa Studio provide?',
    answerAr:
      'يقدم استوديو Voxa حلولاً رقمية متكاملة تشمل تصميم واجهات وتجربة المستخدم (UI/UX Design)، وتطوير مواقع الويب وتطبيقات الويب المخصصة (Custom Web Development)، وبناء المتاجر الإلكترونية المتكاملة، وتحسين محركات البحث وسرعة الأداء (SEO & Speed Optimization)، بالإضافة إلى الصيانة والدعم المستمر.',
    answerEn:
      'Voxa Studio delivers end-to-end digital solutions including bespoke UI/UX design, custom web and web-app development, high-converting e-commerce stores, comprehensive SEO, and continuous 1:1 maintenance and support.',
  },
  {
    id: 'timeline',
    questionAr: 'كم يستغرق تسليم المشروع مع استوديو Voxa؟',
    questionEn: 'How long does a project take to deliver?',
    answerAr:
      'تستغرق باقة Standard للمواقع التعريفية وصفحات الهبوط ما بين 10 إلى 14 يوماً عمل. بينما تستغرق باقة Company للمواقع والشركات الأكبر من 14 إلى 21 يوماً عمل. أما المشاريع المخصصة والمتاجر الكبرى فيتم تحديد جدولها الزمني بدقة بعد دراسة المتطلبات.',
    answerEn:
      'Standard launch packages typically take 10-14 business days. Multi-page Company packages take 14-21 days. Custom enterprise solutions and e-commerce stores are scheduled based on detailed scope analysis.',
  },
  {
    id: 'pricing',
    questionAr: 'ما هي أسعار باقات تصميم وتطوير المواقع لدى Voxa؟',
    questionEn: 'What are Voxa Studio pricing plans?',
    answerAr:
      'تبدأ باقة Standard من 10,000 جنيه مصري وتشمل صفحة هبوط مصممة خصيصاً مع التجاوب الكامل للأجهزة وتهيئة الأداء وربط الواتساب وضمان شهر كامل. وتبدأ باقة Company من 18,000 جنيه مصري لمواقع الشركات متكاملة الصفحات، كما نوفر عروض أسعار مخصصة (Custom Quote) للمشاريع المتقدمة.',
    answerEn:
      'Our Standard tier starts at 10,000 EGP for bespoke landing pages. The Company tier starts at 18,000 EGP for comprehensive business websites. We also craft custom quotes for enterprise needs.',
  },
  {
    id: 'support',
    questionAr: 'هل يوفر استوديو Voxa دعماً فنياً وضماناً بعد إطلاق الموقع؟',
    questionEn: 'Do you offer warranty and support after launch?',
    answerAr:
      'نعم بالتأكيد! توفر باقاتنا دعماً فنياً مباشراً 1:1 وضماناً شاملاً بعد الإطلاق لمعالجة أي استفسارات أو تعديلات فنية، مع إمكانية الاشتراك في خطط الصيانة الدورية والاستضافة لضمان استقرار وأمان الموقع 24/7.',
    answerEn:
      'Yes! Every package comes with a dedicated post-launch warranty and 1:1 direct technical support. We also offer continuous maintenance contracts to ensure 24/7 uptime and peak security.',
  },
  {
    id: 'tech-stack',
    questionAr: 'لماذا يفضل الكود المخصص (Custom Code) على المنصات الجاهزة كـ WordPress؟',
    questionEn: 'Why choose custom code over platforms like WordPress?',
    answerAr:
      'نستخدم أحدث تقنيات الويب الحديثة (React, Vite, Next.js, Tailwind CSS) لنضمن لك سرعة تحميل استثنائية (PageSpeed 95+)، وأعلى معايير الأمان دون الحاجة لإضافات كثيرة قد تخترق، وتجربة مستخدم وتصميماً فريداً يعزز هوية علامتك التجارية وتصدرها لمحركات البحث.',
    answerEn:
      'Custom code engineered with modern frameworks (React, Vite, Tailwind CSS) guarantees lightning-fast loading speeds (95+ Google PageSpeed), bulletproof security without bloated plugins, and unique interactive UI that outranks competitors.',
  },
]

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id)
  const { lang, t } = useLanguage()

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  // Generate Google Rich Results compliant FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: lang === 'ar' ? item.questionAr : item.questionEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: lang === 'ar' ? item.answerAr : item.answerEn,
      },
    })),
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative z-10 bg-[#0c0c0c] px-5 py-24 sm:px-8 lg:px-[6.1rem] lg:py-[7rem]"
    >
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[68rem]">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p
              data-reveal="up"
              className="font-dm text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-voxa"
            >
              {t.faq.badge}
            </p>
            <h2
              id="faq-title"
              data-reveal="blur"
              style={delay(80)}
              className="mt-4 max-w-[68rem] font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white"
            >
              {t.faq.title}
            </h2>
            <p
              data-reveal="up"
              style={delay(120)}
              className="mt-4 max-w-[68rem] font-manrope text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed text-voxa"
            >
              {lang === 'ar'
                ? 'إجابات واضحة ومباشرة عن كل ما يخص خدماتنا، الأسعار، ومراحل العمل.'
                : 'Clear, direct answers about our services, pricing, and process.'}
            </p>
          </div>
        </div>

        {/* Questions Accordion List */}
        <div
          className="mt-12 divide-y divide-white/10 rounded-2xl border border-white/10 bg-ash/40 backdrop-blur-xl"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id
            const question = lang === 'ar' ? faq.questionAr : faq.questionEn
            const answer = lang === 'ar' ? faq.answerAr : faq.answerEn

            return (
              <div
                key={faq.id}
                data-reveal="up"
                style={delay(150 + index * 60)}
                className={`transition-colors duration-300 ${isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left transition-colors sm:px-8 sm:py-7"
                >
                  <span
                    className={`font-manrope text-[1.125rem] font-bold leading-[1.4] transition-colors sm:text-[1.3125rem] ${
                      isOpen ? 'text-voxa' : 'text-white hover:text-white/90'
                    }`}
                  >
                    {question}
                  </span>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-300 ${
                      isOpen ? 'rotate-180 border-voxa bg-voxa/10 text-voxa' : 'text-white/60'
                    }`}
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-7 font-dm text-[1rem] leading-[1.75] text-[#aaa7a0] sm:px-8 sm:text-[1.125rem]">
                    {answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
