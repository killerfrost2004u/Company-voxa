"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ currentLang }: { currentLang: 'en' | 'ar' }) {
  const pathname = usePathname();
  const targetLang = currentLang === 'en' ? 'ar' : 'en';
  
  // Replace the first segment (e.g., /en/services -> /ar/services)
  const targetPath = pathname.replace(`/${currentLang}`, `/${targetLang}`);
  
  const displayLabel = currentLang === 'en' ? 'عربي' : 'English';

  return (
    <Link 
      href={targetPath}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-surface/50 text-muted hover:text-foreground hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      dir="ltr"
    >
      <Globe className="w-4 h-4" />
      <span>{displayLabel}</span>
    </Link>
  );
}
