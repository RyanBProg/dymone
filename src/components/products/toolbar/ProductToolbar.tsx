import ProductFilterModal from "./ProductFilterModal";
import ProductSort from "./ProductSort";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATEGORIES_QUERY,
  MATERIALS_QUERY,
  STONES_QUERY,
} from "@/lib/sanityQueries";
import Searchbar from "./Searchbar";
import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  STONES_QUERYResult,
} from "../../../../sanity.types";

export default async function ProductToolbar() {
  // TODO: grab the categories avaliable based on the current url params
  const { data: categories } = (await sanityFetch({
    query: CATEGORIES_QUERY,
  })) as { data: CATEGORIES_QUERYResult };

  // TODO: grab the materials avaliable based on the current url params
  const { data: materials } = (await sanityFetch({
    query: MATERIALS_QUERY,
  })) as { data: MATERIALS_QUERYResult };

  const { data: stones } = (await sanityFetch({
    query: STONES_QUERY,
  })) as { data: STONES_QUERYResult };

  return (
    <div className="my-5 px-2 flex gap-2 flex-wrap justify-between md:justify-start">
      <ProductFilterModal
        categories={categories}
        materials={materials}
        stones={stones}
      />
      <ProductSort />
      <Searchbar />
    </div>
  );
}
