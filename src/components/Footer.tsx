import Link from 'next/link';
import { Cpu, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur-sm mt-16">
      {/* Value props */}
      <div className="border-b border-border/40 py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Global Express Delivery</p>
              <p className="text-xs text-muted-foreground">Free shipping on orders over </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">2-Year Official Warranty</p>
              <p className="text-xs text-muted-foreground">Full coverage on all hardware</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">30-Day Risk-Free Trial</p>
              <p className="text-xs text-muted-foreground">Hassle-free returns & refunds</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Certified Engineering</p>
              <p className="text-xs text-muted-foreground">Premium audiophile & tech grade</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                V
              </div>
              <span className="text-xl font-bold tracking-tight">Volt<span className="text-primary font-normal">Mart</span></span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Precision audio, computing peripherals, and smart wearable hardware engineered for power users and creators.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Next.js 16 + Supabase
              </span>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/clothing" className="hover:text-primary transition-colors">Audio & Sound</Link></li>
              <li><Link href="/accessories" className="hover:text-primary transition-colors">Computing & Workspace</Link></li>
              <li><Link href="/electronics" className="hover:text-primary transition-colors">Smart Gear & Wearables</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Customer Service</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/cart" className="hover:text-primary transition-colors">Order Tracking</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Customer Portal</Link></li>
              <li><Link href="/profile" className="hover:text-primary transition-colors">Warranty Registration</Link></li>
              <li><span className="text-muted-foreground/60 cursor-default">support@voltmart.io</span></li>
            </ul>
          </div>

          {/* Tech Architecture Stack */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Architecture & Tech</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><span className="font-medium text-foreground">Framework:</span> Next.js 16 (App Router + Turbopack)</li>
              <li><span className="font-medium text-foreground">Database:</span> Supabase PostgreSQL + RLS</li>
              <li><span className="font-medium text-foreground">Styling:</span> Tailwind CSS v4 + Radix UI</li>
              <li><span className="font-medium text-foreground">State:</span> TanStack Query v5</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} VoltMart Electronics Inc. Portfolio Showcase.</p>
          <p className="flex items-center gap-1">
            Engineered with modern full-stack web standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
