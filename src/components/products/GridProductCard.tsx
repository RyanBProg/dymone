import Image from "next/image";
import React from "react";

type Props = {
  status: "sale" | "new" | null;
};

export default function GridProductCard({ status }: Props) {
  return (
    <div className="relative h-[400px] w-[300px] overflow-clip rounded-3xl">
      {status && (
        <div className="bg-white rounded-r-full p-1 absolute z-10 left-0 top-10 h-14 w-14 flex justify-center items-center">
          <div className="border-2 rounded-full h-full w-full flex justify-center items-center">
            {status === "sale" ? "SALE" : "NEW"}
          </div>
        </div>
      )}
      <Image src="/product.jpeg" alt="product" fill objectFit="cover" />
      <div className="absolute grid gap-3 bg-white rounded-2xl inset-x-2 bottom-2 p-2">
        <span className="font-medium">Simpalé Watch</span>
        <div className="flex gap-1 items-center">
          <span className="font-light">$79.99</span>
          <span className="font-light line-through text-xs">$79.99</span>
        </div>

        <div className="flex justify-between">
          <a href="#" className="btn btn-ghost">
            View Product
          </a>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
