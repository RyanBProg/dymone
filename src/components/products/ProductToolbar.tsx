"use client";

import { Filter, Search } from "lucide-react";
import { useState } from "react";
import FilterModal from "./ProductFilterModal";

export default function ProductToolbar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="my-5 px-2 flex gap-2 flex-wrap justify-between md:justify-start">
      {/* filter button */}
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 py-1.5 transition-colors duration-300 flex gap-1 items-center">
          Filter
          <Filter strokeWidth={1.5} size={20} />
        </button>
      </div>

      {/* sort dropdown */}
      <div className="min-h-[44px] flex items-center bg-white/60 backdrop-blur-sm shadow rounded-lg p-1">
        <label htmlFor="" className="ml-1 text-sm">
          Sort
        </label>
        <div className="h-full w-px bg-neutral-300 mx-2"></div>
        <select name="" id="" className="py-1 mr-1.5 hover:cursor-pointer">
          <option value="">Whats New</option>
          <option value="">Price High to Low</option>
          <option value="">Price Low to High</option>
        </select>
      </div>
      <FilterModal
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      {/* search bar */}
      <div className="grow ml-auto flex items-center gap-2 bg-white/70 backdrop-blur-sm shadow rounded-lg p-1 min-w-[200px] md:max-w-[350px] w-full">
        <button className="hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 py-1.5 transition-colors duration-300 flex gap-1 items-center">
          <Search strokeWidth={1.5} size={20} />
        </button>
        <input
          type="text"
          placeholder="..."
          className="mr-1.5 min-w-0 w-full"
        />
      </div>
    </div>
  );
}
