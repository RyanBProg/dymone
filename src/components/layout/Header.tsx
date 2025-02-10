"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import NavMenu from "./NavMenu";
import Cart from "./Cart";

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

      {/* Cart */}
      <Cart />
    </header>
  );
}
