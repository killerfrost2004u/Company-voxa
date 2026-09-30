import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface ServiceBlockProps {
  dict: {
    title: string;
    highlight: string;
    description: string;
    features: string[];
    image_alt: string;
    image_src?: string;
  };
  isReversed?: boolean;
}

export default function ServiceBlock({ dict, isReversed = false }: ServiceBlockProps) {
  return (
    <section className="w-full py-24 md:py-32 flex justify-center items-center odd:bg-background even:bg-surface/30">
      <div className={`container mx-auto px-6 max-w-[1440px] flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-[60px]`}>
        
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-start">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight tracking-tight text-foreground">
            {dict.title} <br className="hidden md:block" />
            <span className="text-accent">
              {dict.highlight}
            </span>
          </h2>
          
          <p className="text-lg leading-relaxed text-muted-foreground max-w-[600px]">
            {dict.description}
          </p>
          
          <ul className="space-y-4 pt-4">
            {dict.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0 text-accent" />
                <span className="text-lg text-foreground">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image / Illustration Container */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-[600px] aspect-[4/3] rounded-[2rem] flex items-center justify-center relative overflow-hidden bg-surface/50 border border-white/5 transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(30,117,148,0.2)]">
            {dict.image_src ? (
              <Image 
                src={dict.image_src} 
                alt={dict.image_alt}
                fill
                className="object-contain p-8"
              />
            ) : (
              <div className="text-muted-foreground font-medium text-center px-4">
                {dict.image_alt}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}
