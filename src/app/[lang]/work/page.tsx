import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { getProjects } from "../../../../sanity/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  return {
    title: resolvedParams.lang === 'en' ? 'Selected Work | VOXA' : 'أعمالنا المختارة | VOXA',
    description: resolvedParams.lang === 'en' ? 'Explore our cutting-edge AI and Digital Solutions portfolio.' : 'اكتشف محفظة مشاريعنا في مجال الذكاء الاصطناعي والحلول الرقمية.',
  };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const projects = await getProjects();

  return (
    <main className="relative flex flex-col min-h-screen bg-background">
      <Navbar lang={lang} />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 mix-blend-screen" />
        <FadeIn direction="up">
          <div className="container mx-auto max-w-7xl relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gradient">
              {lang === 'en' ? 'Selected Work.' : 'أعمالنا المختارة.'}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
              {lang === 'en' 
                ? 'A curated showcase of our most advanced digital solutions, AI models, and enterprise platforms.' 
                : 'عرض منسق لأحدث الحلول الرقمية ونماذج الذكاء الاصطناعي ومنصات المؤسسات التي قمنا ببنائها.'}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl space-y-24">
          {projects.map((project: any, idx: number) => (
            <FadeIn key={project.slug} direction="up" delay={0.1}>
              <div className={`flex flex-col gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                
                {/* Image Container */}
                <div className="w-full lg:w-1/2">
                  <Link href={`/${lang}/work/${project.slug}`} className="block relative w-full aspect-[4/3] rounded-[2rem] bg-surface/50 border border-white/5 overflow-hidden group flex items-center justify-center p-8 hover:bg-surface transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <Image 
                      src={project.image} 
                      alt={project.title[lang]}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-2">
                    {project.category[lang]}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    <Link href={`/${lang}/work/${project.slug}`} className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                      {project.title[lang]}
                    </Link>
                  </h2>
                  <p className="text-lg text-muted leading-relaxed">
                    {project.problem[lang]}
                  </p>
                  
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                     {(project.features || []).slice(0, 2).map((feat: any, i: number) => (
                       <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                         <h4 className="font-bold text-foreground mb-1">{feat.title[lang]}</h4>
                       </div>
                     ))}
                  </div>

                  <div className="pt-8">
                    {/* Later we can link this to /work/[slug] */}
                    <Link 
                      href={`/${lang}/work/${project.slug}`} 
                      className="inline-flex items-center gap-2 text-foreground font-bold hover:text-accent transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1 -ml-2"
                    >
                      {lang === 'en' ? 'View Case Study' : 'عرض دراسة الحالة'}
                      <ArrowRight className={`w-5 h-5 transition-transform group-hover:${lang === 'ar' ? '-translate-x-1' : 'translate-x-1'} rtl:rotate-180`} />
                    </Link>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <PreFooterCTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
