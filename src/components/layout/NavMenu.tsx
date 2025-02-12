"use client";

import { useMenuToggle } from "@/hooks/useMenuToggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "SHOP", href: "/shop" },
  { name: "NEW IN", href: "shop" },
  { name: "WOMANS", href: "/shop" },
  { name: "MENS", href: "/shop" },
  { name: "SALE", href: "/shop" },
];

export default function NavMenu() {
  const { isMenuOpen, setIsMenuOpen, menuButtonRef, menuRef } = useMenuToggle();
  const pathName = usePathname();

  return (
    <nav className="flex">
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden inline-block rounded-md px-2 transition-colors duration-300 hover:cursor-pointer hover:bg-purple-100">
          {isMenuOpen ? (
            <X strokeWidth={1.5} size={20} />
          ) : (
            <Menu strokeWidth={1.5} size={20} />
          )}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${pathName === link.href ? "font-bold bg-white" : "font-medium"}  inline-block tracking-tighter rounded-md py-1.5 px-2 transition-colors duration-300 hover:cursor-pointer hover:bg-purple-100`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`md:hidden absolute z-10 bottom-0 translate-y-full left-0 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow ${
          isMenuOpen
            ? "opacity-100 translate-x-2"
            : "opacity-0 -translate-x-full"
        }`}>
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`${pathName === link.href ? "font-bold bg-white" : "font-medium"}  inline-block tracking-tighter rounded-md py-1.5 px-2 transition-colors hover:cursor-pointer duration-300 hover:bg-purple-100`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
