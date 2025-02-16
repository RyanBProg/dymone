"use client";

import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  STONES_QUERYResult,
} from "../../../../sanity.types";

type Props = {
  categories: CATEGORIES_QUERYResult;
  materials: MATERIALS_QUERYResult;
  stones: STONES_QUERYResult;
};

export default function ProductFilterModal({
  categories,
  materials,
  stones,
}: Props) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStones, setSelectedStones] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const genderOptions = ["Male", "Female", "Unisex"];

  const MAX_PRICE = 1000; // <- get this from sanity
  // TODO: add useEffect to setPriceRange to MAX_PRICE from sanity

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentGenders = searchParams.get("gender");
  const currentCategories = searchParams.get("category");
  const currentMaterials = searchParams.get("material");
  const currentStones = searchParams.get("stone");
  const currentMinPrice = searchParams.get("minprice");
  const currentMaxPrice = searchParams.get("maxprice");

  // Sets all of the filters based off the url, if someone navigates to the url directly
  useEffect(() => {
    if (currentGenders) {
      setSelectedGenders(currentGenders.split(","));
    }
    if (currentCategories) {
      setSelectedCategories(currentCategories.split(","));
    }
    if (currentMaterials) {
      setSelectedMaterials(currentMaterials.split(","));
    }
    if (currentStones) {
      setSelectedStones(currentStones.split(","));
    }
    if (currentMinPrice || currentMaxPrice) {
      setPriceRange([
        Number(currentMinPrice || 0),
        Number(currentMaxPrice || MAX_PRICE),
      ]);
    }
  }, [
    currentGenders,
    currentCategories,
    currentMaterials,
    currentStones,
    currentMinPrice,
    currentMaxPrice,
  ]);

  // esc key monitoring
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

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    if (currentGenders) {
      params.delete("gender");
    }
    if (currentCategories) {
      params.delete("category");
    }
    if (currentMaterials) {
      params.delete("material");
    }
    if (currentStones) {
      params.delete("stone");
    }
    if (currentMinPrice) {
      params.delete("minprice");
    }
    if (currentMaxPrice) {
      params.delete("maxprice");
    }

    replace(`${pathname}?${params.toString()}`);
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedMaterials([]);
    setSelectedStones([]);
    setPriceRange([0, MAX_PRICE]);
    setIsFilterOpen(false);
  };

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  function handleFilter(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (selectedGenders.length >= 1) {
      params.set("gender", selectedGenders.join(","));
    } else {
      params.delete("gender");
    }
    if (selectedCategories.length >= 1) {
      params.set("category", selectedCategories.join(","));
    } else {
      params.delete("category");
    }
    if (selectedMaterials.length >= 1) {
      params.set("material", selectedMaterials.join(","));
    } else {
      params.delete("material");
    }
    if (selectedStones.length >= 1) {
      params.set("stone", selectedStones.join(","));
    } else {
      params.delete("stone");
    }
    if (priceRange[0] !== 0) {
      params.set("minprice", priceRange[0].toString());
    } else {
      params.delete("minprice");
    }
    if (priceRange[1] !== 100) {
      params.set("maxprice", priceRange[1].toString());
    } else {
      params.delete("maxprice");
    }

    replace(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  }

  return (
    <>
      {/* filter button */}
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 py-1.5 transition-colors duration-300 flex gap-1 items-center">
          Filter
          <Filter strokeWidth={1.5} size={20} />
        </button>
      </div>

      {/* filter modal */}
      <div
        className={`z-10 fixed inset-0 overflow-hidden transition-opacity duration-300 ${
          isFilterOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}>
        <div
          className="absolute inset-0 bg-black/30 transition-opacity"
          onClick={() => setIsFilterOpen(false)}></div>
        <form
          onSubmit={handleFilter}
          className={`fixed bottom-2 left-0 max-w-full bg-white/90 backdrop-blur-sm rounded-lg transition-transform duration-300 transform ${
            isFilterOpen ? "translate-x-2" : "-translate-x-full"
          }`}>
          {/* title */}
          <div className="bg-white rounded-lg p-2 sm:p-4 flex items-center justify-between">
            <p className="tracking-tighter font-medium">FILTERS</p>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="relative hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 transition-colors duration-300 inline-block py-1.5">
              <X strokeWidth={1.5} size={20} />
            </button>
          </div>

          {/* filters */}
          <div className="flex flex-col gap-4 sm:gap-8 p-2 sm:p-6">
            {/* price slider */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Price Range
              </h3>
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-2 bg-purple-200 rounded-full"
                    style={{
                      left: `${(priceRange[0] / 1000) * 100}%`,
                      right: `${100 - (priceRange[1] / 1000) * 100}%`,
                    }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Math.min(Number(e.target.value), priceRange[1] - 10),
                      priceRange[1],
                    ])
                  }
                  className="absolute w-full -top-1 h-4 appearance-none bg-transparent pointer-events-none"
                />
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Math.max(Number(e.target.value), priceRange[0] + 10),
                    ])
                  }
                  className="absolute w-full -top-1 h-4 appearance-none bg-transparent pointer-events-none"
                />
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Min</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Math.min(Number(e.target.value), priceRange[1] - 10),
                        priceRange[1],
                      ])
                    }
                    className="w-24 p-1 text-sm rounded-sm border border-neutral-400 bg-white shadow"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Max</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Math.max(Number(e.target.value), priceRange[0] + 10),
                      ])
                    }
                    className="w-24 p-1 text-sm rounded-sm border border-neutral-400 bg-white shadow"
                  />
                </div>
              </div>
            </div>

            {/* gender */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Gender</h3>
              <div className="mt-2 flex gap-4">
                {genderOptions.map((gender) => (
                  <label
                    key={gender}
                    className="capitalize flex items-center w-fit hover:cursor-pointer">
                    <input
                      type="checkbox"
                      value={gender}
                      checked={selectedGenders.includes(gender)}
                      onChange={() =>
                        handleCheckboxChange(
                          gender,
                          selectedGenders,
                          setSelectedGenders
                        )
                      }
                      className="h-4 w-4 hover:cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Categories</h3>
              <div className="mt-2 space-y-2 overflow-y-scroll h-16 sm:h-24">
                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center w-fit hover:cursor-pointer">
                    <input
                      type="checkbox"
                      value={category.name!}
                      checked={selectedCategories.includes(category.name!)}
                      onChange={() =>
                        handleCheckboxChange(
                          category.name!,
                          selectedCategories,
                          setSelectedCategories
                        )
                      }
                      className="h-4 w-4 hover:cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* materials */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Materials</h3>
              <div className="mt-2 space-y-2 overflow-y-scroll h-16 sm:h-24">
                {materials.map((material) => (
                  <label
                    key={material._id}
                    className="flex items-center w-fit hover:cursor-pointer">
                    <input
                      type="checkbox"
                      value={material.name!}
                      checked={selectedMaterials.includes(material.name!)}
                      onChange={() =>
                        handleCheckboxChange(
                          material.name!,
                          selectedMaterials,
                          setSelectedMaterials
                        )
                      }
                      className="h-4 w-4 hover:cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {material.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* stones */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Stones</h3>
              <div className="mt-2 space-y-2 overflow-y-scroll h-16 sm:h-24">
                {stones.map((stone) => (
                  <label
                    key={stone._id}
                    className="flex items-center w-fit hover:cursor-pointer">
                    <input
                      type="checkbox"
                      value={stone.name!}
                      checked={selectedStones.includes(stone.name!)}
                      onChange={() =>
                        handleCheckboxChange(
                          stone.name!,
                          selectedStones,
                          setSelectedStones
                        )
                      }
                      className="h-4 w-4 hover:cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {stone.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* form buttons */}
          <div className="bg-white/90 rounded-xl shadow p-2 sm:p-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={clearFilters}
              className="w-full tracking-tighter font-medium rounded-md bg-purple-100 px-2 py-1.5 hover:cursor-pointer hover:bg-purple-200 transition-colors duration-300">
              Clear All
            </button>
            <button
              type="submit"
              className="w-full tracking-tighter font-medium rounded-md bg-purple-200 px-2 py-1.5 hover:cursor-pointer hover:bg-purple-100 transition-colors duration-300">
              APPLY
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
