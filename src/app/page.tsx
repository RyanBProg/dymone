import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="h-screen w-screen">
        <Image src="/banner-1.jpeg" alt="" fill className="object-cover" />
      </section>

      <section className="relative w-full h-screen bg-black">
        {/* Mobile and Desktop Carousel */}
        <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          <div className="relative w-full h-full flex-shrink-0 snap-start flex items-center justify-center">
            {/* product */}
            <div className="flex justify-center gap-10">
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
                  Gold Chain Set
                </h3>
                <p className="text-neutral-400 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti aliquid nihil iste delectus similique modi quasi
                  neque, aut laudantium commodi rem magni quod ipsa, recusandae
                  eos impedit quam consequuntur. Corrupti?
                </p>
                <Link
                  className="mt-auto text-white text-lg flex items-center gap-2"
                  href="/shop">
                  SEE MORE
                  <MoveUpRight strokeWidth={1.5} size={14} />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative bg-purple-100 w-full h-full flex-shrink-0 snap-start flex items-center justify-center">
            {/* product */}
            <div className="flex justify-center gap-10">
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
                <h3 className="text-5xl tracking-tighter">Gold Chain Set</h3>
                <p className="text-neutral-800 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti aliquid nihil iste delectus similique modi quasi
                  neque, aut laudantium commodi rem magni quod ipsa, recusandae
                  eos impedit quam consequuntur. Corrupti?
                </p>
                <Link
                  className="mt-auto text-lg flex items-center gap-2"
                  href="/shop">
                  SEE MORE
                  <MoveUpRight strokeWidth={1.5} size={14} />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full h-full flex-shrink-0 snap-start flex items-center justify-center">
            {/* product */}
            <div className="flex justify-center gap-10">
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
                  Gold Chain Set
                </h3>
                <p className="text-neutral-400 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti aliquid nihil iste delectus similique modi quasi
                  neque, aut laudantium commodi rem magni quod ipsa, recusandae
                  eos impedit quam consequuntur. Corrupti?
                </p>
                <Link
                  className="mt-auto text-white text-lg flex items-center gap-2"
                  href="/shop">
                  SEE MORE
                  <MoveUpRight strokeWidth={1.5} size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative h-screen w-screen">
        <Image src="/banner-2.jpeg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="absolute inset-20 overflow-clip rounded-4xl shadow">
          <Image src="/banner-2.jpeg" alt="" fill className="object-cover" />
        </div>
      </section>
      <section className="h-screen bg-purple-100 py-20 px-5 md:px-20 flex flex-col justify-center gap-20">
        <h2 className="tracking-tighter text-7xl font-medium max-w-prose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          voluptates numquam earum illo natus! Architecto animi porro enim.
          Nulla consequuntur repellat eos.
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
