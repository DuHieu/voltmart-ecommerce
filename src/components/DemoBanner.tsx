export function DemoBanner() {
  return (
    <div className="flex w-full justify-center border-b border-border/40 bg-muted/60 backdrop-blur-md px-4 py-1.5 text-center text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-foreground">VoltMart Electronics</span>
        <span className="hidden sm:inline text-muted-foreground/80">
          • Free Global Express Delivery on orders over $150
        </span>
        <span className="hidden md:inline text-muted-foreground/60">
          • Next.js + Supabase Modern Full-Stack Platform
        </span>
      </div>
    </div>
  );
}
