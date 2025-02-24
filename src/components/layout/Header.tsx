import Link from "next/link";
import NavMenu from "./NavMenu";
import Cart from "./Cart";
import AccountButton from "./AccountButton";
import WishlistButton from "./WishlistButton";
import Wishlist from "../wishlist/Wishlist";

export default async function Header() {
  return (
    <header className="fixed z-10 flex justify-between p-2 w-full">
      {/* Nav */}
      <NavMenu />

      {/* logo */}
      <div className="flex bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
        <Link
          href="/"
          className="hover:cursor-pointer hover:bg-purple-100 font-bold tracking-tighter inline-block rounded-md py-1.5 px-2 w-fit transition-colors duration-300">
          DYMONÉ
        </Link>
      </div>

      <div className="flex gap-2">
        <WishlistButton>
          <Wishlist />
        </WishlistButton>
        <AccountButton />
        <Cart />
      </div>
    </header>
  );
}
