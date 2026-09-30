import Link from "next/link";


export default function Footer({ lang = 'ar' }: { lang?: 'en' | 'ar' }) {
  const dict = {
    home: lang === 'en' ? 'Home' : 'الرئيسية',
    services: lang === 'en' ? 'Services' : 'خدماتنا',
    work: lang === 'en' ? 'Work' : 'أعمالنا',
    articles: lang === 'en' ? 'Articles' : 'مقالات',
  };

  return (
    <footer className="pb-8 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Mockup Floating Pill Footer */}
        <div className="w-full rounded-full bg-surface/60 backdrop-blur-xl border border-white/10 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          
          <div className="text-muted text-[13px] font-medium tracking-wide">
            VOXA DIGITAL © {new Date().getFullYear()}
          </div>

          <div className="flex items-center gap-6 text-[14px] font-medium">
            <Link href={`/${lang}`} className="text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1">{dict.home}</Link>
            <Link href={`/${lang}/services`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1">{dict.services}</Link>
            <Link href={`/${lang}/articles`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1">{dict.articles}</Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61574289903460" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/voxaeg?stkn=MW5jOG05eTZuNmFqOA==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@voxaeg?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-background text-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
