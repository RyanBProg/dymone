import { Plus } from "lucide-react";
import ProductGallery from "@/components/products/ProductGallery";
const productImages = [
  { src: "/product.jpeg?height=1080&width=1920", alt: "Product 1" },
  { src: "/product.jpeg?height=1080&width=1920", alt: "Product 2" },
  { src: "/product.jpeg?height=1080&width=1920", alt: "Product 3" },
  { src: "/product.jpeg?height=1080&width=1920", alt: "Product 4" },
  { src: "/product.jpeg?height=1080&width=1920", alt: "Product 5" },
];

export default function page() {
  return (
    <div>
      <section className="relative flex flex-col">
        <ProductGallery images={productImages} />
        <div className="m-2 md:m-0 md:absolute md:max-w-md md:right-2 md:bottom-2 grid gap-2">
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
            <p className="font-bold text-lg">Product Title</p>
            <p className="text-lg">$79.99</p>
            <p className="mt-2 text-neutral-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              voluptates reiciendis debitis. Quaerat, sed animi soluta,
              suscipit, molestias at corrupti quos quam id beatae neque?
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4 flex justify-between">
            <div>
              <p className="text-xs underline underline-offset-2">Sizes</p>
              <div className="mt-2">
                <button className="hover:bg-white hover:cursor-pointer transition-colors rounded-md px-2 py-1 border border-neutral-400">
                  One Size
                </button>
              </div>
            </div>
            <label className="flex flex-col text-right gap-2">
              <span className="text-xs underline underline-offset-2">Qty</span>
              <input
                type="number"
                id="last_name"
                className="border border-gray-200 rounded-md block w-16 px-2 py-1"
                placeholder="Doe"
                required
              />
            </label>
          </div>
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
            <button className="rounded-md flex gap-1 items-center transition-colors hover:bg-purple-100 hover:cursor-pointer px-2 py-1">
              <Plus strokeWidth={1.5} size={18} />
              ADD TO CART
            </button>
          </div>
        </div>
      </section>
      <section className="px-4 my-10 md:my-20 flex flex-col gap-10 justify-between md:flex-row">
        <p className="mt-2 text-neutral-700 text-base max-w-prose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          voluptates reiciendis debitis. Quaerat, sed animi soluta, suscipit,
          molestias at corrupti quos quam id beatae neque? Lorem ipsum dolor,
          sit amet consectetur adipisicing elit. Nostrum, veniam sequi nesciunt
          vel unde expedita hic quam pariatur tenetur nam? Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Doloribus dolore in nulla
          nobis vel libero sunt delectus eveniet inventore magni.
        </p>
        <ul>
          <li className="md:text-right">
            <span className="mr-2 font-bold">SKU</span>
            0192
          </li>
          <li className="md:text-right">
            <span className="mr-2 font-bold">Category</span>Watches
          </li>
          <li className="md:text-right">
            <span className="mr-2 font-bold">Tags</span>Watches, Gold, Womans
          </li>
        </ul>
      </section>
      <section className="mt-10 mb-20 md:my-20">
        <div className="p-4 rounded-lg mx-auto bg-neutral-200 max-w-4xl">
          <ul className="grid gap-4">
            <li>
              <button className="flex gap-2 items-center hover:bg-white w-full px-2 py-1 rounded-md transition-colors">
                <Plus strokeWidth={1.5} size={16} />
                Product Details
              </button>
            </li>
            <li>
              <button className="flex gap-2 items-center hover:bg-white w-full px-2 py-1 rounded-md transition-colors">
                <Plus strokeWidth={1.5} size={16} />
                Materials
              </button>
            </li>
            <li>
              <button className="flex gap-2 items-center hover:bg-white w-full px-2 py-1 rounded-md transition-colors">
                <Plus strokeWidth={1.5} size={16} />
                Shipping and Returns
              </button>
            </li>
            <li>
              <button className="flex gap-2 items-center hover:bg-white w-full px-2 py-1 rounded-md transition-colors">
                <Plus strokeWidth={1.5} size={16} />
                Gift Wrapping
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
