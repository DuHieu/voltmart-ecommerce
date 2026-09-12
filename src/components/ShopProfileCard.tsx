"use client";

import { ShieldCheck, PackageCheck, Truck, RefreshCw } from "lucide-react";

export function ShopProfileCard() {
  return (
    <div className="my-8 rounded-2xl border border-border/70 bg-card/60 p-5 shadow-xs backdrop-blur-xs transition-all hover:border-primary/20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
        {/* Pillar 1: Direct From VoltMart */}
        <div className="flex items-center gap-3.5 sm:px-4 first:pl-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground tracking-tight">
              Official Direct Store
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              100% Factory-Sealed Hardware
            </p>
          </div>
        </div>

        {/* Pillar 2: 2-Year Full Hardware Warranty */}
        <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <PackageCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground tracking-tight">
              2-Year Hardware Warranty
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Direct Manufacturer Replacement
            </p>
          </div>
        </div>

        {/* Pillar 3: Free Express Delivery */}
        <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground tracking-tight">
              Free Express Delivery
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Same-Day Dispatch Over $150
            </p>
          </div>
        </div>

        {/* Pillar 4: 30-Day Risk-Free Trial */}
        <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground tracking-tight">
              30-Day Risk-Free Trial
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Zero-Hassle Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
