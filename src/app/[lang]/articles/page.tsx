import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArticles } from "../../../../sanity/lib/api";
import { Card } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  return {
    title: resolvedParams.lang === 'en' ? 'Articles & Insights | VOXA' : 'المقالات والرؤى | VOXA',
    description: resolvedParams.lang === 'en' ? 'Deep dives into software engineering, AI trends, and digital transformation.' : 'تحليلات متعمقة في هندسة البرمجيات، اتجاهات الذكاء الاصطناعي، والتحول الرقمي.',
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const articles = await getArticles();

  return (
    <main className="relative flex flex-col min-h-screen bg-background">
      <Navbar lang={lang} />
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-accent/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <section className="pt-32 md:pt-48 pb-12 px-4 relative overflow-hidden">
        <FadeIn direction="up">
          <div className="container mx-auto max-w-7xl relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gradient">
              {lang === 'en' ? 'Articles & Insights.' : 'مقالات ورؤى.'}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
              {lang === 'en' 
                ? 'Our thoughts, tutorials, and deep dives into building the future of the digital world.' 
                : 'أفكارنا ودروسنا وتحليلاتنا حول بناء مستقبل العالم الرقمي.'}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-24 px-4 flex-grow">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any, idx: number) => (
              <FadeIn key={article.id} direction="up" delay={idx * 0.1}>
                <Link 
                  href={`/${lang}/articles/${article.id}`}
                  className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2rem] block h-full"
                >
                  <Card className="flex flex-col h-full overflow-hidden p-0 bg-surface/30 group-hover:bg-surface/60 group-hover:border-accent/50 transition-colors duration-500 rounded-[2rem]">
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image 
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold border border-white/10 text-foreground">
                        {article.category[lang]}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <p className="text-xs text-muted font-medium mb-3">{article.date[lang]}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-4">
                        {article.title[lang]}
                      </h3>
                      <p className="text-muted line-clamp-3 mb-8 flex-grow">
                        {article.excerpt[lang]}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 text-foreground font-bold group-hover:text-accent transition-colors mt-auto">
                        {lang === 'en' ? 'Read Article' : 'اقرأ المقال'}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:${lang === 'ar' ? '-translate-x-1' : 'translate-x-1'} rtl:rotate-180`} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
