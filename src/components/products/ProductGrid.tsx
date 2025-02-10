import React from "react";
import GridProductCard from "./GridProductCard";

export default function () {
  return (
    <div className="mx-auto w-fit grid grid-cols-3 gap-3">
      <GridProductCard status="new" />
      <GridProductCard status="sale" />
      <GridProductCard status={null} />
    </div>
  );
}
