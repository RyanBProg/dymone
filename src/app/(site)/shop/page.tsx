import type { Metadata } from "next";
import ProductToolbar from "@/components/products/toolbar/ProductToolbar";
import ProductGrid from "@/components/products/ProductGrid";
import { PRODUCTGRID_QUERYResult } from "../../../../sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { ProductURLParams } from "@/lib/types";
import {
  CATEGORIES_QUERY,
  MATERIALS_QUERY,
  STONES_QUERY,
} from "@/lib/utils/sanity/sanityQueries";
import { productQueryBuilder } from "@/lib/utils/sanity/productQueryBuilder";

export const metadata: Metadata = {
  title: "Store",
};

type Props = {
  searchParams: Promise<ProductURLParams>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const [categories, materials, stones] = await Promise.all([
    sanityFetch({ query: CATEGORIES_QUERY }),
    sanityFetch({ query: MATERIALS_QUERY }),
    sanityFetch({ query: STONES_QUERY }),
  ]);

  const productsQuery = productQueryBuilder(
    params,
    categories.data,
    materials.data,
    stones.data
  );

  const { data: products } = (await sanityFetch({
    query: productsQuery,
  })) as { data: PRODUCTGRID_QUERYResult };

  // get 12 products based on default or current filters, sort and search values
  // on scroll fetch the next 12 products when the user nears the bottom of the screen
  // or append a p tag to the end of the list saying "No more products"

  // on filter, sort or search change the ui is "reset" (the previous list is now removed) and a new 0-12 product list is fetched

  return (
    <main className="my-20">
      <ProductToolbar
        categories={categories.data}
        materials={materials.data}
        stones={stones.data}
      />
      <ProductGrid products={products} />
    </main>
  );
}
