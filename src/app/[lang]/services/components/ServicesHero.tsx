import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServicesHeroProps {
  dict: {
    title_prefix: string;
    title_highlight: string;
    description: string;
    cta: string;
    image_alt: string;
  };
}

export default function ServicesHero({ dict }: ServicesHeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen pt-32 md:pt-48 pb-12 px-4 overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] -z-10 mix-blend-screen" />

      {/* Huge Heading */}
      <div className="container relative z-10 flex flex-col items-center text-center w-full px-4 mb-12 md:mb-16">
        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-none animate-fade-in-up">
          {dict.title_prefix} <br className="hidden md:block" />
          <span className="text-accent">{dict.title_highlight}</span>
        </h1>
        
        <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-3xl font-medium animate-fade-in-up animate-delay-100">
          {dict.description}
        </p>

        <div className="mt-12 animate-fade-in-up animate-delay-200">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-background px-10 py-5 rounded-full font-bold hover:shadow-[0_0_30px_var(--color-accent)] transition-all duration-300 group"
          >
            {dict.cta}
            <ArrowRight className="w-5 h-5 transition-transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
