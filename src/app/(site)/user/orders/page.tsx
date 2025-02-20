import { currentUser } from "@clerk/nextjs/server";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  // use clerk userId to search order accosiatied with that id
  //

  const orders: string[] = [];

  return (
    <main className="my-20 px-2">
      <h1 className="tracking-tighter font-extrabold text-[4rem] mb-5">
        My Orders
      </h1>
      <div>
        {orders.length ? (
          orders.map((order) => <>order</>)
        ) : (
          <div className="flex flex-col items-center gap-10 mt-20">
            <p className="text-lg font-medium text-neutral-500">
              No Orders Found
            </p>
            <div className="flex justify-center items-center w-fit gap-5 bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
              <Link
                href="/shop"
                className="hover:cursor-pointer hover:bg-purple-100 text-sm rounded-md px-2 py-1 transition-colors duration-300 flex gap-1 items-center disabled:opacity-10 disabled:bg-white disabled:cursor-auto">
                <ChevronLeft size={14} strokeWidth={1.5} />
                Back to shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
