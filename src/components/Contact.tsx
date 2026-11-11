import { useEffect, useState, type FormEvent } from 'react'
import { assets } from '@/lib/assets'
import { delay } from '@/lib/style'
import { useLanguage } from '@/context/LanguageContext'

const EMAIL = 'voxaa.business@gmail.com'

const CHANNELS = [
  {
    label: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: assets.mail,
    iconClass: 'h-[1.625rem] w-[2.0625rem]',
    textClass: 'lg:ml-[1.375rem]',
    spacing: '',
  },
  {
    label: '+20 1111 717 189',
    href: 'https://wa.me/201111717189',
    icon: assets.phone,
    iconClass: 'size-[1.9375rem]',
    // The phone label sits 3.5px above centre in the design.
    textClass: 'lg:ml-[1.75rem] lg:-translate-y-[0.2188rem]',
    spacing: 'mt-3 lg:mt-[0.8125rem]',
  },
  {
    label: '+20 1125 537 697',
    href: 'https://wa.me/201125537697',
    icon: assets.phone,
    iconClass: 'size-[1.9375rem]',
    textClass: 'lg:ml-[1.75rem] lg:-translate-y-[0.2188rem]',
    spacing: 'mt-3 lg:mt-[0.8125rem]',
  },
  {
    label: 'Egypt',
    href: undefined,
    icon: assets.pin,
    iconClass: 'h-[2.0872rem] w-[2.0625rem]',
    textClass: 'lg:ml-[1.75rem]',
    spacing: 'mt-3 lg:mt-[0.625rem]',
  },
]

const field =
  'w-full rounded-[0.875rem] bg-ash px-[1.125rem] font-manrope text-[1.125rem] font-medium leading-[1.125] text-white outline-none ring-0 ring-voxa/70 transition-[box-shadow,background-color] duration-300 placeholder:text-white/64 hover:bg-[#181818] focus:bg-[#181818] focus:ring-2 lg:text-[1.5rem]'

type ContactProps = {
  planRequest: { plan: string; id: number } | null
}

