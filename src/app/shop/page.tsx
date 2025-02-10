import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";

export default function Home() {
  return (
    <main className="my-20">
      <ProductFilter />
      <ProductGrid />
    </main>
  );
}
