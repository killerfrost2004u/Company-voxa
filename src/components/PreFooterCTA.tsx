import Link from "next/link";
import { Send } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function PreFooterCTA({ lang }: { lang: 'en' | 'ar' }) {
  return (
    <section className="py-24 px-4 relative overflow-hidden mt-12 border-t border-white/5">
      {/* Centered Intense Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <FadeIn direction="up">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight text-gradient">
            {lang === 'en' 
              ? "Let's Build Something Extraordinary Together." 
              : "دعنا نبني شيئاً استثنائياً معاً."}
          </h2>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <p className="text-xl md:text-2xl text-muted mb-12 max-w-2xl">
            {lang === 'en'
              ? "Don't settle for off-the-shelf templates. Partner with VOXA to engineer custom digital solutions that dominate your market."
              : "لا تكتفِ بالقوالب الجاهزة. تعاون مع VOXA لبناء حلول رقمية مخصصة تتصدر بها سوقك."}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <Link 
            href={`/${lang}/contact`}
            className="group flex items-center justify-center gap-3 bg-action-gradient text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_50px_var(--color-action)] hover:scale-[1.05] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {lang === 'en' ? 'Talk to our Engineers' : 'تحدث مع مهندسينا'}
            <Send className={`w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${lang === 'ar' ? 'scale-x-[-1] group-hover:-translate-x-1 group-hover:-translate-y-1' : ''}`} />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
