"use client";

import Image from "next/image";
import RemoveButton from "./RemoveButton";
import LoadingSpinner from "../common/LoadingSpinner";
import { WishlistData } from "../layout/WishlistButton";

type Props = {
  isLoading: boolean;
  data: WishlistData | null;
  fetchWishlist: () => Promise<void>;
};

export default function Wishlist({ isLoading, data, fetchWishlist }: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4 my-10">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (!data?.success || !data.wishlist) {
    return (
      <p className="text-sm p-2 text-neutral-700 text-center my-10">
        Could not fetch wishlist
      </p>
    );
  }

  if (!data.wishlist.products || !data.wishlist.products.length) {
    return (
      <p className="text-sm p-2 text-neutral-700 text-center my-10">
        Wishlist is empty
      </p>
    );
  }

  return (
    <ul className="grid gap-4 max-h-[400px] overflow-y-scroll p-4">
      {data.wishlist.products.map((item) => (
        <li key={item.name}>
          <div className="relative flex gap-4">
            <div className="h-16 w-16 bg-neutral-300 rounded-md overflow-clip flex justify-center items-center">
              <Image
                src={item.image.url ?? ""}
                alt={item.image.alt || "wishlist item"}
                className="object-cover"
                height={64}
                width={64}
              />
            </div>
            <div className="grow">
              <div className="flex gap-4">
                <span className="grow font-medium">{item.name}</span>
                <RemoveButton itemId={item._id} onRemove={fetchWishlist} />
              </div>
              <div className="mt-2">
                <span>${item.discountPrice ?? item.price}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
