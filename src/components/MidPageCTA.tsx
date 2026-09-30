import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

export default function MidPageCTA({ lang }: { lang: 'en' | 'ar' }) {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-accent/10 rounded-full blur-[100px] -z-10" />

      <div className="container max-w-5xl mx-auto">
        <FadeIn direction="up">
          <Card className="rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden bg-surface/50">
            
            {/* Subtle inner glow */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10" />

            <div className="flex-1 text-center md:text-start z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                {lang === 'en' 
                  ? 'Ready to scale your operations with Custom AI & Automations?' 
                  : 'مستعد لتوسيع نطاق أعمالك باستخدام الذكاء الاصطناعي والأتمتة المخصصة؟'}
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto md:mx-0">
                {lang === 'en'
                  ? "Let's analyze your current workflow and build a system that saves you thousands of hours."
                  : "دعنا نحلل سير عملك الحالي ونبني نظاماً يوفر لك آلاف الساعات."}
              </p>
            </div>

            <div className="z-10 flex-shrink-0">
              <Link 
                href={`/${lang}/contact`}
                className="group flex items-center justify-center gap-3 bg-action-gradient text-white px-8 py-5 rounded-full font-bold text-lg hover:shadow-[0_0_40px_var(--color-action)] hover:scale-[1.02] transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {lang === 'en' ? 'Get a Free Estimate' : 'احصل على تسعير مجاني'}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
            </div>

          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
