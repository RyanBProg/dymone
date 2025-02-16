import type { Metadata } from "next";
import ProductToolbar from "@/components/products/toolbar/ProductToolbar";
import ProductGrid from "@/components/products/ProductGrid";
import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  PRODUCTGRID_QUERYResult,
  STONES_QUERYResult,
} from "../../../../sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { ProductURLParams } from "@/lib/types";
import {
  CATEGORIES_QUERY,
  MATERIALS_QUERY,
  STONES_QUERY,
} from "@/lib/sanityQueries";
import { productQueryBuilder } from "@/lib/utils/ProductQueryBuilder";

export const metadata: Metadata = {
  title: "Store",
};

type Props = {
  searchParams: Promise<ProductURLParams>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const { data: categories } = (await sanityFetch({
    query: CATEGORIES_QUERY,
  })) as { data: CATEGORIES_QUERYResult };

  const { data: materials } = (await sanityFetch({
    query: MATERIALS_QUERY,
  })) as { data: MATERIALS_QUERYResult };

  const { data: stones } = (await sanityFetch({
    query: STONES_QUERY,
  })) as { data: STONES_QUERYResult };

  const productsQuery = productQueryBuilder(
    params,
    categories,
    materials,
    stones
  );

  const { data: products } = (await sanityFetch({
    query: productsQuery,
  })) as { data: PRODUCTGRID_QUERYResult };

  return (
    <main className="my-20">
      <ProductToolbar />
      <ProductGrid products={products} />
    </main>
  );
}
