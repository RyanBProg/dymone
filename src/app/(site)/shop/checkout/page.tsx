"use client";

import Image from "next/image";
import { useCartStore } from "@/zustand/cartStore";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function page() {
  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const searchParams = useSearchParams();

  if (searchParams.get("canceled")) {
    console.log(
      "Order canceled -- continue to shop around and checkout when you&apos;re ready."
    );
  }

  return (
    <div className="my-20 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-10 md:mb-20">
          <h1 className="tracking-tighter font-extrabold text-[4rem] mb-5">
            Cart
          </h1>
          <div className="flex justify-center items-center w-fit gap-5 bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
            <Link
              href="/shop"
              className="hover:cursor-pointer hover:bg-purple-100 text-sm rounded-md px-2 py-1 transition-colors duration-300 flex gap-1 items-center disabled:opacity-10 disabled:bg-white disabled:cursor-auto">
              <ChevronLeft size={14} strokeWidth={1.5} />
              Back to shop
            </Link>
          </div>
        </div>
        <ul className="w-full flex flex-col gap-10">
          {cartItems.length < 1 ? (
            <p className="text-neutral-600 text-sm text-center">
              NO ITEMS IN YOUR CART
            </p>
          ) : (
            <>
              {cartItems.map((cartItem) => (
                // cart item
                <li key={cartItem.name}>
                  <div className="relative flex gap-4 flex-col items-center md:flex-row">
                    <div className="h-32 w-32 bg-neutral-300 rounded-md overflow-clip flex justify-center items-center">
                      <Image
                        src={cartItem.image.url}
                        alt={cartItem.image.alt || cartItem.name}
                        className="object-cover"
                        height={128}
                        width={128}
                      />
                    </div>
                    <div className="grow flex flex-col justify-center gap-3">
                      <div className="flex flex-col gap-2 md:flex-row">
                        <span className="grow font-medium text-center text-lg md:text-left">
                          {cartItem.name}
                        </span>
                        <span>${cartItem.price}</span>
                      </div>
                      <div className="flex mt-2">
                        <div className="grow flex gap-3">
                          <button
                            onClick={() => decrementCartItem(cartItem.id)}
                            className="hover:cursor-pointer p-1.5 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors duration-300">
                            <Minus strokeWidth={1.5} size={12} />
                          </button>
                          <div>{cartItem.quantity}</div>
                          <button
                            onClick={() => incrementCartItem(cartItem.id)}
                            className="hover:cursor-pointer p-1.5 bg-purple-200 rounded-md hover:bg-purple-100 transition-colors duration-300">
                            <Plus strokeWidth={1.5} size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(cartItem.id)}
                          className="hover:cursor-pointer hover:bg-neutral-200 py-1 px-2 text-sm bg-neutral-300 rounded-full transition-colors duration-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>

        <div className="bg-white rounded-lg p-4 flex justify-between items-center mt-10">
          <div>
            <p className="font-medium text-xl">Sub Total</p>
            <span className="text-lg">${409.99}</span>
          </div>
          <form action="/api/checkout_sessions" method="POST">
            <button
              type="submit"
              role="link"
              className="w-full tracking-tighter font-medium text-lg rounded-md bg-purple-100 px-10 py-1.5 hover:cursor-pointer hover:bg-purple-200 transition-colors duration-300">
              ORDER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
