import { useCallback, useState, useEffect } from 'react'
import { Contact } from '@/components/Contact'
import { Cta } from '@/components/Cta'
import { FAQ } from '@/components/FAQ'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PageScrollSlider } from '@/components/PageScrollSlider'
import { Preloader } from '@/components/Preloader'
import { Pricing } from '@/components/Pricing'
import { Services } from '@/components/Services'
import { Testimonial } from '@/components/Testimonial'
import { WhyVoxa } from '@/components/WhyVoxa'
import { BlogList } from '@/components/blog/BlogList'
import { BlogPostView } from '@/components/blog/BlogPost'
import { BlogAdmin } from '@/components/blog/BlogAdmin'
import { useScrollEffects } from '@/hooks/useScrollEffects'
import { assets } from '@/lib/assets'
import { useRouter } from '@/lib/router'

/**
 * The two oversized line-wave textures (14% opacity) laid over the middle of the page in the
 * Figma frame, anchored to the 1280px content column so they line up on wider screens too.
 */
function WaveBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-y-0 left-1/2 w-full max-w-[80rem] -translate-x-1/2">
        <img
          src={assets.waves}
          alt=""
          className="absolute left-[-10rem] top-[18rem] h-[70rem] w-[70rem] max-w-none animate-drift-slow opacity-14 lg:left-[-2.1875rem] lg:top-[14.4606rem] lg:h-[148.9375rem] lg:w-[149.3125rem]"
        />
        <img
          src={assets.waves}
          alt=""
          className="absolute left-[-42rem] top-[75rem] h-[70rem] w-[70rem] max-w-none animate-drift-slow opacity-14 [animation-delay:-20s] lg:left-[-89.875rem] lg:top-[61.3981rem] lg:h-[138.5625rem] lg:w-[138.8125rem]"
        />
      </div>
    </div>
  )
}

export default function App() {
  const { route } = useRouter()
  const [planRequest, setPlanRequest] = useState<{ plan: string; id: number } | null>(null)
  const [preloadKey] = useState(0)

  // Only run initial preloader on homepage
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window === 'undefined') return true
    if (window.location.pathname !== '/' && window.location.pathname !== '') return true
    return sessionStorage.getItem('voxa_preloaded') === 'true'
  })

  // Whenever route changes to home, handle hash if present
  useEffect(() => {
    if (route.type === 'home' && window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [route])

  const onChoosePlan = useCallback((plan: string) => setPlanRequest({ plan, id: Date.now() }), [])
  const handlePreloadComplete = useCallback(() => setIsLoaded(true), [])

  useScrollEffects(isLoaded)

  return (
    <>
      {route.type === 'home' && (
        <Preloader key={preloadKey} onComplete={handlePreloadComplete} />
      )}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-voxa focus:px-4 focus:py-2 focus:font-manrope focus:font-bold focus:text-ash"
      >
        Skip to content
      </a>

      <Header isLoaded={isLoaded} />

      <main id="main" className="overflow-x-clip">
        {route.type === 'home' && (
          <>
            <Hero />
            <Services />
            <div className="relative">
              <WaveBackdrop />
              <WhyVoxa />
              <Pricing onChoosePlan={onChoosePlan} />
              <FAQ />
              <Testimonial />
              <Contact planRequest={planRequest} />
            </div>
            <Cta />
          </>
        )}

        {route.type === 'blog' && <BlogList />}

        {route.type === 'post' && <BlogPostView slug={route.slug || ''} />}

        {route.type === 'admin' && <BlogAdmin />}
      </main>

      <Footer />
      <FloatingWhatsApp />
      {route.type === 'home' && <PageScrollSlider />}
    </>
  )
}
