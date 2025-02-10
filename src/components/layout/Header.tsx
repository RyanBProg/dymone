"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import NavMenu from "./NavMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ["SHOP", "NEW IN", "WOMANS", "MENS", "SALE"];

  return (
    <header className="fixed flex justify-between p-2 w-full z-10">
      <NavMenu />
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <Link
          href="/"
          className="hover:cursor-pointer hover:bg-white font-bold tracking-tighter inline-block rounded-md py-1 px-2 w-fit transition-colors">
          DYMONÉ
        </Link>
      </div>
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <button className="hover:cursor-pointer hover:bg-white font-medium tracking-tighter flex justify-center rounded-md py-1 px-2 w-fit transition-colors">
          BAG
          <div className="bg-white rounded-full text-xs h-6 w-6 ml-2 flex justify-center items-center">
            0
          </div>
        </button>
      </div>
    </header>
  );
}
