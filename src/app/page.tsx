import { Suspense } from "react";
import ClientProducts from "@/components/ClientProducts";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HeroBanner } from "@/components/HeroBanner";

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <HeroBanner />
          <div id="catalog-section" className="space-y-4 pt-2">
            <Suspense
              fallback={
                <div className="flex min-h-[200px] items-center justify-center">
                  <div className="border-primary h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"></div>
                </div>
              }
            >
              <ClientProducts />
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
