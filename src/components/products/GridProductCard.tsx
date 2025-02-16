import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCTGRID_QUERYResult } from "../../../sanity.types";

type Props = {
  product: PRODUCTGRID_QUERYResult[number];
};

export default function GridProductCard({ product }: Props) {
  return (
    <article>
      <Link
        href={`/shop/${product._id}`}
        className="block relative h-[400px] w-full overflow-clip rounded-3xl">
        <Image
          src={urlFor(product.image!)?.url()}
          alt={product.name || "product image"}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
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
        <span className="font-medium">{product.name}</span>
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
    </article>
  );
}
