import React from "react";
import GridProductCard from "./GridProductCard";
import { ALL_PRODUCTS_PREVIEW_QUERYResult } from "../../../sanity.types";
import Pagination from "./Pagination";
import NoProducts from "./NoProducts";

type Props = {
  productsPreviewData: ALL_PRODUCTS_PREVIEW_QUERYResult;
};

export default async function ProductGrid({ productsPreviewData }: Props) {
  if (productsPreviewData.products.length < 1) {
    console.log("Error fetching product data");
    return <NoProducts />;
  }

  return (
    <div>
      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {productsPreviewData.products.map((product) => {
          return <GridProductCard key={product._id} product={product} />;
        })}
      </div>
      <Pagination productsPreviewData={productsPreviewData} />
    </div>
  );
}
