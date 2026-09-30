import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden text-center px-4">
      {/* Intense Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* 404 Glitch Text */}
      <h1 className="text-[10rem] md:text-[15rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 animate-pulse">
        404
      </h1>
      
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
        System Not Found.
      </h2>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
        The digital asset you are looking for has either been moved, deleted, or never existed in our ecosystem. Let's get you back to safety.
      </p>

      <Link 
        href="/en"
        className="group flex items-center justify-center gap-3 bg-accent text-background px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_var(--color-accent)] hover:scale-[1.02] transition-all duration-300"
      >
        <Home className="w-5 h-5" />
        Return to Base
      </Link>
    </main>
  );
}
