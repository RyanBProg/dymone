import type { Metadata } from "next";
import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Store",
};

type SearchParams = {
  filter?: string;
  sort?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: Props) {
  const { filter = "", sort = "" } = await searchParams;
  // TODO: use filter and sort params to sort & filter product list

  return (
    <main className="my-20">
      <ProductFilter />
      <ProductGrid />
    </main>
  );
}
