import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

interface HomeServicesSectionProps {
  lang: 'en' | 'ar';
}

export default function HomeServicesSection({ lang }: HomeServicesSectionProps) {
  const services = [
    {
      title: lang === 'en' ? 'Applicant Tracking (Voxa)' : 'تتبع المتقدمين (Voxa)',
      description: lang === 'en' ? 'Multimodal AI recruitment pipeline powered by Gemini 2.5 Flash.' : 'مسار توظيف مدعوم بالذكاء الاصطناعي متعدد الوسائط (Gemini 2.5).',
      image: '/services/Voxa(ATS)design1.svg',
    },
    {
      title: lang === 'en' ? 'E-Learning (Skillup)' : 'التعليم الإلكتروني (Skillup)',
      description: lang === 'en' ? 'Privacy-first educational platforms with local LLM integration.' : 'منصات تعليمية تحترم الخصوصية بذكاء اصطناعي محلي.',
      image: '/services/Voxa(E-learning)design1.svg',
    },
    {
      title: lang === 'en' ? 'Web Security' : 'أمان الويب',
      description: lang === 'en' ? 'Protect your business with advanced threat prevention.' : 'احمِ عملك من خلال منع التهديدات المتقدمة.',
      image: '/services/Voxa(Security)design1.svg',
    },
    {
      title: lang === 'en' ? 'Stress Testing' : 'اختبار التحمل',
      description: lang === 'en' ? 'Ensure stability under massive user loads.' : 'ضمان الاستقرار تحت ضغط المستخدمين.',
      image: '/services/Voxa(Stress)design1.svg',
    },
    {
      title: lang === 'en' ? 'Sports Analysis' : 'تحليل الأداء الرياضي',
      description: lang === 'en' ? 'AI-driven insights for sports professionals.' : 'رؤى مدعومة بالذكاء الاصطناعي للمحترفين الرياضيين.',
      image: '/services/Voxa(TennisAnalyze)design1.svg',
    }
  ];

  const topServices = services.slice(0, 2);

  return (
    <section id="services" className="py-24 md:py-32 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
                {lang === 'en' ? 'Our Expertise' : 'خبراتنا المتخصصة'}
              </h2>
              <p className="text-lg text-muted">
                {lang === 'en' 
                  ? 'We deliver bespoke digital solutions engineered for growth and scale.' 
                  : 'نحن نقدم حلولاً رقمية مخصصة مصممة للنمو والتوسع.'}
              </p>
            </div>
            <Link href={`/${lang}/services`} className="flex items-center gap-2 text-accent hover:text-white transition-colors group font-semibold">
              {lang === 'en' ? 'View All Services' : 'عرض جميع الخدمات'}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:${lang === 'ar' ? '-translate-x-1' : 'translate-x-1'} rtl:rotate-180`} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {topServices.map((service, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.1}>
              <Card 
                className="group relative bg-surface/50 p-8 overflow-hidden hover:bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_var(--color-accent)] h-full rounded-[2rem]"
              >
                <div className="relative w-full aspect-video mb-8 bg-background/50 rounded-xl overflow-hidden flex items-center justify-center p-6 border border-white/5">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="mb-3">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
