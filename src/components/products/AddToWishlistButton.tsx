"use client";

import { Bookmark } from "lucide-react";
import { MouseEvent, useState } from "react";
import { addItemToWishlist } from "@/actions/user/userActions";
import LoadingSpinner from "../common/LoadingSpinner";
import toast from "react-hot-toast";
import { ALL_PRODUCTS_PREVIEWResult } from "../../../sanity.types";

type Props = {
  product: ALL_PRODUCTS_PREVIEWResult["products"][0];
};

export default function AddToWishlistButton({ product }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  if (!product) {
    console.log("AddToCartButton: Error reading currentProduct");
    return null;
  }

  const handleAddToWishlist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let errorMessage = "";

    try {
      const result = await addItemToWishlist(product._id);
      console.log(result);
      if (!result.success) {
        errorMessage = "Sign in to Add to Wishlist";
        throw new Error("Failed to add item to wishlist");
      }

      toast("Item Added to Wishlist", {
        position: "top-center",
        style: { backgroundColor: "#BCF0DA" },
      });
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast(errorMessage || "Could Not Add Item to Wishlist", {
        position: "top-center",
        style: { backgroundColor: "#F8B4B4" },
      });
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
        onClick={handleAddToWishlist}
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
