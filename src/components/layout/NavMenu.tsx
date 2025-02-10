"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const navLinks = ["SHOP", "NEW IN", "WOMANS", "MENS", "SALE"];

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
    <nav className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
      <button
        ref={menuButtonRef}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden hover:cursor-pointer hover:bg-white font-medium inline-block rounded-md py-1 px-2 w-fit transition-colors">
        <Menu strokeWidth={1.5} />
      </button>
      <ul className="hidden md:flex gap-2">
        {navLinks.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="hover:cursor-pointer hover:bg-white font-medium tracking-tighter inline-block rounded-md py-1 px-2 transition-colors">
              {link}
            </Link>
          </li>
        ))}
      </ul>
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className="absolute left-0 -bottom-2 translate-y-full flex flex-col md:hidden gap-2 bg-white shadow rounded-lg p-2">
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                href="#"
                className="hover:cursor-pointer hover:bg-white font-medium tracking-tighter inline-block rounded-md py-1 px-2 min-w-max transition-colors">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
