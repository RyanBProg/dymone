"use client";

import { useState } from "react";
import { SINGLE_PRODUCT_FULLResult } from "@/lib/types";
import AddToCartButton from "../AddToCartButton";

type Props = {
  product: SINGLE_PRODUCT_FULLResult;
};

export default function ProductControls({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  return (
    <div className="m-2 md:m-0 md:absolute md:max-w-md md:right-2 md:bottom-2 grid gap-2">
      <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
        <h1 className="font-bold text-lg mb-2">{product.name}</h1>
        <div className="flex gap-1 items-center">
          <span className="font-light">
            ${product.discountPrice ? product.discountPrice : product.price}
          </span>
          {product.discountPrice && (
            <span className="font-light line-through text-xs">
              ${product.price}
            </span>
          )}
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4 flex justify-between">
        <div>
          <p className="text-xs underline underline-offset-2">Sizes</p>
          <div className="mt-2">
            <button className="hover:bg-white hover:cursor-pointer transition-colors rounded-md px-2 py-1 border border-neutral-400">
              One Size
            </button>
          </div>
        </div>
        <label className="flex flex-col text-right gap-2">
          <span className="text-xs underline underline-offset-2">Qty</span>
          <input
            type="number"
            id="item_qty"
            className="border border-gray-400 rounded-md block w-16 px-2 py-1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            value={quantity}
            required
          />
        </label>
      </div>
      <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
        <AddToCartButton product={product} qty={quantity} />
      </div>
    </div>
  );
}
