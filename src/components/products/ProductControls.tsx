"use client";

import { Bookmark, Plus } from "lucide-react";
import { useCartStore } from "@/zustand/cartStore";
import { useState } from "react";
import { addItemToWishlist } from "@/actions/user/userActions";
import LoadingSpinner from "../common/LoadingSpinner";
import toast from "react-hot-toast";
import { SINGLE_PRODUCT_FULLResult } from "../../../sanity.types";

type Props = {
  product: SINGLE_PRODUCT_FULLResult;
};

export default function ProductControls({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState(false);

  if (!product) {
    return null;
  }

  const handleAddToWishlist = async () => {
    setIsLoading(true);

    try {
      await addItemToWishlist(product._id);
      toast("Item Added to Wishlist", {
        position: "top-center",
        style: { backgroundColor: "#BCF0DA" },
      });
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast("Could Not Add Item to Wishlist", {
        position: "top-center",
        style: { backgroundColor: "#F8B4B4" },
      });
    }
    setIsLoading(false);
  };

  const cartItem = {
    id: product._id,
    name: product.name!,
    price: product.price!,
    image: { url: product.images![0].url!, alt: product.images![0].alt },
    discountPrice: product.discountPrice,
    quantity: quantity,
  };

  const handleAddToCart = () => {
    addToCart(cartItem);
    toast("Item Added to Cart", {
      position: "top-center",
      style: { backgroundColor: "#BCF0DA" },
    });
  };

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
            max={product.stock!}
            required
          />
        </label>
      </div>
      <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4 flex justify-between">
        {product.stock! < 1 ? (
          <span className="rounded-md flex gap-1 items-center bg-neutral-300 px-2 py-1">
            OUT OF STOCK
          </span>
        ) : (
          <>
            <button
              onClick={handleAddToCart}
              className="rounded-md flex gap-1 items-center transition-colors hover:bg-purple-100 hover:cursor-pointer px-2 py-1">
              <Plus strokeWidth={1.5} size={18} />
              ADD TO CART
            </button>
            <button
              onClick={handleAddToWishlist}
              disabled={isLoading}
              className={`${isLoading ? "hover:cursor-auto" : "hover:cursor-pointer hover:bg-purple-100"} flex justify-center items-center p-1 h-8 w-8 rounded-md`}>
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Bookmark size={20} strokeWidth={1.5} />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
