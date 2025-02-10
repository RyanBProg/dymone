"use client";

import { useCallback, useEffect, useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");

  const categories = ["Rings", "Earings", "Watches", "Bracelets", "Necklaces"];
  const gender = ["Male", "Female", "Unisex"];
  const materials = [
    "Sterling Silver",
    "18k Gold",
    "9k Gold",
    "Gold Plated",
    "Perls",
    "Diamonds",
  ];

  const escFunction = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => document.removeEventListener("keydown", escFunction);
  }, [escFunction]);

  return (
    <div
      className={`z-10 fixed inset-0 overflow-hidden transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}>
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}></div>
      <aside
        className={`fixed bottom-2 left-0 max-w-full flex transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-2" : "-translate-x-full"
        }`}>
        <div className="w-screen max-w-md flex flex-col gap-2">
          <div className="bg-white/90 rounded-xl shadow p-4 flex justify-between">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}>
              <span className="sr-only">Close panel</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-white/90 rounded-xl shadow p-4">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number.parseInt(e.target.value)])
              }
              className="w-full hover:cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-xl shadow p-4">
            <h3 className="text-sm font-medium text-gray-900">Gender</h3>
            <div className="mt-2 flex gap-4">
              {gender.map((gender) => (
                <label
                  key={gender}
                  className="flex items-center w-fit hover:cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGender === gender}
                    onChange={() => setSelectedGender(gender)}
                    className="h-4 w-4 hover:cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white/90 rounded-xl shadow p-4">
            <h3 className="text-sm font-medium text-gray-900">Categories</h3>
            <div className="mt-2 space-y-2 overflow-y-scroll max-h-30">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center w-fit hover:cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategorie === category}
                    onChange={() => setSelectedCategorie(category)}
                    className="h-4 w-4 hover:cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white/90 rounded-xl shadow p-4">
            <h3 className="text-sm font-medium text-gray-900">Materials</h3>
            <div className="mt-2 space-y-2 overflow-y-scroll max-h-30">
              {materials.map((material) => (
                <label
                  key={material}
                  className="flex items-center w-fit hover:cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMaterial === material}
                    onChange={() => setSelectedMaterial(material)}
                    className="h-4 w-4 hover:cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-700">{material}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white/90 rounded-xl shadow p-4 flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white hover:cursor-pointer hover:bg-neutral-200 transition-colors"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-md text-sm font-medium bg-purple-200 hover:bg-purple-300 hover:cursor-pointer transition-colors"
              onClick={onClose}>
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
