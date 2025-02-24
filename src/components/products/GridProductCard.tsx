import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS_PREVIEWResult } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";

type Props = {
  product: ALL_PRODUCTS_PREVIEWResult["products"][0];
};

export default function GridProductCard({ product }: Props) {
  return (
    <article>
      <Link
        href={`/shop/${product._id}`}
        className="block relative h-[400px] w-full overflow-clip rounded-3xl">
        <Image
          src={product.image.url}
          alt={product.image.alt || "product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
          priority
        />
        <AddToWishlistButton product={product} />
        <AddToCartButton product={product} />
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
