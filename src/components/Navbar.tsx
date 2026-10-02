"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ lang = 'ar' }: { lang?: 'en' | 'ar' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 pt-6 px-4 md:pt-8 flex justify-center">
      <div
        className={`w-full max-w-7xl flex items-center justify-between rounded-full transition-all duration-500 ${
          isScrolled
            ? "bg-surface/80 backdrop-blur-xl border border-accent/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-3"
            : "bg-transparent border-transparent px-2 py-2 md:px-4"
        }`}
      >
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 relative z-50 opacity-90 hover:opacity-100 transition-opacity">
          <img 
            src="/logos/NavbarLogo2.svg" 
            alt="VOXA Logo" 
            className="h-9 md:h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium ms-auto me-8">
          <Link href={`/${lang}/services`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">
            {lang === 'en' ? 'Services' : 'خدماتنا'}
          </Link>
          <Link href={`/${lang}/about`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">
            {lang === 'en' ? 'About' : 'من نحن'}
          </Link>
          <Link href={`/${lang}/#pricing`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">
            {lang === 'en' ? 'Pricing' : 'الباقات'}
          </Link>
          <Link href={`/${lang}/work`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">
            {lang === 'en' ? 'Work' : 'أعمالنا'}
          </Link>
          <Link href={`/${lang}/articles`} className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">
            {lang === 'en' ? 'Articles' : 'المقالات'}
          </Link>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 relative z-50">
          <div>
            <LanguageSwitcher currentLang={lang} />
          </div>
          <Link
            href={`/${lang}/contact`}
            className="hidden md:flex items-center justify-center bg-action-gradient text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_20px_var(--color-action)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {lang === 'en' ? 'Contact Us' : 'تواصل معنا'}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-muted hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 left-0 w-full h-[100dvh] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <Link href={`/${lang}/services`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-muted hover:text-foreground">
            {lang === 'en' ? 'Services' : 'خدماتنا'}
          </Link>
          <Link href={`/${lang}/about`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-muted hover:text-foreground">
            {lang === 'en' ? 'About' : 'من نحن'}
          </Link>
          <a href={`/${lang}#pricing`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-muted hover:text-foreground">
            {lang === 'en' ? 'Pricing' : 'الباقات'}
          </a>
          <Link href={`/${lang}/work`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-muted hover:text-foreground">
            {lang === 'en' ? 'Work' : 'أعمالنا'}
          </Link>
          <Link href={`/${lang}/articles`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-muted hover:text-foreground">
            {lang === 'en' ? 'Articles' : 'المقالات'}
          </Link>
          <Link
            href={`/${lang}/contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-action-gradient px-10 py-3.5 rounded-full font-bold text-white text-lg shadow-[0_0_20px_var(--color-action)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {lang === 'en' ? 'Contact Us Now' : 'تواصل معنا الآن'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
