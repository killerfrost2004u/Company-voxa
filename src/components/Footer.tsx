import Link from "next/link";
import Image from "next/image";

export default function Footer({ lang = 'ar' }: { lang?: 'en' | 'ar' }) {
  const dict = {
    home: lang === 'en' ? 'Home' : 'الرئيسية',
    services: lang === 'en' ? 'Services' : 'الخدمات',
    work: lang === 'en' ? 'Work' : 'أعمالنا',
    articles: lang === 'en' ? 'Articles' : 'المقالات',
    about: lang === 'en' ? 'About' : 'من نحن',
    contact: lang === 'en' ? 'Contact' : 'تواصل معنا',
    brandStrategy: lang === 'en' ? 'Brand Strategy' : 'استراتيجية العلامة التجارية',
    uiuxDesign: lang === 'en' ? 'UI/UX Design' : 'تصميم واجهة المستخدم',
    webDev: lang === 'en' ? 'Web Development' : 'تطوير الويب',
    seo: lang === 'en' ? 'SEO' : 'تحسين محركات البحث',
    motionGraphics: lang === 'en' ? 'Motion Graphics' : 'موشن جرافيك',
    featuredProjects: lang === 'en' ? 'Featured Projects' : 'مشاريع مميزة',
    caseStudies: lang === 'en' ? 'Client Case Studies' : 'دراسات حالة العملاء',
    process: lang === 'en' ? 'Our Process' : 'منهجية العمل',
    insights: lang === 'en' ? 'Insights & Trends' : 'رؤى واتجاهات',
    news: lang === 'en' ? 'Industry News' : 'أخبار الصناعة',
    subscribeTitle: lang === 'en' ? 'SUBSCRIBE FOR INSIGHTS' : 'اشترك للحصول على أحدث الرؤى',
    subscribeBtn: lang === 'en' ? 'SUBSCRIBE' : 'اشترك',
    emailPlaceholder: lang === 'en' ? 'Email' : 'البريد الإلكتروني',
    buildGreat: lang === 'en' ? "LET'S BUILD SOMETHING GREAT" : 'دعنا نصنع شيئاً عظيماً',
    slogan: lang === 'en' ? 'Elevating Digital Experiences.' : 'نرتقي بالتجارب الرقمية.',
    rights: lang === 'en' ? '© 2024 VOXA AGENCY. ALL RIGHTS RESERVED.' : '© 2024 وكالة فوكسا. جميع الحقوق محفوظة.',
  };

  return (
    <footer className="pb-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full rounded-[2rem] bg-surface/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col gap-12">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Brand Column */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <Link href={`/${lang}`} className="block w-28">
                <Image src="/assets/svgs/voxa_logo.svg" alt="VOXA Logo" width={112} height={40} className="w-full h-auto" />
              </Link>
              <p className="text-muted text-sm mt-2 max-w-xs">{dict.slogan}</p>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="text-foreground font-bold tracking-wider text-sm uppercase">{dict.services}</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <Link href={`/${lang}/services`} className="text-muted hover:text-accent transition-colors">{dict.brandStrategy}</Link>
                  <Link href={`/${lang}/services`} className="text-muted hover:text-accent transition-colors">{dict.uiuxDesign}</Link>
                  <Link href={`/${lang}/services`} className="text-muted hover:text-accent transition-colors">{dict.webDev}</Link>
                  <Link href={`/${lang}/services`} className="text-muted hover:text-accent transition-colors">{dict.seo}</Link>
                  <Link href={`/${lang}/services`} className="text-muted hover:text-accent transition-colors">{dict.motionGraphics}</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-foreground font-bold tracking-wider text-sm uppercase">{dict.work}</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <Link href={`/${lang}/work`} className="text-accent hover:text-accent-secondary transition-colors">{dict.featuredProjects}</Link>
                  <Link href={`/${lang}/work`} className="text-muted hover:text-accent transition-colors">{dict.caseStudies}</Link>
                  <Link href={`/${lang}/work`} className="text-muted hover:text-accent transition-colors">{dict.process}</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-foreground font-bold tracking-wider text-sm uppercase">{dict.articles}</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <Link href={`/${lang}/articles`} className="text-muted hover:text-accent transition-colors">{dict.insights}</Link>
                  <Link href={`/${lang}/articles`} className="text-muted hover:text-accent transition-colors">{dict.news}</Link>
                </div>
              </div>
            </div>

            {/* Subscribe & CTA Column */}
            <div className="lg:col-span-2 flex flex-col gap-8 lg:items-end">
              <div className="w-full max-w-sm flex flex-col gap-4">
                <h4 className="text-foreground font-bold tracking-wider text-sm uppercase">{dict.subscribeTitle}</h4>
                <div className="flex gap-2 w-full">
                  <input 
                    type="email" 
                    placeholder={dict.emailPlaceholder}
                    className="flex-1 bg-background/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                  <button type="button" className="bg-action hover:bg-action-dark text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(255,107,107,0.3)] hover:shadow-[0_0_20px_rgba(255,107,107,0.5)]">
                    {dict.subscribeBtn}
                  </button>
                </div>
              </div>
              
              <Link href={`/${lang}/contact`} className="group w-full max-w-sm mt-auto relative overflow-hidden rounded-xl bg-cyan-gradient p-[2px] transition-transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-cyan-gradient blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-surface rounded-[10px] px-6 py-4 flex items-center justify-between z-10 group-hover:bg-surface/80 transition-colors">
                  <span className="text-accent font-bold text-lg md:text-xl">{dict.buildGreat}</span>
                  <span className="bg-background rounded-full p-2 text-accent group-hover:rotate-45 transition-transform duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="19" x2="19" y2="5"></line>
                      <polyline points="10 5 19 5 19 14"></polyline>
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
            
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-muted text-xs md:text-sm font-medium tracking-wide">
              {dict.rights}
            </div>

            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61574289903460" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/voxaeg?stkn=MW5jOG05eTZuNmFqOA==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@voxaeg?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
