import Link from "next/link";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
}

interface PricingSectionProps {
  dict: {
    title_prefix: string;
    title_highlight: string;
    description: string;
    per_project: string;
    basic: PricingTier;
    pro: PricingTier;
    enterprise: PricingTier;
  };
  lang: 'en' | 'ar';
}

export default function PricingSection({ dict, lang }: PricingSectionProps) {
  const tiers = [
    {
      ...dict.basic,
      isPopular: false,
    },
    {
      ...dict.pro,
      isPopular: true,
    },
    {
      ...dict.enterprise,
      isPopular: false,
    }
  ];

  return (
    <section className="w-full py-[140px] flex justify-center items-center bg-white text-[#212529]">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="text-center space-y-6 max-w-[700px] mx-auto mb-16">
          <h2 className="text-4xl md:text-[64px] font-bold leading-tight md:leading-[77px] tracking-tight">
            {dict.title_prefix}{" "}
            <span className="relative inline-block text-[#4F9CF9]">
              {dict.title_highlight}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 15C50 5 150 5 195 15"
                  stroke="#FFE492"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {dict.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] items-center">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-10 flex flex-col h-full border ${
                tier.isPopular
                  ? "bg-[#043873] text-white border-transparent shadow-2xl scale-100 md:scale-105 z-10 py-16"
                  : "bg-white text-[#212529] border-[#FFE492] border-[1px] shadow-sm hover:shadow-xl transition-shadow"
              }`}
            >
              <div className="text-start space-y-6 flex-1">
                <h3 className={`text-2xl font-bold ${tier.isPopular ? "text-white" : "text-[#212529]"}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[36px] font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && tier.price !== "مخصص" && (
                    <span className={tier.isPopular ? "text-white/80" : "text-gray-500"}>
                      {dict.per_project}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${tier.isPopular ? "text-white/90" : "text-gray-600"} font-medium`}>
                  {tier.description}
                </p>

                <ul className="space-y-4 pt-4">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${tier.isPopular ? "text-[#FFE492]" : "text-[#212529]"}`} />
                      <span className={`text-sm ${tier.isPopular ? "text-white" : "text-gray-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/${lang}/contact`}
                  className={`block w-full text-center py-4 px-6 rounded-lg font-medium transition-colors ${
                    tier.isPopular
                      ? "bg-[#4F9CF9] text-white hover:bg-blue-500"
                      : "bg-white text-[#212529] border border-[#FFE492] hover:bg-[#FFE492]"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
