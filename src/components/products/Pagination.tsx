"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ALL_PRODUCTS_PREVIEWResult } from "../../../sanity.types";

type Props = {
  productsPreviewData: ALL_PRODUCTS_PREVIEWResult;
};

export default function Pagination({ productsPreviewData }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageNumber = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(productsPreviewData.total / 12);
  const hasNextPage = pageNumber < totalPages;
  const hasPrevPage = pageNumber > 1;

  // debugging
  // console.log("hasNextPage: ", hasNextPage);
  // console.log("hasPrevPage: ", hasPrevPage);
  // console.log("totalPages: ", totalPages);
  // console.log("data: ", productsPreviewData);

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (pageNumber + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (pageNumber - 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto flex justify-center items-center w-fit gap-5 mt-20 bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
      <button
        className="hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 py-1.5 transition-colors duration-300 flex gap-1 items-center disabled:opacity-10 disabled:bg-white disabled:cursor-auto"
        onClick={handlePrevPage}
        disabled={!hasPrevPage}>
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <span className="text-neutral-600">
        Page {pageNumber} of {totalPages}
      </span>
      <button
        className="hover:cursor-pointer hover:bg-purple-100 rounded-md px-2 py-1.5 transition-colors duration-300 flex gap-1 items-center disabled:opacity-10 disabled:bg-white disabled:cursor-auto"
        onClick={handleNextPage}
        disabled={!hasNextPage}>
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
