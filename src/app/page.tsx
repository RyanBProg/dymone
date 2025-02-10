import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";

export default function Home() {
  return (
    <main className="mt-20">
      <ProductFilter />
      <ProductGrid />
      <ProductGrid />
      <ProductGrid />
    </main>
  );
}
