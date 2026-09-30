import { PortableText } from '@portabletext/react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getArticles } from "../../../../../sanity/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar', slug: string }> }) {
  const resolvedParams = await params;
  const articles = await getArticles();
  const article = articles.find((a: any) => a.id === resolvedParams.slug);
  if (!article) return { title: 'Not Found' };

  return {
    title: `${article.title[resolvedParams.lang]}`,
    description: article.excerpt[resolvedParams.lang],
    openGraph: {
      title: article.title[resolvedParams.lang],
      description: article.excerpt[resolvedParams.lang],
      type: 'article',
      url: `https://voxa.dev/${resolvedParams.lang}/articles/${resolvedParams.slug}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title[resolvedParams.lang],
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title[resolvedParams.lang],
      description: article.excerpt[resolvedParams.lang],
      images: [article.image],
    }
  };
}

export default async function ArticleReaderPage({ params }: { params: Promise<{ lang: 'en' | 'ar', slug: string }> }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  const articles = await getArticles();
  
  const article = articles.find((a: any) => a.id === slug);
  if (!article) {
    notFound();
  }

  return (
    <main className="relative flex flex-col min-h-screen bg-background">
      <Navbar lang={lang} />
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-accent/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />

      <article className="pt-32 md:pt-48 pb-12 px-4 container mx-auto max-w-4xl relative z-10 flex-grow">
        
        {/* Back Link */}
        <Link 
          href={`/${lang}/articles`}
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors group mb-8 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1 -ml-2"
        >
          {lang === 'en' ? (
            <><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles</>
          ) : (
            <><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> العودة للمقالات</>
          )}
        </Link>

        {/* Article Header */}
        <header className="mb-12 text-center md:text-start">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-accent">
              {article.category[lang]}
            </span>
            <span className="text-sm font-medium text-muted">
              {article.date[lang]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gradient leading-tight mb-8">
            {article.title[lang]}
          </h1>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden mb-16 shadow-2xl border border-white/5">
          <Image 
            src={article.image}
            alt={article.title[lang]}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-p:leading-relaxed prose-p:text-muted">
          {typeof article.content[lang] === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: article.content[lang] }} />
          ) : (
            <PortableText value={article.content[lang]} />
          )}
        </div>

      </article>

      <PreFooterCTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
