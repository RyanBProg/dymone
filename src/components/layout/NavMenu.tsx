"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const navLinks = [
  { name: "SHOP", href: "/shop" },
  { name: "NEW IN", href: "shop" },
  { name: "WOMANS", href: "/shop" },
  { name: "MENS", href: "/shop" },
  { name: "SALE", href: "/shop" },
];

export default function NavMenu() {
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
    <nav>
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
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
                className="hover:cursor-pointer hover:bg-white font-medium tracking-tighter inline-block rounded-md py-1 px-2 transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`md:hidden absolute z-10 top-14 left-0 transition-all duration-300 bg-white/90 backdrop-blur-xs rounded-xl p-4 shadow ${
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
                className="hover:cursor-pointer hover:bg-white font-medium tracking-tighter inline-block rounded-md py-1 px-2 min-w-max transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
