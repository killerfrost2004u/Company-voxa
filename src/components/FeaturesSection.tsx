import { Brain, Zap, Server, ShieldCheck, Database, Network } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

interface FeaturesSectionProps {
  lang: 'en' | 'ar';
}

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
  const features = [
    {
      icon: <Server className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'High-Performance Infrastructure' : 'بنية تحتية عالية الأداء',
      description: lang === 'en' 
        ? 'We engineer highly scalable, fault-tolerant architectures using Next.js, Turbopack, and edge computing to ensure sub-second response times under massive loads.'
        : 'نحن نصمم بنى تحتية عالية التوسع ومقاومة للأعطال باستخدام الحوسبة الطرفية لضمان أوقات استجابة فائقة السرعة تحت أحمال ضخمة.',
    },
    {
      icon: <Database className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Enterprise ERP Systems' : 'أنظمة تخطيط موارد المؤسسات',
      description: lang === 'en'
        ? 'Bespoke, data-intensive ERP solutions that unify your operations. Built with secure, distributed databases and real-time synchronization.'
        : 'حلول ERP مخصصة ومكثفة البيانات توحد عملياتك. مبنية بقواعد بيانات موزعة وآمنة مع مزامنة في الوقت الفعلي.',
    },
    {
      icon: <Brain className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Custom Machine Learning' : 'تعلم الآلة المخصص',
      description: lang === 'en'
        ? 'From proprietary Computer Vision models to fine-tuned LLMs, we deploy AI architectures that extract actionable intelligence from raw data.'
        : 'من نماذج الرؤية الحاسوبية الخاصة إلى النماذج اللغوية الكبيرة، ننشر بنى ذكاء اصطناعي تستخرج ذكاءً قابلاً للتنفيذ من البيانات الخام.',
    },
    {
      icon: <Network className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Autonomous Workflows' : 'مسارات العمل المستقلة',
      description: lang === 'en'
        ? 'Replacing manual operational bottlenecks with intelligent, self-healing automation pipelines and agentic AI systems.'
        : 'استبدال الاختناقات التشغيلية اليدوية بمسارات أتمتة ذكية وأنظمة ذكاء اصطناعي ذاتية المعالجة.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Zero-Trust Security' : 'أمان انعدام الثقة (Zero-Trust)',
      description: lang === 'en'
        ? 'Implementing rigorous security protocols, end-to-end encryption, and robust compliance measures to protect mission-critical data.'
        : 'تنفيذ بروتوكولات أمان صارمة وتشفير شامل وتدابير امتثال قوية لحماية البيانات الحرجة للمهام.',
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Real-Time Data Analytics' : 'تحليلات البيانات في الوقت الفعلي',
      description: lang === 'en'
        ? 'Powerful observability dashboards and interactive data visualization that give you immediate insight into operational telemetry.'
        : 'لوحات تحكم قوية للمراقبة وتصور تفاعلي للبيانات تمنحك رؤية فورية في القياسات التشغيلية.',
    }
  ];

  return (
    <section id="features" className="py-24 md:py-32 px-4 bg-surface/30 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/bg-elements.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              {lang === 'en' ? 'Our Engineering Capabilities' : 'قدراتنا الهندسية'}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              {lang === 'en' 
                ? 'We do not compromise on technology. Our stack is purpose-built for enterprise scalability, uncompromising security, and raw computational power.' 
                : 'نحن لا نساوم على التكنولوجيا. بنيتنا البرمجية مصممة خصيصاً لتوسع المؤسسات، والأمان الصارم، والقوة الحسابية الخالصة.'}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <Card 
                className="group bg-background/60 hover:bg-surface/80 transition-all duration-500 hover:border-accent/50 h-full rounded-[2rem] p-8"
              >
                <div className="mb-6 p-4 self-start rounded-2xl bg-accent/10 w-max border border-accent/20 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <CardHeader className="p-0 space-y-4">
                  <CardTitle className="text-xl md:text-2xl font-bold">{feature.title}</CardTitle>
                  <CardDescription className="text-base text-muted leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
