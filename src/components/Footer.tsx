import Link from "next/link";

export default function Footer({ lang = 'ar' }: { lang?: 'en' | 'ar' }) {
  const dict = {
    home: lang === 'en' ? 'Home' : 'الرئيسية',
    services: lang === 'en' ? 'Services' : 'الخدمات',
    work: lang === 'en' ? 'Work' : 'أعمالنا',
    articles: lang === 'en' ? 'Articles' : 'المقالات',
    about: lang === 'en' ? 'About' : 'من نحن',
    contact: lang === 'en' ? 'Contact' : 'تواصل معنا',
    brandStrategy: lang === 'en' ? 'Web Platforms' : 'منصات الويب',
    uiuxDesign: lang === 'en' ? 'Custom AI & ML' : 'الذكاء الاصطناعي',
    webDev: lang === 'en' ? 'Enterprise ERP' : 'أنظمة ERP',
    seo: lang === 'en' ? 'Workflow Automation' : 'أتمتة سير العمل',
    motionGraphics: lang === 'en' ? 'Data Analytics' : 'تحليل البيانات',
    featuredProjects: lang === 'en' ? 'Voxa ATS' : 'نظام التوظيف Voxa',
    caseStudies: lang === 'en' ? 'Skillup E-Learning' : 'منصة Skillup',
    process: lang === 'en' ? 'Smart Vision' : 'نظام الرؤية الذكي',
    insights: lang === 'en' ? 'Insights & Trends' : 'رؤى واتجاهات',
    news: lang === 'en' ? 'Industry News' : 'أخبار الصناعة',
    subscribeTitle: lang === 'en' ? 'Subscribe for Insights' : 'اشترك للحصول على أحدث الرؤى',
    subscribeBtn: lang === 'en' ? 'Subscribe' : 'اشترك',
    emailPlaceholder: lang === 'en' ? 'Email Address' : 'البريد الإلكتروني',
    buildGreat: lang === 'en' ? "Let's build something great" : 'دعنا نصنع شيئاً عظيماً',
    slogan: lang === 'en' ? 'Elevating Digital Experiences.' : 'نرتقي بالتجارب الرقمية.',
    rights: lang === 'en' ? `© ${new Date().getFullYear()} VOXA. ALL RIGHTS RESERVED.` : `© ${new Date().getFullYear()} VOXA. جميع الحقوق محفوظة.`,
  };

  return (
    <footer className="w-full bg-surface pt-16 pb-8 border-t border-white/5 relative z-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-16">
          
          {/* Brand Column (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href={`/${lang}`} className="block w-56 md:w-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              <img 
                src="/logos/CroppedLOGO.svg"
                alt="VOXA Logo" 
                className="w-full h-auto object-contain"
              />
            </Link>
            <p className="text-muted text-base leading-relaxed max-w-xs">{dict.slogan}</p>
            
            {/* CTA inside Brand Column */}
            <div className="mt-4">
              <Link 
                href={`/${lang}/contact`} 
                className="inline-flex items-center justify-center gap-3 bg-action-gradient text-white px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_20px_var(--color-action)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {dict.buildGreat}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={lang === 'ar' ? 'rotate-180' : ''}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Columns (Span 2 columns each) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-foreground font-semibold text-lg">{dict.services}</h4>
            <div className="flex flex-col gap-4 text-base">
              <Link href={`/${lang}/services#web-platforms`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.brandStrategy}</Link>
              <Link href={`/${lang}/services#custom-ai`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.uiuxDesign}</Link>
              <Link href={`/${lang}/services#erp-systems`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.webDev}</Link>
              <Link href={`/${lang}/services#workflow-automation`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.seo}</Link>
              <Link href={`/${lang}/services#data-intelligence`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.motionGraphics}</Link>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-foreground font-semibold text-lg">{dict.work}</h4>
            <div className="flex flex-col gap-4 text-base">
              <Link href={`/${lang}/work/voxa-ats`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.featuredProjects}</Link>
              <Link href={`/${lang}/work/skillup-elearning`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.caseStudies}</Link>
              <Link href={`/${lang}/work/smart-vision-system`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm w-fit">{dict.process}</Link>
            </div>
          </div>

          {/* Social Column (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="text-foreground font-semibold text-lg">
              {lang === 'en' ? 'Follow Us' : 'تابعنا'}
            </h4>
            
            <div className="flex items-center gap-4">
              {/* Social Icons */}
              <a href="https://www.facebook.com/profile.php?id=61574289903460" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/voxaeg?stkn=MW5jOG05eTZuNmFqOA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@voxaeg?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-medium">
            {dict.rights}
          </p>
        </div>

      </div>
    </footer>
  );
}
