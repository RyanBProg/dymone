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
} from "@/lib/utils/sanity/sanityQueries";
import { productQueryBuilder } from "@/lib/utils/sanity/productQueryBuilder";
import { filterCountQueryBuilder } from "@/lib/utils/sanity/filterCountQueryBuilder";

export const metadata: Metadata = {
  title: "Store",
};

type Props = {
  searchParams: Promise<ProductURLParams>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  // look at all of the products and get the following based on the returned products:
  // avaliable categories & count
  // avaliable materials & count
  // avaliable stones & count

  // get 20 products based on default or current filters, sort and search values
  // on scroll fetch the next 20 products when the user nears the bottom of the screen

  // on filter, sort or search change the ui is "reset" (the previous list is now removed) and a new 0-20 product list is fetched

  // all avaliable filters and product counts are to remain updated

  // Fetch filter counts
  const filterCountsQuery = filterCountQueryBuilder(params);
  const { data: filterCounts } = await sanityFetch({
    query: filterCountsQuery,
  });

  console.log(filterCounts);

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
      <ProductToolbar
        categories={categories}
        materials={materials}
        stones={stones}
      />
      <ProductGrid products={products} />
    </main>
  );
}
