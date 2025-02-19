"use client";

import { useCartStore } from "@/zustand/cartStore";
import { Plus } from "lucide-react";
import { SINGLE_PRODUCT_FULLResult } from "@/lib/types";

type Props = {
  product: SINGLE_PRODUCT_FULLResult;
  qty: number;
};

export default function AddToCartButton({ product, qty }: Props) {
  if (!product) {
    console.log("AddToCartButton: Error reading currentProduct");
    return null;
  }

  const cartItem = {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    discountPrice: product.discountPrice,
    quantity: qty,
  };

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      // onClick={() => addToCart(cartItem)}
      className="rounded-md flex gap-1 items-center transition-colors hover:bg-purple-100 hover:cursor-pointer px-2 py-1">
      <Plus strokeWidth={1.5} size={18} />
      ADD TO CART
    </button>
  );
}
