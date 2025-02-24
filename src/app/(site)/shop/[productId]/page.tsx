import ProductGallery from "@/components/products/ProductGallery";
import ErrorFetchingProducts from "@/components/products/ErrorFetchingProducts";
import { getProductById } from "@/lib/utils/sanity/sanityQueries";
import ProductDetailsDrawer from "@/components/products/ProductDetailsDrawer";
import ProductControls from "@/components/products/ProductControls";
import { groqSafeString } from "@/lib/utils/sanity/groqSafeString";

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function page({ params }: Props) {
  const { productId } = await params;
  // sanitise productId
  const safeProductId = groqSafeString(productId);

  const product = await getProductById(safeProductId);
  if (!product) {
    console.log("No product found for id: ", productId);
    return <ErrorFetchingProducts />;
  }

  return (
    <div>
      <section className="relative flex flex-col">
        <ProductGallery images={product.images} />
        <ProductControls product={product} />
      </section>
      <section className="px-4 my-10 md:my-20 flex flex-col gap-10 justify-between md:flex-row">
        <p className="mt-2 text-neutral-700 text-base max-w-prose">
          {product.description}
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
        <ProductDetailsDrawer product={product} />
      </section>
    </div>
  );
}
