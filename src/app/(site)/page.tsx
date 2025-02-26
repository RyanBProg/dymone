import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="relative">
      <section className="h-screen w-screen sticky top-0 z-10">
        <Image src="/banner-1.jpeg" alt="" fill className="object-cover" />
        <h1 className="tracking-tighter leading-14 sm:leading-23 md:leading-28 lg:leading-34 font-extrabold text-[4rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] text-white/80 absolute max-w-min left-2 sm:left-5 md:left-20 top-1/2 -translate-y-1/2">
          ELEGENCE <span className="text-white/60">CRAFTED</span>
        </h1>
      </section>

      <section className="w-full h-screen bg-black sticky top-0 z-20">
        <div className="h-full flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="h-[400px] w-[300px] rounded-xl overflow-clip">
            <Image
              src="/product-2.jpeg"
              alt=""
              width={300}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col max-w-[300px] gap-10">
            <h3 className="text-white text-5xl tracking-tighter">
              NEW SEASON IS HERE
            </h3>
            <p className="text-neutral-400 text-lg">
              The latest jewellery styles have just arrived, bringing fresh
              designs and timeless beauty. Elevate your collection with stunning
              new pieces, perfect for any occasion. Explore them in-store today!
            </p>
            <Link
              className="mt-auto text-white text-lg flex items-center gap-2"
              href="/shop">
              SEE MORE
              <MoveUpRight strokeWidth={1.5} size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="h-screen w-screen sticky top-0 z-30">
        <Image src="/banner-2.jpeg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="absolute inset-5 sm:inset-10 md:inset-20 overflow-clip rounded-4xl shadow">
          <Image src="/banner-2.jpeg" alt="" fill className="object-cover" />
          <div className="relative text-white p-10 flex flex-col gap-5 justify-center h-full">
            <h2 className="tracking-tighter text-4xl font-extrabold sm:text-6xl">
              Little Details, Big Statement
            </h2>
            <Link
              className="w-fit text-lg flex items-center gap-2"
              href="/shop">
              EARRINGS RANGE
              <MoveUpRight strokeWidth={1.5} size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-40 h-screen bg-purple-100 py-20 px-5 md:px-20 flex flex-col justify-center gap-20">
        <h2 className="tracking-tighter text-4xl md:text-7xl font-medium max-w-prose">
          Jewellery is more than an accessory—it&apos;s a reflection of who you
          are. Every detail is carefully considered, ensuring beauty, quality,
          and sophistication in every design.
        </h2>
        <Link
          className="mx-auto w-fit text-lg flex items-center gap-2"
          href="/shop">
          SHOP YOUR STYLE
          <MoveUpRight strokeWidth={1.5} size={14} />
        </Link>
      </section>
    </main>
  );
}
