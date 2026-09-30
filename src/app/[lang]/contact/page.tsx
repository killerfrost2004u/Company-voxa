import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./components/ContactForm";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import FadeIn from "@/components/FadeIn";

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  return {
    title: resolvedParams.lang === 'en' ? 'Contact Us | VOXA' : 'اتصل بنا | VOXA',
    description: resolvedParams.lang === 'en' ? 'Get in touch with VOXA to discuss your next digital project.' : 'تواصل مع VOXA لمناقشة مشروعك الرقمي القادم.',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <main className="relative flex flex-col min-h-screen bg-background">
      <Navbar lang={lang} />
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-accent/5 rounded-b-full blur-[120px] -z-10 pointer-events-none" />

      <section className="pt-32 md:pt-48 pb-12 px-4 container mx-auto max-w-7xl flex-grow">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-gradient">
              {lang === 'en' ? "Let's Talk." : "دعنا نتحدث."}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
              {lang === 'en' 
                ? 'Ready to build the future? Reach out to our engineers to discuss your next web platform, AI model, or enterprise software.' 
                : 'مستعد لبناء المستقبل؟ تواصل مع مهندسينا لمناقشة منصة الويب أو نموذج الذكاء الاصطناعي أو برمجيات مؤسستك القادمة.'}
            </p>
          </div>
        </FadeIn>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 mb-24">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-12">
            <FadeIn direction="up" delay={0.1}>
              <div>
                <h2 className="text-2xl font-bold mb-6 text-accent">
                  {lang === 'en' ? 'Contact Information' : 'معلومات التواصل'}
                </h2>
                <div className="space-y-6">
                  
                  {/* Phone */}
                  <a href="https://wa.me/201125537697" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-2 -m-2">
                    <div className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">{lang === 'en' ? 'Phone / WhatsApp' : 'الهاتف / واتساب'}</p>
                      <p dir="ltr" className={`text-lg font-semibold text-foreground group-hover:text-accent transition-colors ${lang === 'ar' ? 'text-right' : ''}`}>+20 112 553 7697</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href="mailto:voxaa.business@gmail.com" className="flex items-start gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-2 -m-2">
                    <div className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">{lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</p>
                      <p className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">voxaa.business@gmail.com</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-2 -m-2">
                    <div className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">{lang === 'en' ? 'Headquarters' : 'المقر الرئيسي'}</p>
                      <p className="text-lg font-semibold text-foreground">Cairo, Egypt<br/><span className="text-sm text-muted">Serving clients globally</span></p>
                    </div>
                  </div>

                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3">
            <FadeIn direction="up" delay={0.2}>
              <Card className="p-8 md:p-12 md:rounded-[3rem] bg-surface/50 border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
                {/* Subtle accent glow in the form corner */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10" />

                <ContactForm lang={lang as 'en' | 'ar'} />
              </Card>
            </FadeIn>
          </div>

        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
