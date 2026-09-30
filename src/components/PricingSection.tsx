import { Check } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

interface PricingSectionProps {
  lang: 'en' | 'ar';
}

export default function PricingSection({ lang }: PricingSectionProps) {
  const plans = [
    {
      name: lang === 'en' ? 'Starter' : 'البداية',
      price: lang === 'en' ? '7,000 EGP' : '٧٠٠٠ ج.م',
      description: lang === 'en' ? 'Perfect for small businesses establishing their digital presence.' : 'مثالي للشركات الصغيرة لتأسيس وجودها الرقمي.',
      features: lang === 'en' 
        ? ['Custom Landing Page', 'Mobile Responsive', 'Basic SEO', '1 Month Support'] 
        : ['صفحة هبوط مخصصة', 'متوافق مع الهواتف', 'تحسين أساسي لمحركات البحث', 'دعم فني لشهر واحد'],
      highlighted: false,
    },
    {
      name: lang === 'en' ? 'Company Profile' : 'ملف الشركة',
      price: lang === 'en' ? '12,000+ EGP' : '١٢,٠٠٠+ ج.م',
      description: lang === 'en' ? 'Comprehensive digital solution for growing brands and agencies.' : 'حل رقمي شامل للعلامات التجارية المتنامية والوكالات.',
      features: lang === 'en' 
        ? ['Multi-page Web Application', 'Custom Dashboard', 'Advanced SEO & Analytics', 'CMS Integration', '3 Months Support']
        : ['تطبيق ويب متعدد الصفحات', 'لوحة تحكم مخصصة', 'تحليل وتحسين متقدم', 'ربط بنظام إدارة المحتوى (CMS)', 'دعم فني لـ 3 أشهر'],
      highlighted: true,
    },
    {
      name: lang === 'en' ? 'E-Commerce & Automation' : 'التجارة الإلكترونية والأتمتة',
      price: lang === 'en' ? '25,000+ EGP' : '٢٥,٠٠٠+ ج.م',
      description: lang === 'en' ? 'Enterprise-grade scalable systems for massive growth.' : 'أنظمة متطورة وقابلة للتوسع تناسب المؤسسات الكبرى.',
      features: lang === 'en' 
        ? ['Full E-Commerce Platform', 'Payment Gateway Integration', 'Automated Workflows', 'API Integrations', '6 Months Priority Support']
        : ['منصة تجارة إلكترونية متكاملة', 'ربط بوابات الدفع', 'أتمتة سير العمل', 'ربط واجهات برمجة التطبيقات (API)', 'دعم فني ذو أولوية لـ 6 أشهر'],
      highlighted: false,
    },
    {
      name: lang === 'en' ? 'Enterprise AI & ERP' : 'الذكاء الاصطناعي و ERP',
      price: lang === 'en' ? 'Custom Quote' : 'تسعير مخصص',
      description: lang === 'en' ? 'Bespoke digital transformation for large-scale operations.' : 'تحول رقمي مخصص للعمليات واسعة النطاق.',
      features: lang === 'en'
        ? ['Custom AI/ML Models', 'Bespoke ERP Architecture', 'Advanced Computer Vision', 'Dedicated Cloud Infrastructure', '24/7 Enterprise Support']
        : ['نماذج ذكاء اصطناعي مخصصة', 'بناء أنظمة ERP مخصصة', 'رؤية حاسوبية متقدمة', 'بنية تحتية سحابية مخصصة', 'دعم فني للمؤسسات 24/7'],
      highlighted: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 px-4 relative">
      <div className="absolute inset-0 bg-background/50 -z-10" />
      <div className="container mx-auto max-w-7xl">
        <FadeIn direction="up">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {lang === 'en' ? 'Transparent Pricing' : 'باقات شفافة'}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              {lang === 'en' 
                ? 'Choose a plan that scales with your ambition. No hidden fees.' 
                : 'اختر الباقة التي تناسب طموحاتك. بدون رسوم خفية.'}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full mx-auto">
          {plans.map((plan, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1} className="flex h-full">
              <Card 
                className={`p-6 flex flex-col w-full relative overflow-hidden transition-transform duration-300 ${
                  plan.highlighted 
                    ? 'bg-surface border-2 border-action shadow-[0_0_40px_rgba(255,107,107,0.2)] md:scale-105 z-10' 
                    : 'bg-surface/50 border border-white/5 md:mt-4 md:mb-4'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 bg-action-gradient text-white px-6 py-1.5 rounded-bl-2xl font-bold text-sm">
                    {lang === 'en' ? 'Most Popular' : 'الأكثر طلباً'}
                  </div>
                )}
                
                <CardHeader className="p-0 mb-6 flex-none">
                  <CardTitle className="mb-2 min-h-[32px] flex items-end">{plan.name}</CardTitle>
                  <CardDescription className="text-sm min-h-[60px] flex items-start">{plan.description}</CardDescription>
                </CardHeader>
                
                <div className="mb-8 flex-none flex items-center h-[40px]">
                  <span className="text-2xl lg:text-3xl xl:text-4xl font-black">{plan.price}</span>
                </div>
                
                <ul className="flex-1 space-y-4 mb-10 flex flex-col justify-start">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-foreground text-sm leading-tight pt-1">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/${lang}/contact`}
                  className={`flex-none w-full py-4 rounded-full font-bold flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    plan.highlighted 
                      ? 'bg-action-gradient text-white hover:shadow-[0_0_40px_var(--color-action)] focus-visible:ring-action' 
                      : 'bg-white/5 text-foreground hover:bg-white/10 focus-visible:ring-accent'
                  }`}
                >
                  {lang === 'en' ? 'Get Started' : 'ابدأ الآن'}
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
