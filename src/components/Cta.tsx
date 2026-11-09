import { assets } from '@/lib/assets'
import { delay } from '@/lib/style'
import { useLanguage } from '@/context/LanguageContext'

const circle =
  'pointer-events-none absolute size-[35.3264rem] animate-breathe rounded-full border-[0.0785rem] border-[rgb(20_20_20/0.15)]'

export function Cta() {
  const { lang, t } = useLanguage()

  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-cloud px-5 py-28 text-center sm:px-8 lg:h-[42.978rem] lg:p-0 lg:pt-[9.0281rem]"
    >
      <span aria-hidden className={`${circle} left-[-20.4106rem] top-[-11.7756rem]`} />
      <span aria-hidden className={`${circle} bottom-[-22rem] right-[-15.2244rem] [animation-delay:-4.5s] lg:bottom-auto lg:top-[25.7075rem]`} />

      <div className="relative flex flex-col items-center">
        <div data-reveal="pop" className="relative size-[2.6691rem]">
          <img
            src={assets.sparkle}
            alt=""
            className="absolute left-[0.4425rem] top-[0.1094rem] h-[2.3355rem] w-[2.113rem] max-w-none animate-twinkle"
          />
        </div>
        <p
          data-reveal="up"
          style={delay(80)}
          className="mt-[1.5694rem] font-dm text-[0.785rem] font-extrabold leading-[1.5] tracking-[0.18em] text-ash"
        >
          {t.cta.subtitle}
        </p>
        <h2
          id="cta-title"
          data-reveal="blur"
          style={delay(160)}
          className="mt-[1.4131rem] font-manrope text-[clamp(2rem,10.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-ash lg:text-[5.2rem]"
        >
          <span className="sm:block">{t.cta.title} </span>
          <span className="font-serif italic leading-[0]">
            <span className="text-voxa">{t.cta.titleAccent}</span>
          </span>
        </h2>
        <a
          href="mailto:voxaa.business@gmail.com"
          data-reveal="up"
          style={delay(260)}
          className="mt-12 lg:mt-[3.1381rem]"
        >
          <span className="btn-shine group inline-flex items-center justify-center gap-[0.8636rem] border-[0.0785rem] border-transparent bg-voxa px-[1.6486rem] py-[1.1776rem] font-dm text-[1.0991rem] font-bold leading-[1.5] text-ash transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0.75rem_2rem_-0.75rem_rgb(99_161_242/0.95)]">
            voxaa.business@gmail.com
            <span className="flex size-[1.5701rem] items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <img src={assets.arrowRightLarge} alt="" className="h-[0.9159rem] w-[1.0468rem] max-w-none rtl:scale-x-[-1]" />
            </span>
          </span>
        </a>
      </div>
    </section>
  )
}
