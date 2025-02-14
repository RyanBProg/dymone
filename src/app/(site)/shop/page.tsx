import type { Metadata } from "next";
import ProductToolbar from "@/components/products/toolbar/ProductToolbar";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Store",
};

type SearchParams = {
  filters?: string | string[];
  categories?: string[];
  materials?: string[];
  genders?: string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  query?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  return (
    <main className="my-20">
      <ProductToolbar />
      <ProductGrid />
      {/* <ProductGrid 
        filters={currentFilters}
        sort={sort}
        query={query}
        priceRange={minPrice && maxPrice ? [Number(minPrice), Number(maxPrice)] : undefined}
      /> */}
    </main>
  );
}
