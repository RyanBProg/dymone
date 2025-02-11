"use client";

import Link from "next/link";
import NavMenu from "./NavMenu";
import Cart from "./Cart";
import { Bookmark, User } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed z-10 flex justify-between p-2 w-full">
      {/* Nav */}
      <NavMenu />

      {/* logo */}
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <Link
          href="/"
          className="hover:cursor-pointer hover:bg-white font-bold tracking-tighter inline-block rounded-md py-1 px-2 w-fit transition-colors">
          DYMONÉ
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="relative flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
          <button className="hover:cursor-pointer hover:bg-white font-medium tracking-tighter flex justify-center items-center rounded-md px-2 transition-colors">
            <Bookmark size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="relative flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
          <button className="hover:cursor-pointer hover:bg-white font-medium tracking-tighter flex justify-center items-center rounded-md px-2 transition-colors">
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
        {/* Cart */}
        <Cart />
      </div>
    </header>
  );
}
