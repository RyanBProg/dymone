import { Plus } from "lucide-react";
import ProductGallery from "@/components/products/ProductGallery";
import { GET_PRODUCT_QUERYResult } from "../../../../../sanity.types";
import ErrorFetchingProducts from "@/components/products/ErrorFetchingProducts";
import { getProductById } from "@/actions/sanity";
import ProductDetailsDrawer from "@/components/products/ProductDetailsDrawer";

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function page({ params }: Props) {
  const { productId } = await params;
  const { data: product } = (await getProductById(productId)) as {
    data: GET_PRODUCT_QUERYResult;
  };

  if (!product) {
    console.log("Error fetching product data");
    return <ErrorFetchingProducts />;
  }

  console.log(product);

  return (
    <div>
      <section className="relative flex flex-col">
        <ProductGallery images={product.images!} />
        <div className="m-2 md:m-0 md:absolute md:max-w-md md:right-2 md:bottom-2 grid gap-2">
          <div className="bg-white/70 backdrop-blur-sm shadow rounded-lg p-4">
            <h1 className="font-bold text-lg mb-2">{product.name}</h1>
            <div className="flex gap-1 items-center">
              <span className="font-light">
                ${product.discountPrice ? product.discountPrice : product.price}
              </span>
              {product.discountPrice && (
                <span className="font-light line-through text-xs">
                  ${product.price}
                </span>
              )}
            </div>
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
                id="item_qty"
                className="border border-gray-400 rounded-md block w-16 px-2 py-1"
                defaultValue={1}
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
          {(product.description &&
            product.description
              .map((block: any) =>
                block.children?.map((child: any) => child.text).join(" ")
              )
              .join("\n")) ||
            ""}
        </p>
        <ul>
          <li className="md:text-right">
            <span className="mr-2 font-bold">SKU</span>
            {product.sku}
          </li>
          <li className="md:text-right">
            <span className="mr-2 font-bold">Category</span>
            {product.productCategory?.name}
          </li>
          <li className="md:text-right">
            <span className="mr-2 font-bold">Tags</span>
            {product.gender}, {product.material?.name}, {product.stone?.name}
          </li>
        </ul>
      </section>
      <section className="mt-10 mb-20 md:my-20">
        <ProductDetailsDrawer productData={product} />
      </section>
    </div>
  );
}
