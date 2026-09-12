import { Suspense } from "react";
import CategoryPage from "@/components/CategoryPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function ElectronicsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryPage categoryName="Smart Gear & Wearables" categoryId={3} />
    </Suspense>
  );
}
