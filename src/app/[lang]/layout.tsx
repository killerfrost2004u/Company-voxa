import type { Metadata } from "next";
import "../globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  metadataBase: new URL('https://voxa-pi-three.vercel.app'),
  title: {
    default: "VOXA | High-Performance Web & Digital Solutions",
    template: "%s | VOXA"
  },
  description: "VOXA engineers high-performance web applications, bespoke ERPs, and conversion-optimized E-Commerce platforms for enterprise scale.",
  keywords: [
    "VOXA",
    "Software Agency",
    "Web Development",
    "Next.js Development",
    "تصميم مواقع",
    "تطوير ويب",
    "UI/UX",
    "حلول رقمية",
    "تصميم متاجر",
    "Enterprise Software",
    "AI Integration",
    "E-Commerce Solutions"
  ],
  authors: [{ name: "VOXA Engineering" }],
  creator: "VOXA",
  publisher: "VOXA",
  alternates: {
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "https://voxa-pi-three.vercel.app",
    title: "VOXA | Next-Generation Software Agency",
    description: "Building autonomous systems, converting E-Commerce architectures, and deploying custom AI solutions for industry leaders.",
    siteName: "VOXA",
    images: [
      {
        url: "/og-image.png", // Will default to domain/og-image.png if exists
        width: 1200,
        height: 630,
        alt: "VOXA - Enterprise Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VOXA | High-Performance Web & Digital Solutions",
    description: "Building autonomous systems, converting E-Commerce architectures, and deploying custom AI solutions for industry leaders.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '4CmKXAIudsw0_jJmRxWvqBboRM2DySXxQ8dGecnuj0o',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'ar';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background bg-starry text-foreground font-sans overflow-x-hidden" suppressHydrationWarning>
        {children}
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
