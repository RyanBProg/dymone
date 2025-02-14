"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentSort = searchParams.get("sort");

  function handleSort(sort: string) {
    const params = new URLSearchParams(searchParams);
    if (sort && sort !== currentSort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="min-h-[44px] flex items-center bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
      <label htmlFor="sort" className="ml-1 text-sm">
        Sort
      </label>
      <div className="h-full w-px bg-neutral-300 mx-2"></div>
      <select
        onChange={(e) => handleSort(e.currentTarget.value)}
        name="sort"
        id="sort"
        defaultValue={currentSort || ""}
        className="py-1 mr-1.5 hover:cursor-pointer">
        <option value="new">Whats New</option>
        <option value="pricedes">Price High to Low</option>
        <option value="priceasc">Price Low to High</option>
      </select>
    </div>
  );
}
