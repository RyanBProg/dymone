import type { Metadata } from "next";
import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Store",
};

export default function Home() {
  return (
    <main className="my-20">
      <ProductFilter />
      <ProductGrid />
    </main>
  );
}
