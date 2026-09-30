import { ArrowRight, ExternalLink } from "lucide-react";

interface WorkSectionProps {
  lang: 'en' | 'ar';
}

export default function WorkSection({ lang }: WorkSectionProps) {
  const projects = [
    {
      title: lang === 'en' ? 'Fintech Dashboard' : 'لوحة تحكم مالية',
      category: lang === 'en' ? 'Web Application' : 'تطبيق ويب',
      description: lang === 'en' ? 'A real-time financial analytics dashboard handling millions of transactions.' : 'لوحة تحكم للتحليلات المالية في الوقت الفعلي تتعامل مع ملايين المعاملات.',
      imageClass: 'bg-gradient-to-br from-blue-900 to-accent',
    },
    {
      title: lang === 'en' ? 'E-Commerce Platform' : 'منصة تجارة إلكترونية',
      category: lang === 'en' ? 'E-Commerce' : 'تجارة إلكترونية',
      description: lang === 'en' ? 'High-conversion storefront optimized for mobile-first shopping experiences.' : 'واجهة متجر عالية التحويل محسّنة لتجارب التسوق عبر الأجهزة المحمولة.',
      imageClass: 'bg-gradient-to-br from-accent/50 to-secondary',
    },
    {
      title: lang === 'en' ? 'Healthcare Portal' : 'بوابة رعاية صحية',
      category: lang === 'en' ? 'Enterprise Software' : 'برمجيات مؤسسية',
      description: lang === 'en' ? 'Secure patient management system with strict compliance and zero-trust architecture.' : 'نظام آمن لإدارة المرضى مع امتثال صارم وبنية خالية من الثقة.',
      imageClass: 'bg-gradient-to-br from-secondary to-blue-950',
    }
  ];

  return (
    <section id="work" className="py-24 md:py-32 px-4 bg-surface/10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {lang === 'en' ? 'Selected Work' : 'أعمالنا المختارة'}
            </h2>
            <p className="text-lg text-muted">
              {lang === 'en' 
                ? 'We build digital products that scale. Here are a few recent highlights from our portfolio.' 
                : 'نحن نبني منتجات رقمية قابلة للتطوير. إليك بعض أبرز أعمالنا الأخيرة.'}
            </p>
          </div>
          <button className="flex items-center gap-2 text-accent hover:text-white transition-colors group font-semibold">
            {lang === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:${lang === 'ar' ? '-translate-x-1' : 'translate-x-1'} ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Project Image Placeholder */}
              <div className={`w-full aspect-[4/3] rounded-[2rem] mb-6 ${project.imageClass} border border-white/5 relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_var(--color-accent)]`}>
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center backdrop-blur-md">
                    <ExternalLink className="w-6 h-6 text-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div>
                <div className="text-accent text-sm font-semibold mb-2">{project.category}</div>
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-muted line-clamp-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
