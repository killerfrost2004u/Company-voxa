import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

interface ArticlesSectionProps {
  lang: 'en' | 'ar';
}

export default function ArticlesSection({ lang }: ArticlesSectionProps) {
  const articles = [
    {
      id: "ai-in-erp",
      title: lang === 'en' ? 'The Future of AI in Enterprise Resource Planning' : 'مستقبل الذكاء الاصطناعي في تخطيط الموارد (ERP)',
      category: lang === 'en' ? 'Artificial Intelligence' : 'الذكاء الاصطناعي',
      date: lang === 'en' ? 'Sep 12, 2026' : '١٢ سبتمبر ٢٠٢٦',
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "edge-computing-ecommerce",
      title: lang === 'en' ? 'Why Your E-Commerce Store Needs Edge Computing' : 'لماذا يحتاج متجرك الإلكتروني إلى الحوسبة الطرفية',
      category: lang === 'en' ? 'Web Architecture' : 'بنية الويب',
      date: lang === 'en' ? 'Aug 28, 2026' : '٢٨ أغسطس ٢٠٢٦',
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "automating-workflows-cto",
      title: lang === 'en' ? "Automating Workflows: A CTO's Guide to 2026" : 'أتمتة سير العمل: دليل المدير التقني لعام 2026',
      category: lang === 'en' ? 'Automation' : 'الأتمتة',
      date: lang === 'en' ? 'Aug 15, 2026' : '١٥ أغسطس ٢٠٢٦',
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    }
  ];

  return (
    <section id="articles" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                {lang === 'en' ? 'Insights & Articles' : 'مقالات ورؤى'}
              </h2>
              <p className="text-lg text-muted max-w-xl">
                {lang === 'en' 
                  ? 'Deep dives into software engineering, AI trends, and digital transformation.' 
                  : 'تحليلات متعمقة في هندسة البرمجيات، اتجاهات الذكاء الاصطناعي، والتحول الرقمي.'}
              </p>
            </div>
            <Link 
              href={`/${lang}/articles`}
              className="group flex items-center gap-2 text-foreground font-bold hover:text-accent transition-colors"
            >
              {lang === 'en' ? 'View all articles' : 'عرض جميع المقالات'}
              <ArrowUpRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${lang === 'ar' ? 'scale-x-[-1] group-hover:-translate-x-1 group-hover:-translate-y-1' : ''}`} />
            </Link>
          </div>
        </FadeIn>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <FadeIn key={article.id} direction="up" delay={idx * 0.1}>
              <Link 
                href={`/${lang}/articles/${article.id}`} 
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2rem] block h-full"
              >
                <Card className="flex flex-col p-0 overflow-hidden bg-surface/30 hover:bg-surface/60 transition-colors duration-500 border-white/5 h-full">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image 
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold border border-white/10 text-foreground">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <p className="text-xs text-muted font-medium mb-3">{article.date}</p>
                    <CardTitle className="text-xl md:text-2xl group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
