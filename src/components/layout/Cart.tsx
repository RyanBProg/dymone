"use client";

import { ShoppingBasket, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const cart = [
  { title: "Gold Watch", thumbnail: "", price: "79.99", qty: 1 },
  { title: "Gold Chain", thumbnail: "", price: "49.99", qty: 3 },
];

export default function Cart() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isMenuOpen]);

  const escFunction = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => document.removeEventListener("keydown", escFunction);
  }, [escFunction]);

  return (
    <div>
      <div className="relative flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="hover:cursor-pointer hover:bg-white w-10 font-medium tracking-tighter flex justify-center rounded-md py-1 px-2 transition-colors">
          {isMenuOpen ? (
            <X strokeWidth={1.5} size={20} />
          ) : (
            <>
              <ShoppingBasket strokeWidth={1.5} size={20} />
              <div className="absolute left-0 -translate-x-1/2 bg-pink-200 w-5 h-5 p-px text-xs text-center rounded-full">
                0
              </div>
            </>
          )}

          {/* BAG
          <div className="bg-white rounded-full text-xs h-6 w-6 ml-2 flex justify-center items-center">
            0
          </div> */}
        </button>
      </div>
      <div
        ref={menuRef}
        className={`absolute z-10 top-14 right-0 transition-all duration-300 bg-white/90 backdrop-blur-xs rounded-xl p-4 shadow ${
          isMenuOpen
            ? "opacity-100 -translate-x-2"
            : "opacity-0 translate-x-full"
        }`}>
        <ul className="flex flex-col gap-2">
          {cart.map((cartItem) => (
            <li key={cartItem.title}>
              <div className="relative flex gap-4 w-[300px]">
                <div className="h-16 w-16 bg-neutral-300 rounded-md"></div>
                <div className="grid grid-rows-2 gap-1 grow">
                  <span className="font-medium">{cartItem.title}</span>
                  <div className="flex gap-4">
                    <span>${cartItem.price}</span>
                    <span className="justify-self-end">
                      <span className="text-xs mr-0.5">Qty</span> {cartItem.qty}
                    </span>
                  </div>
                  <button className="hover:cursor-pointer absolute top-4 right-0 p-1 bg-red-200 rounded-full flex justify-center items-center">
                    <X strokeWidth={1.5} size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
