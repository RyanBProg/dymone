import ProductFilterModal from "./ProductFilterModal";
import ProductSort from "./ProductSort";
import Searchbar from "./Searchbar";
import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  STONES_QUERYResult,
} from "../../../../sanity.types";

type Props = {
  categories: CATEGORIES_QUERYResult;
  materials: MATERIALS_QUERYResult;
  stones: STONES_QUERYResult;
};

export default async function ProductToolbar({
  categories,
  materials,
  stones,
}: Props) {
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
