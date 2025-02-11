"use client";

import { useMenuToggle } from "@/hooks/useMenuToggle";
import { Minus, Plus, ShoppingBasket, X } from "lucide-react";

const cart = [
  { title: "Gold Watch", thumbnail: "", price: "79.99", qty: 1 },
  { title: "Gold Chain", thumbnail: "", price: "49.99", qty: 3 },
];

export default function Cart() {
  const { isMenuOpen, setIsMenuOpen, menuButtonRef, menuRef } = useMenuToggle();

  return (
    <>
      <div className="relative flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="relative hover:cursor-pointer hover:bg-white font-medium rounded-md px-2 transition-colors">
          {isMenuOpen ? (
            <X strokeWidth={1.5} size={20} />
          ) : (
            <>
              <ShoppingBasket strokeWidth={1.5} size={20} />
              <div className="absolute -top-2 -left-2 bg-pink-200 w-5 h-5 p-px text-xs text-center rounded-full">
                0
              </div>
            </>
          )}
        </button>
      </div>
      <div
        ref={menuRef}
        className={`w-[300px] sm:w-[450px] absolute z-10 top-14 right-0 transition-all duration-300 bg-white/90 backdrop-blur-xs rounded-xl shadow ${
          isMenuOpen
            ? "opacity-100 -translate-x-2"
            : "opacity-0 translate-x-full"
        }`}>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="tracking-tighter font-medium">CART</p>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          {cart.map((cartItem) => (
            <li key={cartItem.title}>
              <div className="relative flex gap-4">
                <div className="h-16 w-16 bg-neutral-300 rounded-md"></div>
                <div className="grow">
                  <div className="flex">
                    <span className="grow font-medium">{cartItem.title}</span>
                    <span>${cartItem.price}</span>
                  </div>
                  <div className="flex mt-2">
                    <div className="grow flex gap-2">
                      <button className="hover:cursor-pointer p-1.5 bg-purple-100 rounded-md">
                        <Minus strokeWidth={1.5} size={12} />
                      </button>
                      <div>{1}</div>
                      <button className="hover:cursor-pointer p-1.5 bg-purple-200 rounded-md">
                        <Plus strokeWidth={1.5} size={12} />
                      </button>
                    </div>
                    <button className="hover:cursor-pointer py-1 px-2 text-sm bg-neutral-300 rounded-full">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-white rounded-xl p-4 shadow">
          <button className="w-full tracking-tighter font-medium rounded-md bg-purple-200 px-2 py-1.5">
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
