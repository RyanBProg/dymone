"use client";

import { Filter } from "lucide-react";
import { useState } from "react";
import FilterModal from "./ProductFilterModal";

export default function ProductFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative mx-auto mb-5 px-2">
      <div className="flex justify-between">
        <div className="flex items-center bg-white/60 backdrop-blur-sm shadow rounded-lg p-1">
          <button
            className="flex items-center gap-1 rounded-md p-1 hover:bg-white transition-colors hover:cursor-pointer"
            onClick={() => setIsFilterOpen(true)}>
            Filter
            <Filter size={18} />
          </button>
        </div>
        <div className="flex items-center bg-white/60 backdrop-blur-sm shadow rounded-lg p-1">
          <label htmlFor="" className="ml-1 text-sm">
            Sort
          </label>
          <div className="h-full w-px bg-neutral-300 mx-2"></div>
          <select name="" id="" className="px-1 hover:cursor-pointer">
            <option value="">Whats New</option>
            <option value="">Price High to Low</option>
            <option value="">Price Low to High</option>
          </select>
        </div>
      </div>
      <FilterModal
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </div>
  );
}
