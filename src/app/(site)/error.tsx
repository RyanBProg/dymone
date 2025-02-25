"use client";

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function Error({ error }: { error: Error }) {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <span className="leading-24 absolute top-0 left-0 text-[25vw] tracking-tighter font-extrabold text-black/5">
        DYMONÉ
      </span>
      <span className="leading-28 absolute bottom-0 left-0 text-[25vw] tracking-tighter font-extrabold text-black/5">
        DYMONÉ
      </span>
      <div>
        <div className="mb-10">
          <h1 className="tracking-tighter font-medium text-[3rem] mb-5 text-center">
            Page Error
          </h1>
          {error.message && (
            <p className="text-neutral-600 max-w-prose text-center">
              {error.message}
            </p>
          )}
        </div>
        <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1 w-fit mx-auto">
          <Link
            href="/"
            className="hover:cursor-pointer hover:bg-white font-bold tracking-tighter inline-block rounded-md py-1 px-2 transition-colors">
            GO TO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
