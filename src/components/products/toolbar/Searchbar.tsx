"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentSearch = searchParams.get("search");

  useEffect(() => {
    if (currentSearch) {
      setSearch(currentSearch);
    }
  }, [currentSearch]);

  function handleSearch(e: FormEvent, action: "submit" | "clear") {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (search && action === "submit") {
      params.set("search", search);
      // delete current filters
    } else {
      setSearch("");
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={(e) => handleSearch(e, "submit")}
      className="grow ml-auto flex items-center gap-2 bg-white/70 backdrop-blur-sm shadow rounded-lg p-1 min-w-[200px] md:max-w-[350px] w-full">
      <button
        type="submit"
        aria-label="submit search"
        className="hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 py-1.5 transition-colors duration-300 flex gap-1 items-center">
        <Search strokeWidth={1.5} size={20} />
      </button>
      <label htmlFor="query" className="sr-only">
        search
      </label>
      <input
        id="query"
        name="query"
        type="text"
        placeholder="..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mr-1.5 min-w-0 w-full"
      />
      {currentSearch && (
        <button
          onClick={(e) => handleSearch(e, "clear")}
          aria-label="clear search"
          className="hover:cursor-pointer hover:bg-purple-100 rounded-md p-1.5 transition-colors duration-300">
          <X strokeWidth={1.5} size={16} />
        </button>
      )}
    </form>
  );
}
