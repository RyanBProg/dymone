"use client";

import { useCartStore } from "@/zustand/cartStore";
import { Plus } from "lucide-react";
import { ALL_PRODUCTS_PREVIEWResult } from "@/lib/types";
import { MouseEvent } from "react";

type Props = {
  product: ALL_PRODUCTS_PREVIEWResult["products"][0];
};

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    console.log("AddToCartButton: Error reading currentProduct");
    return null;
  }

  const cartItem = {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    discountPrice: product.discountPrice,
    quantity: 1,
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(cartItem);
  };

  return (
    <div
      className={`${product.stock ? "right-2" : "mx-auto inset-x-0 w-fit"} group absolute bottom-2  flex items-center gap-2`}>
      {product.stock ? (
        <>
          <span className="hidden group-hover:block transition-opacity bg-white/60 px-2 rounded-md">
            Add to Cart
          </span>
          <button
            onClick={handleClick}
            className="bg-white/60 p-1 rounded-full hover:cursor-pointer hover:bg-white">
            <Plus strokeWidth={1.5} />
          </button>
        </>
      ) : (
        <span className="rounded-md flex gap-1 items-center bg-white/40 px-2 py-1 hover:cursor-auto">
          OUT OF STOCK
        </span>
      )}
    </div>
  );
}
