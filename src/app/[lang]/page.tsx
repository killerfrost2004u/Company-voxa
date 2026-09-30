import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import MidPageCTA from "@/components/MidPageCTA";
import PreFooterCTA from "@/components/PreFooterCTA";
import ArticlesSection from "@/components/ArticlesSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'ar';
  
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar lang={lang} />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-start min-h-screen pt-32 md:pt-48 pb-12 px-4 overflow-hidden">
        {/* Huge Heading */}
        <div className="container relative z-10 flex flex-col items-center text-center w-full px-2 sm:px-4 mb-10 md:mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[1.1] md:leading-none animate-fade-in-up text-gradient max-w-[100vw] overflow-hidden px-2">
            {lang === 'en' ? 'Build the Future.' : 'اصنع المستقبل.'}
          </h1>
          
          {/* Hero CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Link 
              href={`/${lang}/contact`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-action-gradient text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_var(--color-action)] hover:scale-[1.02] transition-all duration-300"
            >
              {lang === 'en' ? 'Start Your Project' : 'ابدأ مشروعك الآن'}
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </Link>
            
            <Link 
              href={`/${lang}/work`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface border border-white/10 text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all duration-300"
            >
              {lang === 'en' ? 'View Our Work' : 'تصفح أعمالنا'}
            </Link>
          </div>
        </div>

        {/* Hero Visual Area */}
        <div className="relative w-full max-w-6xl mx-auto flex justify-center mt-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {/* Background rounded shape (using secondary color instead of olive green) */}
          <div className="absolute top-24 left-4 right-4 md:left-12 md:right-12 bottom-0 bg-surface border border-accent/20 rounded-[3rem] md:rounded-[4rem] z-0 -mx-4 md:mx-0 shadow-[0_0_50px_rgba(30,117,148,0.2)]" />
          
          {/* Main tablet/mockup container */}
          <div className="relative z-10 w-[95%] md:w-[85%] aspect-[3/4] sm:aspect-square md:aspect-video bg-background border border-accent/30 rounded-t-3xl md:rounded-t-[3rem] p-2 md:p-6 shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Inner screen content */}
            <div className="relative w-full h-full bg-surface-hover rounded-2xl md:rounded-[2rem] border border-white/5 overflow-hidden flex flex-col items-start justify-end p-4 md:p-12">
              
              {/* Fake UI Header inside mockup */}
              <div className="absolute top-4 md:top-10 start-4 md:start-10 flex items-center text-muted font-medium text-xs sm:text-sm">
                <span>{lang === 'en' ? 'Operations > System Health' : 'العمليات > حالة النظام'}</span>
              </div>

              {/* Chart Overlay Content */}
              <div className="w-full flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4 md:pb-6 mb-4 md:mb-6 gap-2 md:gap-4 z-10">
                <div>
                  <h2 className="text-4xl sm:text-5xl md:text-8xl font-light text-foreground tracking-tight">99.9%</h2>
                  <p className="text-lg sm:text-xl md:text-3xl text-foreground font-serif opacity-90 mt-1 md:mt-2">
                    {lang === 'en' ? 'System Uptime' : 'وقت تشغيل النظام'}
                  </p>
                </div>
                <div className="w-full md:w-auto mt-2 md:mt-0 flex">
                  <div className="w-full md:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-foreground text-xs sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-white/10 transition">
                    <span className="whitespace-nowrap">{lang === 'en' ? 'Active Deployments (33)' : 'المنصات النشطة (33)'}</span>
                    <span className="text-[10px]">▼</span>
                  </div>
                </div>
              </div>

              {/* Abstract Chart Graphic (using Voxa cyan/blue) */}
              <div className="w-full h-24 sm:h-48 md:h-64 relative flex items-end justify-between px-1 md:px-8 z-10">
                {/* Simulated bar/line chart points */}
                {[20, 35, 15, 50, 40, 75, 60].map((height, i) => (
                  <div key={i} className="relative flex flex-col items-center group w-1/12 h-full justify-end">
                    <div 
                      className="w-0.5 bg-accent/30 absolute bottom-0 rounded-t-full transition-all duration-700 ease-out group-hover:bg-accent" 
                      style={{ height: `${height}%` }}
                    />
                    <div 
                      className="w-3 h-3 md:w-4 md:h-4 bg-foreground rounded-sm absolute shadow-[0_0_10px_var(--color-accent)] z-10 transition-transform group-hover:scale-125"
                      style={{ bottom: `calc(${height}% - 8px)` }}
                    />
                  </div>
                ))}
                
                {/* Year Labels */}
                <div className="absolute bottom-0 w-full flex justify-between text-muted/50 text-xs md:text-sm font-medium px-4 pb-2">
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                </div>
              </div>
              
              {/* Background Glow for Mockup */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 mix-blend-screen" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] -z-10 mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      <HomeServicesSection lang={lang} />
      <FeaturesSection lang={lang} />
      
      {/* New Mid-Page CTA */}
      <MidPageCTA lang={lang} />

      <PricingSection lang={lang} />

      {/* Articles / Insights */}
      <ArticlesSection lang={lang} />

      {/* New Pre-Footer CTA */}
      <PreFooterCTA lang={lang} />

      <Footer lang={lang} />
    </main>
  );
}
