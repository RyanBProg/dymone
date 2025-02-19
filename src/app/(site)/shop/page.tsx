import type { Metadata } from "next";
import ProductToolbar from "@/components/products/toolbar/ProductToolbar";
import ProductGrid from "@/components/products/ProductGrid";
import { ProductURLParams } from "@/lib/types";
import { productQueryBuilder } from "@/lib/utils/sanity/productQueryBuilder";
import {
  getAllProductCategories,
  getAllProductMaterials,
  getAllProductStones,
  getFilteredProductsPreview,
} from "@/lib/utils/sanity/sanityQueries";
import ErrorFetchingProducts from "@/components/products/ErrorFetchingProducts";

export const metadata: Metadata = {
  title: "Store",
};

type Props = {
  searchParams: Promise<ProductURLParams>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const [categories, materials, stones] = await Promise.all([
    getAllProductCategories(),
    getAllProductMaterials(),
    getAllProductStones(),
  ]);

  if (!categories || !categories.length) {
    console.error("No categories list found");
    return <ErrorFetchingProducts />;
  }
  if (!materials || !materials.length) {
    console.error("No materials list found");
    return <ErrorFetchingProducts />;
  }
  if (!stones || !stones.length) {
    console.error("No stones list found");
    return <ErrorFetchingProducts />;
  }

  const PRODUCTS_QUERY = productQueryBuilder(
    params,
    categories,
    materials,
    stones
  );

  const productsPreviewData = await getFilteredProductsPreview(PRODUCTS_QUERY);

  if (!productsPreviewData) {
    console.log("Error fetching product data");
    return <ErrorFetchingProducts />;
  }

  return (
    <main className="my-20">
      <ProductToolbar
        categories={categories}
        materials={materials}
        stones={stones}
      />
      <ProductGrid productsPreviewData={productsPreviewData} />
    </main>
  );
}
