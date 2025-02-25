"use client";

import { useEffect } from "react";
import { useCartStore } from "@/zustand/cartStore";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="my-20 sm:my-44 px-2 flex flex-col items-center gap-5">
      <h1 className="tracking-tighter font-extrabold text-[4rem] mb-5">
        Thank You!
      </h1>
      <p>Your order has been confirmed</p>
      <div className="flex justify-center items-center w-fit gap-5 bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <Link
          href="/shop"
          className="hover:cursor-pointer hover:bg-purple-100 text-sm rounded-md px-2 py-1 transition-colors duration-300 flex gap-1 items-center disabled:opacity-10 disabled:bg-white disabled:cursor-auto">
          <ChevronLeft size={14} strokeWidth={1.5} />
          Back to shop
        </Link>
      </div>
      <div></div>
    </main>
  );
}
