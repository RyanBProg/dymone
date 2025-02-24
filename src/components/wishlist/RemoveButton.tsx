"use client";

import { deleteItemFromWishlist } from "@/actions/user/userActions";
import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import toast from "react-hot-toast";

type Props = {
  itemId: string;
  onRemove: () => Promise<void>;
};

export default function RemoveButton({ itemId, onRemove }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      const result = await deleteItemFromWishlist(itemId);
      if (result.success) {
        toast("Item Removed From Wishlist", {
          position: "top-center",
          style: { backgroundColor: "#BCF0DA" },
        });
        await onRemove();
      }
    } catch (error) {
      console.error("Failed to remove item: ", error);
      toast("Could Not Remove Item From Wishlist", {
        position: "top-center",
        style: { backgroundColor: "#F8B4B4" },
      });
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="w-16 flex justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );

  return (
    <button
      onClick={handleRemove}
      className="hover:cursor-pointer hover:bg-neutral-200 py-1 px-2 text-sm h-fit flex justify-center items-center bg-neutral-300 rounded-full transition-colors duration-300">
      Remove
    </button>
  );
}
