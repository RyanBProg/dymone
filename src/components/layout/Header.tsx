import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="fixed flex justify-between p-2 w-full z-99">
      <nav className="flex bg-white/60 backdrop-blur-sm shadow rounded-lg p-1">
        <button className="md:hidden hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
          <Menu strokeWidth={1.5} />
        </button>
        <ul className="hidden md:flex gap-2">
          <li>
            <Link
              href="#"
              className="hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
              NEW IN
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
              WATCHES
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
              RINGS
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
              NECKLACES
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
              BRACELETS
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex bg-white/60 backdrop-blur-sm shadow rounded-lg p-1">
        <button className="hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
          BAG
          <span className="inline-block bg-neutral-500 text-white rounded-full h-6 w-6 ml-2">
            0
          </span>
        </button>
      </div>
    </header>
  );
}
