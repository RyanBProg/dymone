"use client";

import { useMenuToggle } from "@/hooks/useMenuToggle";
import { useCartStore } from "@/zustand/cartStore";
import { Minus, Plus, ShoppingBasket, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const { isMenuOpen, setIsMenuOpen, menuButtonRef, menuRef } = useMenuToggle();
  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const checkCartExpiry = useCartStore((state) => state.checkCartExpiry);

  useEffect(() => {
    checkCartExpiry();

    // Set up periodic checks
    const interval = setInterval(() => {
      checkCartExpiry();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [checkCartExpiry]);

  // Check when menu opens
  const handleMenuToggle = () => {
    checkCartExpiry();
    setIsMenuOpen((prev) => !prev);
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    toast("Item Removed From Cart", {
      position: "top-center",
      style: { backgroundColor: "#BCF0DA" },
    });
  };

  return (
    <>
      <div className="relative flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <button
          ref={menuButtonRef}
          onClick={handleMenuToggle}
          className="relative hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 transition-colors duration-300 inline-block">
          {isMenuOpen ? (
            <X strokeWidth={1.5} size={20} />
          ) : (
            <>
              <ShoppingBasket strokeWidth={1.5} size={20} />
              <div className="absolute -top-2 -left-2 bg-purple-200 w-5 h-5 text-xs flex justify-center items-center rounded-full">
                <span>{cartItems.length}</span>
              </div>
            </>
          )}
        </button>
      </div>
      <div
        ref={menuRef}
        className={`sm:w-[450px] absolute z-10 bottom-0 translate-y-full left-4 sm:left-auto right-0 transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-lg shadow ${
          isMenuOpen
            ? "opacity-100 -translate-x-2"
            : "opacity-0 translate-x-full"
        }`}>
        <div className="bg-white rounded-lg p-4">
          <p className="tracking-tighter font-medium">CART</p>
        </div>
        <ul className="flex flex-col gap-4 p-4 max-h-[400px] overflow-y-scroll">
          {cartItems.length < 1 ? (
            <p className="text-neutral-600 text-sm text-center">
              NO ITEMS IN YOUR CART
            </p>
          ) : (
            <>
              {cartItems.map((cartItem) => (
                // cart item
                <li key={cartItem.name}>
                  <div className="relative flex gap-4">
                    <div className="h-16 w-16 bg-neutral-300 rounded-md overflow-clip flex justify-center items-center">
                      <Image
                        src={cartItem.image.url}
                        alt={cartItem.image.alt || cartItem.name}
                        className="object-cover"
                        height={64}
                        width={64}
                      />
                    </div>
                    <div className="grow">
                      <div className="flex gap-4">
                        <span className="grow font-medium">
                          {cartItem.name}
                        </span>
                        <span>${cartItem.discountPrice ?? cartItem.price}</span>
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
                          onClick={() => handleRemoveFromCart(cartItem.id)}
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
        <div className="bg-white rounded-lg p-4">
          <Link
            href="/shop/checkout"
            onClick={() => setIsMenuOpen(false)}
            className="block text-center w-full tracking-tighter font-medium rounded-md bg-purple-100 px-2 py-1.5 hover:cursor-pointer hover:bg-purple-200 transition-colors duration-300">
            CHECKOUT
          </Link>
        </div>
      </div>
    </>
  );
}
