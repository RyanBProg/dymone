"use client";

import { Bookmark } from "lucide-react";
import { ALL_PRODUCTS_PREVIEWResult } from "@/lib/types";
import { MouseEvent, useState } from "react";
import { addItemToWishlist } from "@/actions/user/userActions";
import LoadingSpinner from "../common/LoadingSpinner";

type Props = {
  product: ALL_PRODUCTS_PREVIEWResult["products"][0];
};

export default function AddToWishlistButton({ product }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  if (!product) {
    console.log("AddToCartButton: Error reading currentProduct");
    return null;
  }

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addItemToWishlist(product._id);
      // Add succes toast here
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      // add failed toast here
    }
    setIsLoading(false);
  };

  return (
    <div className="group absolute top-2 right-2 flex items-center gap-2">
      {!isLoading && (
        <span className="hidden group-hover:block transition-opacity bg-white/60 px-2 rounded-md">
          Add to Wishlist
        </span>
      )}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${isLoading ? "hover:cursor-auto" : "hover:cursor-pointer hover:bg-white"} bg-white/60 flex justify-center items-center p-1 h-8 w-8 rounded-full`}>
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <Bookmark size={20} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
