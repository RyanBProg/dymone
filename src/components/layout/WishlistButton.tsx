"use client";

import { Bookmark, X } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useMenuToggle } from "@/hooks/useMenuToggle";
import Wishlist from "../wishlist/Wishlist";
import { getSanityUserWishlist } from "@/actions/user/userActions";
import { useEffect, useState } from "react";

export type WishlistData = Awaited<ReturnType<typeof getSanityUserWishlist>>;

export default function WishlistButton() {
  const { isMenuOpen, setIsMenuOpen, menuButtonRef, menuRef } = useMenuToggle();
  const [data, setData] = useState<WishlistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    setIsLoading(true);
    const wishlistData = await getSanityUserWishlist();
    setData(wishlistData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [isMenuOpen]);

  return (
    <>
      <div className="relative flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="relative hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 transition-colors duration-300">
          {isMenuOpen ? (
            <X strokeWidth={1.5} size={20} />
          ) : (
            <Bookmark size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>
      <div
        ref={menuRef}
        className={`sm:w-[450px] absolute z-10 bottom-0 translate-y-full left-4 sm:left-auto right-0 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-lg shadow ${
          isMenuOpen
            ? "opacity-100 -translate-x-2"
            : "opacity-0 translate-x-full"
        }`}>
        <div className="bg-white rounded-lg p-4">
          <p className="tracking-tighter font-medium">WISHLIST</p>
        </div>
        <SignedOut>
          <div className="flex flex-col gap-2 p-4">
            <p className="text-sm p-2 text-neutral-700 text-center w-full mb-5">
              Sign in to see your wishlist
            </p>
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <button className="grow hover:cursor-pointer hover:bg-purple-100 font-medium tracking-tighter rounded-md py-1.5 px-2 transition-colors">
                  SIGN IN
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="grow hover:cursor-pointer hover:bg-purple-100 font-medium tracking-tighter rounded-md py-1.5 px-2 transition-colors">
                  SIGN UP
                </button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <Wishlist
            isLoading={isLoading}
            data={data}
            fetchWishlist={fetchWishlist}
          />
        </SignedIn>
      </div>
    </>
  );
}
