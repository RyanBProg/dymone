import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GridProductCard() {
  return (
    <div>
      <Link
        href="/shop/123"
        className="block relative h-[400px] w-full overflow-clip rounded-3xl">
        <Image src="/product.jpeg" alt="product" fill objectFit="cover" />
        <div className="group absolute bottom-2 right-2 flex items-center gap-2">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/60 px-2 rounded-md">
            Add to Cart
          </span>
          <button className="bg-white/60 p-1 rounded-full hover:cursor-pointer hover:bg-white">
            <Plus strokeWidth={1.5} />
          </button>
        </div>
      </Link>
      <div className="mt-2 grid gap-1">
        <span className="font-medium">Simpalé Watch</span>
        <div className="flex gap-1 items-center">
          <span className="font-light">$79.99</span>
          <span className="font-light line-through text-xs">$79.99</span>
        </div>
      </div>
    </div>
  );
}
