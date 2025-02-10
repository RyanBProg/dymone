import React from "react";
import GridProductCard from "./GridProductCard";

export default function () {
  return (
    <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      <GridProductCard />
      <GridProductCard />
      <GridProductCard />
      <GridProductCard />
      <GridProductCard />
      <GridProductCard />
      <GridProductCard />
      <GridProductCard />
      <GridProductCard />
    </div>
  );
}
