"use client";

import { ArrowDownNarrowWide, ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

export default function ProductFilter() {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl mb-5">
      <div className="flex justify-between">
        <button
          className="btn btn-ghost"
          onClick={() => setFilterIsOpen((prev) => !prev)}>
          Filter
          <Filter size={18} />
        </button>
        <details className="dropdown dropdown-end">
          <summary className="btn btn-ghost">
            Sort
            <ArrowDownNarrowWide size={18} />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </details>
      </div>
      {filterIsOpen && (
        <div className="mt-5">
          <details className="dropdown">
            <summary className="btn btn-ghost">
              Gender
              <ChevronDown size={16} />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </details>
          <details className="dropdown">
            <summary className="btn btn-ghost">
              Material
              <ChevronDown size={16} />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
