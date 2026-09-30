import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import { 
  Globe, 
  Bot, 
  Cpu, 
  Workflow, 
  LineChart 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  return {
    title: resolvedParams.lang === 'en' ? 'Services | VOXA' : 'خدماتنا | VOXA',
    description: resolvedParams.lang === 'en' ? 'Explore our digital solutions, from web platforms to AI models.' : 'استكشف حلولنا الرقمية، من منصات الويب إلى نماذج الذكاء الاصطناعي.',
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // The services data block ... (rest of the file remains the same until the return)
  const services = [
    {
      id: "web-platforms",
      icon: <Globe className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Headless Web Architectures' : 'بنيات الويب اللامركزية (Headless)',
      description: lang === 'en' 
        ? 'We engineer lightning-fast, highly resilient web applications. By utilizing headless architectures and edge computing, we eliminate bottlenecks and deliver sub-second rendering for mission-critical platforms.'
        : 'نحن نهندس تطبيقات ويب سريعة للغاية وعالية المرونة. من خلال استخدام البنيات اللامركزية والحوسبة الطرفية، نقضي على اختناقات الأداء ونوفر عرضاً في أجزاء من الثانية للمنصات الحرجة.',
      features: lang === 'en' 
        ? ['Next.js & React Ecosystems', 'High-Volume E-Commerce', 'Global Edge CDN Delivery'] 
        : ['بيئات Next.js و React', 'التجارة الإلكترونية عالية الكثافة', 'شبكات التوصيل السريع الطرفية'],
    },
    {
      id: "custom-ai",
      icon: <Bot className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Applied Artificial Intelligence' : 'الذكاء الاصطناعي التطبيقي',
      description: lang === 'en'
        ? 'Transition from generative hype to tangible ROI. We train and deploy bespoke machine learning pipelines—from predictive analytics to advanced computer vision—anchored directly into your proprietary data.'
        : 'انتقل من ضجيج التوليد إلى العائد الملموس على الاستثمار. نحن ندرب وننشر مسارات تعلم آلي مخصصة متجذرة مباشرة في بياناتك الخاصة.',
      features: lang === 'en'
        ? ['Predictive Demand Forecasting', 'Custom LLM Orchestration', 'Real-Time Computer Vision']
        : ['التنبؤ بالطلب', 'تنسيق نماذج اللغات الكبيرة', 'رؤية الحاسوب اللحظية'],
    },
    {
      id: "erp-systems",
      icon: <Cpu className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Intelligent Enterprise Systems' : 'أنظمة المؤسسات الذكية (ERP)',
      description: lang === 'en'
        ? 'Legacy monolithic systems stifle scale. We construct modular, API-first ERP ecosystems that seamlessly unify your logistics, HR, and finance departments into a single source of truth.'
        : 'الأنظمة التقليدية تعيق التوسع. نحن نبني أنظمة ERP معيارية تعتمد على واجهات برمجة التطبيقات لتوحيد أقسام الخدمات اللوجستية والموارد البشرية والمالية.',
      features: lang === 'en'
        ? ['API-First Architecture', 'Unified Data Warehousing', 'Automated Financial Reconciliation']
        : ['بنية تعتمد على API', 'مستودعات البيانات الموحدة', 'التسويات المالية المؤتمتة'],
    },
    {
      id: "workflow-automation",
      icon: <Workflow className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Autonomous Workflow Orchestration' : 'تنسيق سير العمل المستقل',
      description: lang === 'en'
        ? 'We eradicate operational friction by replacing manual data entry with autonomous pipelines. From complex webhook routing to deeply integrated Robotic Process Automation (RPA), we force your disparate systems to communicate flawlessly.'
        : 'نقضي على الاحتكاك التشغيلي عن طريق استبدال إدخال البيانات اليدوي بمسارات مستقلة. من توجيه webhooks المعقد إلى أتمتة العمليات الروبوتية العميقة، نجعل أنظمتك تتواصل بسلاسة.',
      features: lang === 'en'
        ? ['Event-Driven Architecture', 'Legacy RPA Integration', 'Idempotent Pipeline Design']
        : ['بنية تعتمد على الأحداث', 'دمج الأنظمة القديمة بـ RPA', 'تصميم مسارات خالية من التكرار'],
    },
    {
      id: "data-intelligence",
      icon: <LineChart className="w-8 h-8 text-accent" />,
      title: lang === 'en' ? 'Predictive Data Analytics' : 'تحليلات البيانات التنبؤية',
      description: lang === 'en'
        ? 'Stop relying on historical reporting. We build dynamic data lakes and real-time visualization dashboards that transform fragmented silos into prescriptive, forward-looking business intelligence.'
        : 'توقف عن الاعتماد على التقارير التاريخية. نحن نبني بحيرات بيانات ديناميكية ولوحات تحكم تفاعلية تحول صوامع البيانات المجزأة إلى ذكاء أعمال استشرافي.',
      features: lang === 'en'
        ? ['Real-Time Streaming Pipelines', 'Interactive Executive Dashboards', 'Anomaly Detection Systems']
        : ['مسارات البث اللحظي للبيانات', 'لوحات التحكم التنفيذية', 'أنظمة اكتشاف الحالات الشاذة'],
    }
  ];

  return (
    <main className="relative flex flex-col min-h-screen bg-background">
      <Navbar lang={lang} />
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-accent/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-secondary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <section className="pt-32 md:pt-48 pb-24 px-4 container mx-auto max-w-7xl flex-grow">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-gradient">
              {lang === 'en' ? 'Our Expertise.' : 'خبراتنا.'}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
              {lang === 'en' 
                ? 'We architect high-performance digital ecosystems. Explore the technologies we use to scale businesses.' 
                : 'نحن نبني أنظمة رقمية عالية الأداء. استكشف التقنيات التي نستخدمها لتوسيع نطاق الشركات.'}
            </p>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={index * 0.1} className={`h-full ${
                index === 2 && 'xl:col-span-1'
              } ${index === 3 && 'md:col-span-2 xl:col-span-2'} ${index === 4 && 'md:col-span-2 xl:col-span-1'}`}>
              <Card 
                className="p-8 md:p-10 flex flex-col h-full group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted mb-8 flex-grow leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>

      </section>

      <PreFooterCTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
