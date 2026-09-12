import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getCategoryBySlug, CATEGORIES_LIST } from "@/utils/categoryUtils";
import { Metadata } from "next";

interface CategoryRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES_LIST.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | VoltMart",
    };
  }

  return {
    title: `${category.name} | VoltMart Electronics`,
    description: category.description,
  };
}

export default async function DynamicCategoryPage({
  params,
}: CategoryRouteProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <CategoryPage categoryName={category.name} categoryId={category.id} />
    </Suspense>
  );
}