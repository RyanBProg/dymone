import React from "react";
import GridProductCard from "./GridProductCard";
import { PRODUCTGRID_QUERYResult } from "../../../sanity.types";
import Pagination from "./Pagination";

type Props = {
  products: PRODUCTGRID_QUERYResult;
};

export default async function ProductGrid({ products }: Props) {
  if (products.length < 1 || !products) {
    return <>No Products</>;
  }

  return (
    <div>
      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => {
          return <GridProductCard key={product._id} product={product} />;
        })}
      </div>
      <Pagination count={products.length} />
    </div>
  );
}
