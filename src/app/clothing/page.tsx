import { Suspense } from "react";
import CategoryPage from "@/components/CategoryPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function AudioPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryPage categoryName="Audio & Sound" categoryId={1} />
    </Suspense>
  );
}
