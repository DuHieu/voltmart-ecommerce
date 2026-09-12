"use client";

import Link from "next/link";
import { MessageSquare, Store, ShieldCheck, Star, Users, PackageCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoltMartLogo } from "@/components/VoltMartLogo";
import { toast } from "sonner";

export function ShopProfileCard() {
  const handleChat = () => {
    toast.success("Connecting to VoltMart Support...", {
      description: "A technical hardware specialist is available 24/7 to assist you."
    });
  };

  return (
    <div className="my-8 rounded-xl border border-border/80 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left: Shop Identity & Direct Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-5 lg:border-r lg:border-border/60 lg:pr-6">
          <div className="relative shrink-0">
            <VoltMartLogo size="lg" showText={false} />
            <span className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
              Mall
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-bold text-foreground">
                VoltMart Official Store
              </h3>
              <span className="inline-flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                <ShieldCheck className="h-3 w-3" />
                Verified Mall
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Active 3 mins ago
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleChat}
                className="h-8 gap-1.5 text-xs border-primary/40 text-primary hover:bg-primary/10 cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Chat Now
              </Button>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Store className="h-3.5 w-3.5" />
                  Visit Store
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Shopee-style Shop Reputation Metrics */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:col-span-7">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ratings</p>
              <p className="text-sm font-semibold text-foreground">
                4.9 <span className="text-xs font-normal text-muted-foreground">(28.4k)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Response Rate</p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                99% <span className="text-xs font-normal text-muted-foreground">(Within mins)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
              <PackageCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Products</p>
              <p className="text-sm font-semibold text-foreground">48 Devices</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Followers</p>
              <p className="text-sm font-semibold text-foreground">142.8k</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Warranty</p>
              <p className="text-sm font-semibold text-foreground">2-Year Full</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <Store className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="text-sm font-semibold text-foreground">3 Years Ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