export function Contact({ planRequest }: ContactProps) {
  const { lang, t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (planRequest) setMessage(`Hi Voxa, I'm interested in the ${planRequest.plan} plan. `)
  }, [planRequest])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          plan: planRequest?.plan,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        throw new Error(data.error || 'Failed to deliver message.')
      }
    } catch (err: any) {
      console.error('Contact submission failed:', err)
      setSubmitStatus('error')
      setErrorMessage(err.message || 'Something went wrong while sending. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative px-5 pb-24 pt-16 sm:px-8 lg:min-h-[56.1756rem] lg:h-auto lg:p-0 lg:pb-16"
    >
      <div data-parallax="0.08" className="relative z-0 lg:absolute lg:inset-x-0 lg:top-0 pointer-events-none select-none">
        <div
          aria-hidden="true"
          data-reveal="blur"
          className="mb-8 text-center font-manrope text-[18vw] font-light tracking-widest leading-[0.9] text-white/[0.02] lg:absolute lg:left-1/2 lg:top-[4.8006rem] lg:mb-0 lg:-ml-[19.25rem] lg:h-[5.625rem] lg:w-[38.5625rem] lg:text-left lg:text-[9.5625rem] lg:leading-[1.4875rem] pointer-events-none select-none"
        >
          Contact
        </div>
      </div>

      <div className="relative z-[2] mx-auto grid max-w-[80rem] gap-14 lg:grid-cols-[573fr_608fr] lg:gap-[1.1875rem] lg:px-[2.4rem]">
        <div className="lg:pt-[15rem]">
          <p
            data-reveal="up"
            className="font-dm text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-voxa"
          >
            {lang === 'ar' ? 'تواصل مع الاستوديو' : 'CONTACT STUDIO'}
          </p>
          <h2
            id="contact-title"
            data-reveal="blur"
            style={delay(80)}
            className="mt-3 font-manrope text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.2]"
          >
            {lang === 'ar' ? (
              <>
                تواصل معنا مباشرة.{' '}
                <span className="font-serif font-normal italic text-voxa">لنبدأ مشروعك القادم.</span>
              </>
            ) : (
              <>
                Get in touch with us.{' '}
                <span className="font-serif font-normal italic text-voxa">Let’s engineer something great.</span>
              </>
            )}
          </h2>
          <p
            data-reveal="up"
            style={delay(140)}
            className="mt-4 max-w-[28rem] font-dm text-base sm:text-lg leading-relaxed text-[#aaa7a0]"
          >
            {lang === 'ar'
              ? 'تحدث مع فريقنا الهندسي مباشرة لتحديد أنسب باقة لعملك وتقديم استشارة تقنية وفنية مجانية لمشروعك.'
              : 'Talk directly with our senior engineering team to evaluate your scope and get a bespoke roadmap.'}
          </p>

          <ul data-reveal-group className="mt-10 lg:mt-[3.1875rem]">
            {CHANNELS.map((channel, i) => {
              const label = channel.label === 'Egypt' && lang === 'ar' ? 'مصر - القاهرة' : channel.label
              const inner = (
                <>
                  <span className="glass [--glass-alpha:0.2]" />
                  <span
                    data-reveal="fade"
                    style={delay(i * 120 + 150)}
                    className="relative z-[2] mx-3 shrink-0 lg:mx-[0.8125rem]"
                  >
                    <span className="flex size-14 items-center justify-center rounded-[0.4375rem] bg-[#1f1f1f] transition-colors duration-300 group-hover:bg-voxa sm:size-16 lg:size-[4.75rem]">
                      <img src={channel.icon} alt="" className={`max-w-none ${channel.iconClass}`} />
                    </span>
                  </span>
                  <span
                    data-reveal="fade"
                    style={delay(i * 120 + 220)}
                    className={`relative z-[2] mx-4 min-w-0 truncate py-[0.25em] font-manrope text-[1rem] font-bold leading-[1.125] text-white sm:mx-5 sm:text-[1.25rem] lg:text-[1.5rem] ${channel.textClass}`}
                  >
                    {label}
                  </span>
                </>
              )
              const card =
                'group relative flex h-20 items-center rounded-[0.875rem] transition-[translate] duration-500 ease-[var(--ease-expo)] sm:h-[5.75rem] lg:h-[6.625rem]'
              return (
                <li key={channel.label} data-reveal="slide-left" style={delay(i * 120)} className={channel.spacing}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`${card} hover:translate-x-1.5 rtl:hover:-translate-x-1.5`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={card}>{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div data-reveal-group className="lg:pt-[13.8631rem]">
          <form
            data-reveal="slide-right"
            onSubmit={onSubmit}
            className="relative flex flex-col rounded-[0.875rem] p-3 sm:p-4 lg:h-[36.75rem] lg:px-[1.0625rem] lg:pb-[1rem] lg:pt-[1.4375rem]"
          >
            <span className="glass [--glass-alpha:0.2]" />
            <div data-reveal="up" style={delay(150)} className="relative z-[2]">
              <label className="sr-only" htmlFor="contact-name">
                {lang === 'ar' ? 'الاسم' : 'Name'}
              </label>
              <input
                id="contact-name"
                required
                autoComplete="name"
                placeholder={lang === 'ar' ? 'الاسم بالكامل' : 'Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${field} block h-16 lg:h-[5.3125rem]`}
              />
            </div>
            <div data-reveal="up" style={delay(230)} className="relative z-[2] mt-[0.9375rem]">
              <label className="sr-only" htmlFor="contact-email">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input
                id="contact-email"
                required
                type="email"
                autoComplete="email"
                placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${field} block h-16 lg:h-[5.3125rem]`}
              />
            </div>
            <div data-reveal="up" style={delay(310)} className="relative z-[2] mt-[1.0625rem]">
              <label className="sr-only" htmlFor="contact-message">
                {lang === 'ar' ? 'الرسالة' : 'Message'}
              </label>
              <textarea
                id="contact-message"
                required
                placeholder={lang === 'ar' ? 'تفاصيل مشروعك والخدمات أو الباقة المطلوبة...' : 'Message'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${field} block h-48 resize-none pt-[1.125rem] lg:h-[16.5rem]`}
              />
            </div>
            <div data-reveal="up" style={delay(390)} className="relative z-[2] mt-[0.9375rem] space-y-3">
              {submitStatus === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-emerald-300 backdrop-blur-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex size-2.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative size-full rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-manrope text-sm font-semibold tracking-wide">
                      {lang === 'ar'
                        ? 'تم استلام طلبك بنجاح! سيتواصل معك أحد مهندسينا قريباً.'
                        : 'Enquiry received! We will reply to your email shortly.'}
                    </span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-rose-300 backdrop-blur-md transition-all duration-300"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 size-2 rounded-full bg-rose-400 shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold">{errorMessage || (lang === 'ar' ? 'تعذر إرسال الرسالة حالياً.' : 'Unable to deliver message right now.')}</p>
                      <p className="mt-1 text-xs text-white/70">
                        {lang === 'ar' ? 'يمكنك أيضاً التواصل معنا مباشرة عبر ' : 'You can also contact us directly at '}
                        <a href={`mailto:${EMAIL}`} className="text-voxa underline hover:text-white">
                          {EMAIL}
                        </a>{' '}
                        {lang === 'ar' ? 'أو عبر ' : 'or via '}
                        <a
                          href="https://wa.me/201111717189"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 underline hover:text-white"
                        >
                          WhatsApp
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-shine block h-14 w-full rounded-[0.875rem] font-manrope text-base sm:text-lg font-bold text-white transition-[box-shadow,filter,opacity] duration-300 lg:h-16 lg:text-xl ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-voxa/70 opacity-80'
                    : submitStatus === 'success'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-voxa hover:shadow-[0_0.75rem_2rem_-0.75rem_rgb(99_161_242/0.9)] active:brightness-95'
                }`}
              >
                <span aria-live="polite" className="inline-flex items-center justify-center gap-3">
                  {isSubmitting && (
                    <svg
                      className="size-6 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {isSubmitting
                    ? (lang === 'ar' ? 'جاري الإرسال…' : 'Sending enquiry…')
                    : submitStatus === 'success'
                      ? (lang === 'ar' ? 'تم الإرسال بنجاح ✓' : 'Sent Successfully ✓')
                      : (lang === 'ar' ? 'إرسال الطلب الآن' : 'Submit')}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
