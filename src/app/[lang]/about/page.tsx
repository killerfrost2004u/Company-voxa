import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import { Code2, Network, ShieldCheck, Cpu, Zap, LineChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  return {
    title: resolvedParams.lang === 'en' ? 'About Us | VOXA' : 'من نحن | VOXA',
    description: resolvedParams.lang === 'en' ? 'We are elite software engineers and AI researchers building the future of digital ecosystems.' : 'نحن نخبة من مهندسي البرمجيات وباحثي الذكاء الاصطناعي نبني مستقبل الأنظمة الرقمية.',
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <main className="relative flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Navbar lang={lang} />
      
      {/* Hero */}
      <section className="pt-32 md:pt-56 pb-24 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/20 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="container mx-auto max-w-5xl text-center">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground text-sm font-bold tracking-widest mb-8 uppercase">
              {lang === 'en' ? 'The VOXA Manifesto' : 'بيان VOXA'}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-tight text-gradient">
              {lang === 'en' ? 'Engineering the Extraordinary.' : 'هندسة استثنائية.'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
              {lang === 'en'
                ? 'We are not an agency. We are an elite collective of software engineers, machine learning researchers, and system architects. We build high-performance digital ecosystems designed to dominate.'
                : 'نحن لسنا مجرد وكالة. نحن نخبة من مهندسي البرمجيات وباحثي التعلم الآلي ومهندسي النظم. نحن نبني أنظمة رقمية عالية الأداء مصممة لتتصدر.'}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The VOXA Standard (Methodology) */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                {lang === 'en' ? 'The VOXA Standard' : 'معيار VOXA'}
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                {lang === 'en' 
                  ? 'We refuse to deliver mediocrity. Every line of code, every pixel, and every algorithm is scrutinized to meet enterprise-grade standards.'
                  : 'نرفض تقديم ما هو عادي. يتم تدقيق كل سطر من التعليمات البرمجية وكل بكسل وكل خوارزمية لتلبية معايير المؤسسات.'}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn direction="up" delay={0.1}>
              <div className="h-full bg-surface/30 border border-white/5 p-10 rounded-[2rem] hover:bg-surface/50 transition-colors">
                <Cpu className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4">{lang === 'en' ? 'No Boilerplate, Pure Performance' : 'أداء خالص، لا قوالب جاهزة'}</h3>
                <p className="text-muted leading-relaxed">
                  {lang === 'en' 
                    ? 'We do not rely on bloated CMS templates or drag-and-drop builders. We write bespoke, optimized code architectures using Next.js, React, and native cloud services that load in milliseconds.' 
                    : 'نحن لا نعتمد على قوالب جاهزة أو أدوات بناء مرئية بطيئة. نكتب بنى برمجية مخصصة ومحسنة باستخدام أحدث التقنيات التي يتم تحميلها في أجزاء من الثانية.'}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="h-full bg-surface/30 border border-white/5 p-10 rounded-[2rem] hover:bg-surface/50 transition-colors">
                <LineChart className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4">{lang === 'en' ? 'Data-Driven Engineering' : 'هندسة تعتمد على البيانات'}</h3>
                <p className="text-muted leading-relaxed">
                  {lang === 'en' 
                    ? 'Decisions are not based on assumptions. We utilize advanced analytics, A/B testing, and AI-driven insights to engineer solutions that demonstrably increase conversion rates and ROI.' 
                    : 'القرارات لا تُبنى على افتراضات. نحن نستخدم تحليلات متقدمة، واختبارات A/B، ورؤى مدعومة بالذكاء الاصطناعي لهندسة حلول تزيد من معدلات التحويل بشكل ملموس.'}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values / Tech Pillars */}
      <section className="py-24 px-4 bg-surface/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-elements.svg')] opacity-5 mix-blend-overlay" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {lang === 'en' ? 'Our Core Pillars' : 'ركائزنا الأساسية'}
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <Card className="p-10 h-full bg-background border-white/5 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 rounded-[2rem]">
                <CardHeader className="p-0 space-y-4">
                  <div className="p-4 bg-accent/10 rounded-2xl w-max">
                    <Code2 className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{lang === 'en' ? 'Scalable Architecture' : 'بنية قابلة للتوسع'}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {lang === 'en' 
                      ? 'Built on robust microservices, serverless functions, and modern edge networks capable of handling millions of concurrent requests.' 
                      : 'مبنية على خدمات مصغرة قوية ووظائف خالية من الخوادم قادرة على التعامل مع ملايين الطلبات المتزامنة.'}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-10 h-full bg-background border-white/5 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 rounded-[2rem]">
                <CardHeader className="p-0 space-y-4">
                  <div className="p-4 bg-accent/10 rounded-2xl w-max">
                    <Network className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{lang === 'en' ? 'Applied AI' : 'الذكاء الاصطناعي التطبيقي'}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {lang === 'en' 
                      ? 'From NLP chatbots to predictive analytics, we weave Machine Learning deep into the fabric of your business logic.' 
                      : 'من روبوتات المحادثة الذكية إلى التحليلات التنبؤية، ندمج التعلم الآلي بعمق في نسيج أعمالك الأساسي.'}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="p-10 h-full bg-background border-white/5 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 rounded-[2rem]">
                <CardHeader className="p-0 space-y-4">
                  <div className="p-4 bg-accent/10 rounded-2xl w-max">
                    <ShieldCheck className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{lang === 'en' ? 'Enterprise Security' : 'أمان المؤسسات'}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {lang === 'en' 
                      ? 'Military-grade encryption, rigorous penetration testing, and strict compliance protocols protect your assets globally.' 
                      : 'تشفير بمستوى عسكري، واختبارات اختراق صارمة، وبروتوكولات امتثال صارمة تحمي أصولك.'}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <PreFooterCTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
