import { delay } from '@/lib/style'
import { CountUp } from './CountUp'
import { useLanguage } from '@/context/LanguageContext'

export function WhyVoxa() {
  const { lang, t } = useLanguage()

  const stats = [
    { value: <CountUp to={100} suffix="%" />, label: lang === 'ar' ? 'كود مخصص بالكامل' : 'Custom built' },
    { value: <CountUp to={24} suffix="/7" />, label: lang === 'ar' ? 'استقرار وتشغيل' : 'Always online' },
    { value: '1:1', label: lang === 'ar' ? 'دعم فني مباشر' : 'Direct support' },
  ]

  return (
    <section
      id="about"
      aria-labelledby="why-voxa-title"
      className="bg-ash px-5 py-24 sm:px-8 lg:px-[6.1rem] lg:py-[9.4941rem]"
    >
      <div data-reveal-group className="mx-auto max-w-[67.9894rem]">
        <p
          data-reveal="up"
          className="font-dm text-[0.8703rem] font-extrabold leading-[1.5] tracking-[0.16363em] text-voxa"
        >
          {t.whyVoxa.badge}
        </p>
        <h2
          id="why-voxa-title"
          data-reveal="blur"
          style={delay(80)}
          className="mt-4 max-w-[68.0413rem] font-manrope text-[2.5rem] font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-[3.25rem] lg:mt-5 lg:text-[4.3706rem]"
        >
          {t.whyVoxa.title}{' '}
          <em className="font-serif font-normal italic leading-[0] text-voxa">
            {t.whyVoxa.subtitle}
          </em>
        </h2>

        <p
          data-reveal="up"
          style={delay(160)}
          className="mt-3.5 max-w-[68.0413rem] font-dm text-[1.125rem] leading-[1.65] text-[#aaa7a0] sm:mt-4 lg:mt-4.5 lg:text-[1.345rem]"
        >
          {lang === 'ar'
            ? 'التصميم والبرمجة يجب ألا ينفصلا أبداً. يعمل فريقنا المتخصص ككتلة واحدة من أول رسم تخطيطي إلى آخر سطر برمجي لضمان تحويل زوارك إلى عملاء فعليين.'
            : 'Design and development should never feel disconnected. Our small, senior team works as one—from first sketch to final line of code.'}
        </p>

        <div className="relative mt-10 pt-6 sm:mt-12 sm:pt-7 lg:mt-12 lg:pt-8">
          <span
            data-reveal="line"
            style={delay(240)}
            className="absolute inset-x-0 top-0 h-[0.0791rem] bg-[#393939]"
          />
          <dl className="grid grid-cols-3 gap-4 pt-[0.0791rem] lg:gap-0">
            {stats.map((stat, i) => (
              <div key={stat.label} data-reveal="up" style={delay(200 + i * 120)} className="flex flex-col-reverse">
                <dt className="pt-[0.4747rem] font-dm text-[0.75rem] leading-[1.5] text-[#7f7f7f] lg:text-[0.7912rem]">
                  {stat.label}
                </dt>
                <dd className="whitespace-nowrap font-manrope text-[1.625rem] font-bold leading-[1.5] text-white lg:text-[1.9779rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
