"use client";

import { useEffect, useRef } from "react";
import { MonitorSmartphone, Code2, Rocket, LineChart } from "lucide-react";

const features = [
  {
    icon: MonitorSmartphone,
    title: "تصميم واجهات احترافي",
    desc: "نصمم واجهات عصرية تركز على سهولة الاستخدام وتجربة مستخدم لا تُنسى لضمان بقاء عملائك."
  },
  {
    icon: Code2,
    title: "تطوير برمجي متكامل",
    desc: "نستخدم أحدث التقنيات البرمجية لبناء أنظمة قوية، آمنة، وقابلة للتوسع لتلبية احتياجاتك."
  },
  {
    icon: Rocket,
    title: "أداء فائق السرعة",
    desc: "تحسين سرعة الموقع لأقصى حد لضمان تصدر نتائج البحث وتوفير تجربة تصفح سلسة."
  },
  {
    icon: LineChart,
    title: "تحسين معدلات التحويل",
    desc: "نبني مسارات مستخدم ذكية تحول الزوار إلى عملاء فعليين بناءً على تحليل السلوك."
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="pt-12 pb-32 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Mockup Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="reveal minimal-card rounded-[2rem] p-8 flex flex-col group hover:border-accent/60 hover:shadow-[0_0_30px_rgba(95,205,215,0.15)] transition-all duration-500"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent/10 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_var(--color-accent)] transition-all duration-500">
                <item.icon className="w-6 h-6 text-muted group-hover:text-accent transition-colors duration-500" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted text-[14px] leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Central CTA matching mockup */}
        <div className="reveal flex justify-center mt-16" style={{ transitionDelay: '0.4s' }}>
          <a
            href="https://wa.me/201125537697"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-foreground font-medium text-sm transition-all duration-300"
          >
            أطلب عرض
          </a>
        </div>

      </div>
    </section>
  );
}
