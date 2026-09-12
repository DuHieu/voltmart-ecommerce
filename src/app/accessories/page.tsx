import { Suspense } from "react";
import CategoryPage from "@/components/CategoryPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function ComputingPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryPage categoryName="Computing & Workspace" categoryId={2} />
    </Suspense>
  );
}
