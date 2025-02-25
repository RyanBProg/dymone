"use client";

import { useCartStore } from "@/zustand/cartStore";
import { Plus } from "lucide-react";
import { MouseEvent } from "react";
import toast from "react-hot-toast";
import { ALL_PRODUCTS_PREVIEWResult } from "../../../sanity.types";

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
    name: product.name!,
    price: product.price!,
    image: { url: product.image!.url!, alt: product.image!.alt },
    discountPrice: product.discountPrice,
    quantity: 1,
  };

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(cartItem);
    toast("Item Added to Cart", {
      position: "top-center",
      style: { backgroundColor: "#BCF0DA" },
    });
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
            onClick={handleAddToCart}
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
