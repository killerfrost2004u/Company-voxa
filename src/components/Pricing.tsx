"use client";

import { useEffect, useRef } from "react";
import { Check, ArrowLeft } from "lucide-react";

const tiers = [
  {
    name: "باقة الانطلاق",
    target: "للشركات الناشئة",
    price: "7,000",
    currency: "ج.م",
    features: [
      "تصميم صفحة هبوط احترافية",
      "برمجة متجاوبة مع جميع الشاشات",
      "ربط سريع بالواتساب ومنصات التواصل",
      "تجهيز النطاق والاستضافة",
    ],
  },
  {
    name: "باقة الأعمال",
    target: "للشركات والمؤسسات",
    price: "12,000+",
    currency: "ج.م",
    highlighted: true,
    badge: "الأكثر طلباً",
    features: [
      "موقع متكامل بعدة صفحات",
      "استضافة على سيرفر VPS فائق السرعة",
      "لوحة تحكم لإدارة المحتوى",
      "5 إيميلات رسمية باسم شركتك",
      "تهيئة أساسية لمحركات البحث (SEO)",
    ],
  },
  {
    name: "المتاجر الإلكترونية",
    target: "للمتاجر المتكاملة",
    price: "25,000+",
    currency: "ج.م",
    features: [
      "تصميم UI/UX مخصص بالكامل",
      "برمجة متكاملة (Full-Stack)",
      "لوحة تحكم متقدمة للمبيعات",
      "ربط مع بوابات الدفع",
      "إحصائيات وتقارير متقدمة",
    ],
  },
];

export default function Pricing() {
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
    <section ref={sectionRef} id="pricing" className="pt-12 pb-40 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Minimal Header */}
        <div className="text-center mb-20 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            استثمارك <span className="text-gradient">الرقمي</span> الصحيح.
          </h2>
          <p className="text-muted text-[15px] font-normal max-w-xl mx-auto leading-relaxed">
            باقات تسعير واضحة ومدروسة تناسب حجم عملك، بلا تكاليف خفية، مع التزام كامل بالجودة العالية.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`reveal minimal-card relative group flex flex-col p-8 md:p-10 transition-all duration-500 ${
                tier.highlighted ? "border-accent/40 shadow-[0_0_40px_var(--color-accent)] md:-translate-y-2" : ""
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background border border-accent/50 text-accent font-medium px-4 py-1 rounded-full text-[12px] w-max shadow-[0_0_15px_var(--color-accent)]">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">{tier.name}</h3>
                <p className="text-muted text-sm">{tier.target}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-foreground tracking-tight">{tier.price}</span>
                <span className="text-muted font-medium text-sm">{tier.currency}</span>
              </div>

              <div className="h-[1px] bg-white/5 w-full mb-8" />

              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0 opacity-80" />
                    <span className="text-muted text-[14px] leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/201125537697"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-full font-semibold text-[14px] transition-all duration-300 mt-auto ${
                  tier.highlighted 
                    ? "bg-cyan-gradient text-foreground hover:shadow-[var(--voxa-glow-shadow)]" 
                    : "bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span>ابدأ الآن</span>
              </a>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
