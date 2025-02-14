import ProductFilterModal from "./ProductFilterModal";
import ProductSort from "./ProductSort";
import { sanityFetch } from "@/sanity/lib/live";
import { ProductCategory, ProductMaterials } from "@/lib/types";
import { CATEGORIES_QUERY, MATERIALS_QUERY } from "@/lib/sanityQueries";
import Searchbar from "./Searchbar";

export default async function ProductToolbar() {
  // grab the categories avaliable based on the current url params
  const { data: categories } = (await sanityFetch({
    query: CATEGORIES_QUERY,
  })) as { data: ProductCategory[] };

  // grab the materials avaliable based on the current url params
  const { data: materials } = (await sanityFetch({
    query: MATERIALS_QUERY,
  })) as { data: ProductMaterials[] };

  return (
    <div className="my-5 px-2 flex gap-2 flex-wrap justify-between md:justify-start">
      <ProductFilterModal categories={categories} materials={materials} />
      <ProductSort />
      <Searchbar />
    </div>
  );
}
