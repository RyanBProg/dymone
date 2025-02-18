"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { GET_PRODUCT_QUERYResult } from "../../../sanity.types";

type Props = {
  productData: GET_PRODUCT_QUERYResult;
};

export default function ProductDetailsDrawer({ productData }: Props) {
  const [materialDrawerOpen, setMaterialDrawerOpen] = useState(false);
  const [shippingDrawerOpen, setShippingDrawerOpen] = useState(false);
  const [giftDrawerOpen, setGiftDrawerOpen] = useState(false);

  if (!productData) {
    console.log("Error fetching product data");
    return null;
  }

  return (
    <div className="p-4 rounded-lg mx-auto bg-neutral-200 max-w-4xl">
      <ul className="grid gap-2">
        <li>
          <button
            className="flex gap-2 items-center hover:bg-white w-full px-2 py-1 rounded-md transition-colors"
            onClick={() => setMaterialDrawerOpen((prev) => !prev)}>
            <Plus strokeWidth={1.5} size={16} />
            Materials
          </button>
        </li>
        <div
          className={`grid ${materialDrawerOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-all duration-500`}>
          <div className="px-4 flex flex-col gap-4 overflow-hidden">
            {productData.material && (
              <div>
                <h3 className="font-medium">{productData.material.name}</h3>
                <p>{productData.material.description}</p>
              </div>
            )}
            {productData.stone && (
              <div>
                <h3 className="font-medium">{productData.stone.name}</h3>
                <p>{productData.stone.description}</p>
              </div>
            )}
          </div>
        </div>
        <li>
          <button
            className="flex gap-2 items-center hover:bg-white w-full px-2 py-1 rounded-md transition-colors"
            onClick={() => setShippingDrawerOpen((prev) => !prev)}>
            <Plus strokeWidth={1.5} size={16} />
            Shipping and Returns
          </button>
        </li>
        <div
          className={`grid ${shippingDrawerOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-all duration-500`}>
          <div className="px-4 overflow-hidden">
            We offer fast and reliable shipping, with orders typically processed
            within 1-2 business days. Standard and expedited shipping options
            are available at checkout. If you&apos;re not completely satisfied,
            we accept returns within 30 days of delivery, as long as the item is
            unused and in its original packaging. Refunds are processed within
            5-7 business days after we receive your return. For more details,
            please visit our Shipping & Returns Policy.
          </div>
        </div>
        <li>
          <button
            className="flex gap-2 items-center hover:bg-white w-full px-2 py-1 rounded-md transition-colors"
            onClick={() => setGiftDrawerOpen((prev) => !prev)}>
            <Plus strokeWidth={1.5} size={16} />
            Gift Wrapping
          </button>
        </li>
        <div
          className={`grid ${giftDrawerOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-all duration-500`}>
          <div className="px-4 overflow-hidden">
            Make your purchase extra special with our elegant gift-wrapping
            service. Each item is carefully wrapped in premium packaging,
            perfect for any occasion. Simply select the gift-wrapping option at
            checkout to add a personal touch to your order.
          </div>
        </div>
      </ul>
    </div>
  );
}
