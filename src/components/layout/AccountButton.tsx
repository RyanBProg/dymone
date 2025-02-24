"use client";

import { User, X } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useMenuToggle } from "@/hooks/useMenuToggle";
import { usePathname } from "next/navigation";

export default function AccountButton() {
  const { isMenuOpen, setIsMenuOpen, menuButtonRef, menuRef } = useMenuToggle();
  const pathName = usePathname();

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
            <User size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>
      <div
        ref={menuRef}
        className={`absolute z-10 bottom-0 translate-y-full right-0 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow ${
          isMenuOpen
            ? "opacity-100 -translate-x-2"
            : "opacity-0 translate-x-full"
        }`}>
        <SignedOut>
          <div className="grid gap-2">
            <p className="text-sm p-2 text-neutral-700">
              Sign in to see your account
            </p>
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <button className="grow hover:cursor-pointer hover:bg-purple-100 duration-300 font-medium tracking-tighter rounded-md py-1.5 px-2 transition-colors">
                  SIGN IN
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="grow hover:cursor-pointer hover:bg-purple-100 duration-300 font-medium tracking-tighter rounded-md py-1.5 px-2 transition-colors">
                  SIGN UP
                </button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <ul className="flex flex-col gap-2 items-end">
            <li>
              <Link
                href="/user/orders"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium inline-block tracking-tighter rounded-md py-1.5 px-2 transition-colors duration-300 hover:cursor-pointer hover:bg-purple-100">
                ORDERS
              </Link>
            </li>
            <li>
              <Link
                href="/user/account"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium inline-block tracking-tighter rounded-md py-1.5 px-2 transition-colors duration-300 hover:cursor-pointer hover:bg-purple-100">
                MY ACCOUNT
              </Link>
            </li>
            <li>
              <SignOutButton>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:cursor-pointer hover:bg-purple-100 duration-300 font-medium tracking-tighter inline-block rounded-md py-1.5 px-2 transition-colors">
                  SIGN OUT
                </button>
              </SignOutButton>
            </li>
          </ul>
        </SignedIn>
      </div>
    </>
  );
}
