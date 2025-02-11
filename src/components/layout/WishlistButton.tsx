"use client";

import { Bookmark, X } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useMenuToggle } from "@/hooks/useMenuToggle";

export default function WishlistButton() {
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
            <Bookmark size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>
      <div
        ref={menuRef}
        className={`absolute z-10 top-14 right-0 transition-all duration-300 bg-white/90 backdrop-blur-xs rounded-lg p-4 shadow ${
          isMenuOpen
            ? "opacity-100 -translate-x-2"
            : "opacity-0 translate-x-full"
        }`}>
        <SignedOut>
          <div className="grid gap-2">
            <p className="text-sm p-2 text-neutral-700">
              Sign in to see your wishlist
            </p>
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <button className="grow hover:cursor-pointer hover:bg-white font-medium tracking-tighter rounded-md py-1 px-2 transition-colors">
                  SIGN IN
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="grow hover:cursor-pointer hover:bg-white font-medium tracking-tighter rounded-md py-1 px-2 transition-colors">
                  SIGN UP
                </button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <p className="text-sm p-2 text-neutral-700">Wishlist is empty</p>
        </SignedIn>
      </div>
    </>
  );
}
