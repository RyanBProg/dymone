"use client";

import { X } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface FilterModalProps {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export default function FilterModal({
  isFilterOpen,
  setIsFilterOpen,
}: FilterModalProps) {
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
        setIsFilterOpen(false);
      }
    },
    [setIsFilterOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => document.removeEventListener("keydown", escFunction);
  }, [escFunction]);

  return (
    <div
      className={`z-10 fixed inset-0 overflow-hidden transition-opacity duration-300 ${
        isFilterOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}>
      <div
        className="absolute inset-0 bg-black/30 transition-opacity"
        onClick={() => setIsFilterOpen(false)}></div>

      <aside
        className={`fixed bottom-2 left-0 max-w-full bg-white/90 backdrop-blur-sm rounded-lg transition-transform duration-300 transform ${
          isFilterOpen ? "translate-x-2" : "-translate-x-full"
        }`}>
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <p className="tracking-tighter font-medium">FILTERS</p>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="relative hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 transition-colors duration-300 inline-block py-1.5">
            <X strokeWidth={1.5} size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="p-4">
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
          <div className="p-4">
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
          <div className=" p-4">
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
          <div className="p-4">
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
        </div>
        <div className="bg-white/90 rounded-xl shadow p-4 flex justify-end gap-4">
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full tracking-tighter font-medium rounded-md bg-purple-100 px-2 py-1.5 hover:cursor-pointer hover:bg-purple-200 transition-colors duration-300">
            CANCEL
          </button>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full tracking-tighter font-medium rounded-md bg-purple-200 px-2 py-1.5 hover:cursor-pointer hover:bg-purple-100 transition-colors duration-300">
            APPLY
          </button>
        </div>
      </aside>
    </div>
  );
}
