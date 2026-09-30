"use client";

import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
      {/* Ultra-subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[500px] bg-accent/5 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-6 text-center z-10 w-full">
        
        {/* Sleek Minimal Label */}
        <div className="animate-fade-in-up flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[13px] font-medium tracking-wide text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"></span>
            VOXA Web & Digital
          </div>
        </div>

        {/* Elegant Typography */}
        <h1 className="animate-fade-in-up animate-delay-100 text-5xl md:text-6xl lg:text-7xl text-foreground font-bold max-w-4xl mx-auto leading-[1.3] tracking-tight text-glow-cyan">
          نبتكر مستقبلك الرقمي <br className="hidden md:block" /> بإبداع وتميز
        </h1>

        <p className="animate-fade-in-up animate-delay-200 text-muted text-lg md:text-xl text-center max-w-2xl mx-auto mt-8 leading-relaxed font-normal">
          نصمم ونطور مواقع ومتاجر إلكترونية تركز على تحسين تجربة المستخدم وزيادة المبيعات بقوة، ببساطة، وبأعلى معايير الجودة.
        </p>

        {/* Minimal CTAs */}
        <div className="animate-fade-in-up animate-delay-300 flex flex-col items-center justify-center gap-12 mt-16">
          <a
            href="#features"
            className="flex items-center justify-center w-12 h-16 rounded-full border border-accent/40 shadow-[0_0_15px_var(--color-accent)] hover:shadow-[0_0_25px_var(--color-accent)] transition-all duration-300"
          >
            <div className="w-4 h-4 border-b-2 border-l-2 border-accent -rotate-45 animate-bounce mt-[-4px]"></div>
          </a>
        </div>

      </div>
    </section>
  );
}
