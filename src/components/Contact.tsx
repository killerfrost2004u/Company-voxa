import { useEffect, useState, type FormEvent } from 'react'
import { assets } from '@/lib/assets'
import { delay } from '@/lib/style'

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (planRequest) setMessage(`Hi Voxa, I'm interested in the ${planRequest.plan} plan. `)
  }, [planRequest])

  useEffect(() => {
    if (!sent) return
    const timer = window.setTimeout(() => setSent(false), 4000)
    return () => window.clearTimeout(timer)
  }, [sent])

  // No backend in this project: hand the enquiry to the visitor's mail client.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New project enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative px-5 pb-24 pt-16 sm:px-8 lg:min-h-[56.1756rem] lg:h-auto lg:p-0 lg:pb-16"
    >
      <div data-parallax="0.08" className="relative z-0 lg:absolute lg:inset-x-0 lg:top-0">
        <h2
          id="contact-title"
          data-reveal="blur"
          className="mb-12 text-center font-manrope text-[21vw] font-bold leading-[0.9] text-white/70 lg:absolute lg:left-1/2 lg:top-[4.8006rem] lg:mb-0 lg:-ml-[19.25rem] lg:h-[5.625rem] lg:w-[38.5625rem] lg:text-left lg:text-[9.5625rem] lg:leading-[1.4875rem]"
        >
          Contact
        </h2>
      </div>

      <div className="relative z-[2] mx-auto grid max-w-[80rem] gap-14 lg:grid-cols-[573fr_608fr] lg:gap-[1.1875rem] lg:pl-[2.375rem] lg:pr-[2.625rem]">
        <div className="lg:pt-[17.9256rem]">
          <h3
            data-reveal="up"
            className="font-manrope text-[2.5rem] font-bold leading-[1.1] text-white lg:text-[3rem] lg:leading-[1.4875rem]"
          >
            Get in touch
          </h3>
          <p
            data-reveal="up"
            style={delay(100)}
            className="mt-4 max-w-[21.8125rem] font-manrope text-[1.25rem] font-medium leading-[1.125] text-white lg:mt-[3.075rem] lg:text-[1.5rem]"
          >
            Feel free to ask anytime to start your project with us
          </p>

          <ul data-reveal-group className="mt-10 lg:mt-[3.1875rem]">
            {CHANNELS.map((channel, i) => {
              const inner = (
                <>
                  <span className="glass [--glass-alpha:0.2]" />
                  <span
                    data-reveal="fade"
                    style={delay(i * 120 + 150)}
                    className="relative z-[2] ml-3 shrink-0 lg:ml-[0.8125rem]"
                  >
                    <span className="flex size-14 items-center justify-center rounded-[0.4375rem] bg-[#1f1f1f] transition-colors duration-300 group-hover:bg-voxa sm:size-16 lg:size-[4.75rem]">
                      <img src={channel.icon} alt="" className={`max-w-none ${channel.iconClass}`} />
                    </span>
                  </span>
                  <span
                    data-reveal="fade"
                    style={delay(i * 120 + 220)}
                    className={`relative z-[2] ml-4 min-w-0 truncate py-[0.25em] font-manrope text-[1rem] font-bold leading-[1.125] text-white sm:ml-5 sm:text-[1.25rem] lg:text-[1.5rem] ${channel.textClass}`}
                  >
                    {channel.label}
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
                      className={`${card} hover:translate-x-1.5`}
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
                Name
              </label>
              <input
                id="contact-name"
                required
                autoComplete="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${field} block h-16 lg:h-[5.3125rem]`}
              />
            </div>
            <div data-reveal="up" style={delay(230)} className="relative z-[2] mt-[0.9375rem]">
              <label className="sr-only" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                required
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${field} block h-16 lg:h-[5.3125rem]`}
              />
            </div>
            <div data-reveal="up" style={delay(310)} className="relative z-[2] mt-[1.0625rem]">
              <label className="sr-only" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${field} block h-48 resize-none pt-[1.125rem] lg:h-[16.5rem]`}
              />
            </div>
            <div data-reveal="up" style={delay(390)} className="relative z-[2] mt-[0.9375rem]">
              <button
                type="submit"
                className="btn-shine block h-14 w-full rounded-[0.875rem] bg-voxa font-manrope text-[1.5rem] font-bold leading-[1.6875rem] text-white transition-[box-shadow,filter] duration-300 hover:shadow-[0_0.75rem_2rem_-0.75rem_rgb(99_161_242/0.9)] active:brightness-95 lg:h-[4.25rem] lg:text-[2rem]"
              >
                <span aria-live="polite">{sent ? 'Opening your email…' : 'Submit'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
