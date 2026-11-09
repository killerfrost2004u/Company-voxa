import { assets } from '@/lib/assets'
import { delay } from '@/lib/style'
import { Logo } from './Logo'
import { useLanguage } from '@/context/LanguageContext'

const number =
  'font-manrope text-[2.75rem] font-extrabold leading-[1.075] tracking-[-0.07672em] text-voxa lg:text-[3.3139rem]'
const title =
  'font-manrope text-[2.25rem] leading-[1.05] tracking-[-0.025em] text-white lg:text-[2.5rem]'
const body = 'font-dm text-[1.125rem] leading-[1.3] text-white lg:text-[1.25rem]'

export function Services() {
  const { lang } = useLanguage()

  return (
    <section
      id="services"
      aria-label="Services"
      className="relative overflow-hidden bg-black"
    >
      <div className="relative mx-auto grid max-w-[80rem] md:grid-cols-2 lg:h-[44.5625rem] lg:grid-cols-[581fr_354fr_345fr]">
        {/* Line-wave textures crossing the column edges (desktop composition). */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
          <div className="absolute left-[50.75rem] rtl:left-auto rtl:right-[50.75rem] top-0 h-[18.0625rem] w-[22.125rem] overflow-hidden opacity-48">
            <img
              src={assets.waves}
              alt=""
              className="absolute left-[-16.04%] top-[-63.49%] h-[163.49%] w-[133.63%] max-w-none animate-drift"
            />
          </div>
          <div className="absolute left-[21.75rem] rtl:left-auto rtl:right-[21.75rem] top-[30.5rem] h-[14.0625rem] w-[32.125rem] overflow-hidden opacity-43">
            <img
              src={assets.waves}
              alt=""
              className="absolute left-[-14.63%] top-[-36.32%] h-[298.51%] w-[131%] max-w-none animate-drift [animation-delay:-9s]"
            />
          </div>
        </div>

        {/* Column 1 glow, kept outside the column so it bleeds into the gutter on wide screens. */}
        <img
          src={assets.studioGlow}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[-23.2625rem] rtl:left-auto rtl:right-[-23.2625rem] top-[-20.8875rem] z-[1] h-[57.275rem] w-[57.7125rem] max-w-none animate-breathe"
        />

        {/* 01 — Design */}
        <article className="relative overflow-hidden bg-transparent px-5 pb-20 pt-14 sm:px-8 md:col-span-2 lg:col-span-1 lg:p-0 lg:px-[2.625rem] lg:pt-[6.375rem]">
          <img
            src={assets.ring}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[-6rem] top-[9rem] z-[1] size-[17.25rem] max-w-none animate-orbit lg:left-[15.0625rem] lg:right-auto lg:top-[8.875rem] rtl:lg:left-auto rtl:lg:right-[15.0625rem]"
          />
          <img
            src={assets.waves}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-24 w-[22rem] max-w-none animate-drift opacity-40 lg:hidden"
          />

          <div className="relative z-[2]">
            <div className="flex items-start justify-between pr-4 rtl:pr-0 rtl:pl-4">
              <h2
                data-reveal="up"
                className="font-manrope text-[2.25rem] font-medium leading-[1.05] tracking-[-0.04em] text-paper sm:text-[2.75rem] lg:text-[3rem]"
              >
                {lang === 'ar' ? (
                  <>
                    استوديو متكامل.
                    <br />
                    لكل احتياج رقمي.
                  </>
                ) : (
                  <>
                    One studio.
                    <br />
                    Every digital need.
                  </>
                )}
              </h2>
              <p data-reveal="up" className={number}>
                01
              </p>
            </div>
            <p
              data-reveal="up"
              style={delay(80)}
              className="mt-[1.4375rem] max-w-[22.6875rem] font-dm text-[1.125rem] leading-[1.5] text-[#aaa69f] lg:text-[1.25rem]"
            >
              {lang === 'ar'
                ? 'نردم الفجوة بين الفكرة الإبداعية والموقع فائق الأداء الذي يخدم أهداف نمو عملك التجاري.'
                : 'We bridge the gap between a beautiful concept and a website that works hard for your business.'}
            </p>
            <h3
              data-reveal="up"
              style={delay(160)}
              className="mt-[1.8375rem] max-w-[22.5625rem] font-manrope text-[2.75rem] leading-[1.2] tracking-[-0.03em] text-white lg:text-[3.75rem]"
            >
              {lang === 'ar' ? 'تصميم يأسر الحواس' : 'Design that speaks'}
            </h3>
            <p
              data-reveal="up"
              style={delay(240)}
              className="mt-[1.1706rem] max-w-[27.1639rem] font-manrope text-[1.25rem] font-semibold leading-[1.3] text-white lg:text-[1.4259rem]"
            >
              {lang === 'ar'
                ? 'واجهات مستخدم ذات طابع وهوية واضحة، سهلة التصفح وتخلق تأثيراً لا يُمحى.'
                : 'Purposeful interfaces with personality, clarity, and a strong point of view.'}
            </p>
            <div className="mt-[1.6063rem] lg:ms-[0.1875rem] lg:w-[30.7188rem]">
              <div data-reveal="up" style={delay(320)} className="flex justify-end rtl:justify-start lg:block">
                <Logo tone="paper" variant="wordmark" size="sm" className="lg:ms-[25.5rem] rtl:lg:ms-0 rtl:lg:me-[25.5rem]" />
              </div>
              <img
                data-reveal="line"
                style={delay(360)}
                src={assets.lineLong}
                alt=""
                className="-mt-[0.0513rem] block h-[0.1875rem] w-[30.7188rem] max-w-full"
              />
            </div>
          </div>
        </article>

        {/* 02 — Coding */}
        <article className="relative overflow-hidden bg-transparent px-5 pb-20 pt-14 sm:px-8 lg:overflow-visible lg:p-0 lg:px-[1.375rem] lg:pt-[6.8125rem]">
          <img
            src={assets.waves}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 w-[20rem] max-w-none animate-drift opacity-45 lg:hidden"
          />
          <div className="relative z-[2]">
            <div className="flex items-start justify-between pr-4 rtl:pr-0 rtl:pl-4">
              <h3 data-reveal="up" className={`${title} font-bold`}>
                {lang === 'ar' ? 'برمجة وكود' : 'Coding'}
              </h3>
              <p data-reveal="up" className={number}>
                02
              </p>
            </div>
            <img
              data-reveal="line"
              style={delay(120)}
              src={assets.lineShort}
              alt=""
              className="ms-[0.125rem] mt-[1.0313rem] block h-[0.1875rem] w-[19.0625rem] max-w-full"
            />
            <h4
              data-reveal="up"
              style={delay(120)}
              className={`${title} mt-[3.7813rem] max-w-[14rem] font-medium`}
            >
              {lang === 'ar' ? 'كود فائق السرعة' : 'Code that performs'}
            </h4>
            <p data-reveal="up" style={delay(200)} className={`${body} mt-[1.8125rem] max-w-[19.625rem]`}>
              {lang === 'ar'
                ? 'تطوير نظيف ومتجاوب، فائق السرعة ومصمم للاستقرار والتوسع بسلاسة.'
                : 'Clean, responsive development that is fast, reliable, and easy to scale.'}
            </p>
          </div>
        </article>

        {/* 03 — System */}
        <article className="relative bg-transparent px-5 pb-20 pt-14 sm:px-8 lg:p-0 lg:px-[1.375rem] lg:pt-[10.5rem]">
          <div className="relative z-[2] lg:w-[19.0625rem]">
            <div data-reveal="up" className="relative flex max-w-[19.0625rem] items-end justify-between">
              <h3 className={`${title} font-bold`}>{lang === 'ar' ? 'أنظمة متكاملة' : 'System'}</h3>
              <p className="font-manrope text-[2.75rem] font-extrabold leading-[1.075] tracking-[-0.07672em] text-voxa lg:text-[3.3139rem]">
                03
              </p>
            </div>
            <img
              data-reveal="line"
              style={delay(120)}
              src={assets.lineShort}
              alt=""
              className="mt-[0.9063rem] block h-[0.1875rem] w-[19.0625rem] max-w-full"
            />
            <h4
              data-reveal="up"
              style={delay(120)}
              className={`${title} mt-[2.9688rem] max-w-[15.4375rem] font-medium`}
            >
              {lang === 'ar' ? 'أنظمة تدعم نموك' : 'Systems that grow'}
            </h4>
            <p data-reveal="up" style={delay(200)} className={`${body} mt-[1.5rem] max-w-[19.0625rem]`}>
              {lang === 'ar'
                ? 'ربط متقدم مع أنظمة إدارة المحتوى CMS، بوابات الدفع، ولوحات التحكم في تجربة واحدة انسيابية.'
                : 'CMS, dashboards, APIs, and payments connected into one smooth experience.'}
            </p>
            <div data-reveal="up" style={delay(260)} className="mt-6 flex justify-end">
              <Logo tone="paper" variant="wordmark" size="sm" />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
