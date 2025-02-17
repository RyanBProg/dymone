import Link from "next/link";
import React from "react";

export default function ErrorFetchingProducts() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <span className="leading-24 absolute top-0 left-0 text-[25vw] tracking-tighter font-extrabold text-black/5">
        DYMONÉ
      </span>
      <span className="leading-28 absolute bottom-0 left-0 text-[25vw] tracking-tighter font-extrabold text-black/5">
        DYMONÉ
      </span>
      <div>
        <div className="mb-10">
          <h1 className="tracking-tighter font-medium text-[3rem] mb-5 text-center">
            ERROR FETCHING PRODUCTS
          </h1>
        </div>
        <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1 w-fit mx-auto">
          <Link
            href="/"
            className="hover:cursor-pointer hover:bg-white font-bold tracking-tighter inline-block rounded-md py-1 px-2 transition-colors">
            GO TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
