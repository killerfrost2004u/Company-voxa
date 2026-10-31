import { assets } from '@/lib/assets'
import { delay } from '@/lib/style'

export function Testimonial() {
  return (
    <section aria-label="Client testimonial" className="bg-black px-5 py-24 text-center sm:px-8 lg:px-[1.5793rem] lg:py-[9.0806rem]">
      <figure className="mx-auto flex max-w-[75.0139rem] flex-col items-center">
        <div data-reveal="pop" className="relative mb-[1.8951rem] size-[3.0006rem]">
          <img
            src={assets.quote}
            alt=""
            className="absolute left-[0.2486rem] top-[0.5rem] h-[1.7503rem] w-[2.2504rem] max-w-none"
          />
        </div>
        <blockquote
          data-reveal="blur"
          style={delay(120)}
          className="pb-[3.0006rem] font-manrope text-[1.625rem] font-semibold leading-[1.3] tracking-[-0.05865em] text-white sm:text-[2rem] lg:text-[2.4234rem]"
        >
          “Voxa didn’t just deliver a website. They understood our business, sharpened our story, and
          built a platform we’re proud to share.”
        </blockquote>
        <figcaption data-reveal="up" style={delay(240)} className="flex items-center gap-[0.9476rem] text-left">
          <span aria-hidden className="flex size-[3.0006rem] shrink-0 items-center justify-center rounded-full bg-white font-dm text-[0.7896rem] leading-[1.5] text-white">
            AM
          </span>
          <span className="font-dm text-[0.9476rem] leading-[1.5] text-white">
            <span className="block font-bold">Ahmed Mansour</span>
            <span className="block pt-[0.1579rem] opacity-60">Founder, Northline Studio</span>
          </span>
        </figcaption>
      </figure>
    </section>
  )
}
