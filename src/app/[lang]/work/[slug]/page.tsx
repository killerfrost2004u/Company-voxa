import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getProjects } from "../../../../../sanity/lib/api";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";

// Generate static params for all projects so they can be statically rendered
export async function generateStaticParams() {
  const projects = await getProjects();
  const paths: any[] = [];
  projects.forEach((project: any) => {
    paths.push({ lang: 'en', slug: project.slug });
    paths.push({ lang: 'ar', slug: project.slug });
  });
  return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar', slug: string }> }) {
  const resolvedParams = await params;
  const projects = await getProjects();
  const project = projects.find((p: any) => p.slug === resolvedParams.slug);
  if (!project) return { title: 'Not Found' };

  const excerpt = project.problem[resolvedParams.lang].substring(0, 150) + '...';

  return {
    title: `${project.title[resolvedParams.lang]} | Case Study`,
    description: excerpt,
    openGraph: {
      title: `${project.title[resolvedParams.lang]} | Case Study | VOXA`,
      description: excerpt,
      type: 'article',
      url: `https://voxa.dev/${resolvedParams.lang}/work/${resolvedParams.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title[resolvedParams.lang],
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title[resolvedParams.lang]} | Case Study | VOXA`,
      description: excerpt,
      images: [project.image],
    }
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ lang: 'en' | 'ar', slug: string }> }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  const projects = await getProjects();
  
  const project = projects.find((p: any) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  return (
    <main className="relative flex flex-col min-h-screen bg-background">
      <Navbar lang={lang} />
      
      {/* Back Button & Top Spacing */}
      <div className="pt-32 md:pt-40 container mx-auto max-w-5xl px-4 relative z-10">
        <Link 
          href={`/${lang}/work`}
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors group mb-8 md:mb-12 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1 -ml-2"
        >
          {lang === 'en' ? (
            <><ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Work</>
          ) : (
            <><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> العودة إلى الأعمال</>
          )}
        </Link>
        
        {/* Header Section */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold tracking-wide">
            {project.category[lang]}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-gradient">
            {project.title[lang]}
          </h1>
        </div>
      </div>

      {/* Featured Image */}
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16 relative z-10">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] bg-surface border border-white/5 shadow-2xl overflow-hidden flex items-center justify-center p-8 md:p-16">
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-50" />
          <Image 
            src={project.image} 
            alt={project.title[lang]}
            fill
            className="object-contain p-8 md:p-16 z-10 drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Content Body */}
      <section className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        
        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-accent">
              {lang === 'en' ? 'The Problem' : 'المشكلة'}
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {project.problem[lang]}
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {lang === 'en' ? 'The Solution' : 'الحل المبتكر'}
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {project.solution[lang]}
            </p>
          </div>
        </div>

        {/* Technical Deep Dive */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            {lang === 'en' ? 'Technical Deep Dive' : 'العمق التقني'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(project.features || []).map((feature: any, i: number) => (
              <Card key={i} className="p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <h3 className="text-xl font-bold text-foreground">{feature.title[lang]}</h3>
                </div>
                <p className="text-muted leading-relaxed pl-9">
                  {feature.description[lang]}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Business Value Highlight */}
        <div className="relative rounded-[3rem] bg-action-gradient p-10 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/bg-elements.svg')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {lang === 'en' ? 'Business Value' : 'القيمة للأعمال'}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
              "{project.businessValue[lang]}"
            </p>
          </div>
        </div>

      </section>

      <PreFooterCTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
