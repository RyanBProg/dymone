"use server";

import { getSanityUserWishlist } from "@/actions/user/userActions";
import Image from "next/image";

export default async function Wishlist() {
  const data = await getSanityUserWishlist();

  if (!data.success || !data.wishlist) {
    console.error("No wishlist found");
    return (
      <p className="text-sm p-2 text-neutral-700">Could not fetch wishlist</p>
    );
  }

  if (!data.wishlist.products || !data.wishlist.products.length) {
    return <p className="text-sm p-2 text-neutral-700">Wishlist is empty</p>;
  }

  return (
    <ul className="grid gap-4 max-h-[400px] overflow-y-scroll p-4">
      {data.wishlist?.products.map((item) => (
        // wishlist item
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
                <button className="hover:cursor-pointer hover:bg-neutral-200 py-1 px-2 text-sm h-fit bg-neutral-300 rounded-full transition-colors duration-300">
                  Remove
                </button>
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
