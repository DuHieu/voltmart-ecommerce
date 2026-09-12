'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Headphones, Cpu, ShieldCheck } from 'lucide-react';

export function HeroBanner() {
  const scrollToProducts = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-background p-6 md:p-12 mb-8 shadow-sm">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl space-y-5">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>New 2026 Studio Hardware Series</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
          Precision Electronics for the <span className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Modern Workspace</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          Engineered for developers, audio engineers, and tech enthusiasts. Discover audiophile headphones, custom mechanical keyboards, and 4K displays with zero latency.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button onClick={scrollToProducts} size="lg" className="cursor-pointer gap-2 font-semibold shadow-md">
            Browse All Products
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link href="/clothing">
            <Button variant="outline" size="lg" className="cursor-pointer font-medium">
              Explore Audio
            </Button>
          </Link>
          <Link href="/accessories">
            <Button variant="outline" size="lg" className="cursor-pointer font-medium">
              Workstation Docks
            </Button>
          </Link>
        </div>

        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-muted-foreground border-t border-border/40">
          <div className="flex items-center gap-1.5">
            <Headphones className="h-4 w-4 text-primary" />
            <span>Lossless Spatial Audio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-primary" />
            <span>Low-Latency Wireless</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>2-Year Full Hardware Warranty</span>
          </div>
        </div>
      </div>
    </section>
  );
}
