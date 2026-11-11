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
          className="mt-4 font-dm text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-ash/80"
        >
          {t.cta.subtitle}
        </p>
        <h2
          id="cta-title"
          data-reveal="blur"
          style={delay(160)}
          className="mt-4 font-manrope text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-ash max-w-4xl leading-[1.2]"
        >
          <span className="sm:block">{t.cta.title} </span>
          <span className="font-serif font-normal italic text-voxa">{t.cta.titleAccent}</span>
        </h2>
        <a
          href="mailto:voxaa.business@gmail.com"
          data-reveal="up"
          style={delay(260)}
          className="mt-10 lg:mt-12"
        >
          <span className="btn-shine group inline-flex items-center justify-center gap-3 rounded-full bg-voxa px-8 py-3.5 font-manrope text-base sm:text-lg font-bold text-ash shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0.75rem_2rem_-0.75rem_rgb(99_161_242/0.95)]">
            voxaa.business@gmail.com
            <span className="flex size-5 items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <img src={assets.arrowRightLarge} alt="" className="h-3.5 w-4 max-w-none rtl:scale-x-[-1]" />
            </span>
          </span>
        </a>
      </div>
    </section>
  )
}
