import { useState, useRef, useEffect, useCallback } from "react";

export function useMenuToggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isMenuOpen, closeMenu]);

  return { isMenuOpen, setIsMenuOpen, menuButtonRef, menuRef };
}
