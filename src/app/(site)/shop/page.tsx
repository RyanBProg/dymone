import type { Metadata } from "next";
import ProductToolbar from "@/components/products/toolbar/ProductToolbar";
import ProductGrid from "@/components/products/ProductGrid";
import { ALL_PRODUCTS_PREVIEW_QUERYResult } from "../../../../sanity.types";
import { ProductURLParams } from "@/lib/types";
import { productQueryBuilder } from "@/lib/utils/sanity/productQueryBuilder";
import {
  getAllProductCategories,
  getAllProductMaterials,
  getAllProductStones,
  getFilteredProductsPreview,
} from "@/actions/sanity";
import NoProducts from "@/components/products/NoProducts";
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

  if (!categories || !materials || !stones) {
    console.log("Error fetching product data");
    return null;
  }

  const PRODUCTS_QUERY = productQueryBuilder(
    params,
    categories.data,
    materials.data,
    stones.data
  );

  const { data: productsPreviewData } = (await getFilteredProductsPreview(
    PRODUCTS_QUERY
  )) as { data: ALL_PRODUCTS_PREVIEW_QUERYResult };

  if (!productsPreviewData) {
    console.log("Error fetching product data");
    return <ErrorFetchingProducts />;
  }

  return (
    <main className="my-20">
      <ProductToolbar
        categories={categories.data}
        materials={materials.data}
        stones={stones.data}
      />
      <ProductGrid productsPreviewData={productsPreviewData} />
    </main>
  );
}
