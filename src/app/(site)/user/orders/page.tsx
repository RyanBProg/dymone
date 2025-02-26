export const dynamic = "force-dynamic";

import { getSanityUserOrders } from "@/actions/user/userActions";
import { ChevronLeft, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function page() {
  const userOrders = await getSanityUserOrders();
  if (!userOrders.success || !userOrders.orders) {
    throw new Error("No orders found");
  }

  return (
    <main className="my-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="tracking-tighter font-extrabold text-[4rem] mb-5">
          My Orders
        </h1>
        <div className="space-y-6">
          {userOrders.orders.length ? (
            <ul className="space-y-6">
              {userOrders.orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                  {/* Order Header */}
                  <div className="flex justify-between items-start border-b border-neutral-100 pb-4">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">
                        Order #{order.orderId?.slice(-8) ?? "N/A"}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {new Date(order._createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium mb-1">
                        ${order.total?.toFixed(2) ?? "0.00"}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === "delivered"
                            ? "bg-green-100"
                            : order.status === "shipped"
                              ? "bg-blue-100"
                              : order.status === "processing"
                                ? "bg-yellow-100"
                                : order.status === "cancelled"
                                  ? "bg-red-100"
                                  : "bg-purple-100"
                        }`}>
                        {order.status ?? "pending"}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.products && (
                    <ul className="space-y-4">
                      {order.products.map((item, index) => (
                        <li
                          key={`${order._id}-${index}`}
                          className="flex gap-4">
                          <div className="h-16 w-16 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                            {item.product?.image?.url ? (
                              <Image
                                src={item.product.image.url}
                                alt={
                                  item.product.image.alt ??
                                  item.product.name ??
                                  "Product image"
                                }
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-200" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <Link
                              href={`/shop/${item.product?._id ?? ""}`}
                              className="hover:text-purple-700 transition-colors">
                              {item.product?.name ??
                                "Product name not available"}
                            </Link>
                            <div className="flex justify-between mt-1">
                              <p className="text-sm text-neutral-500">
                                Qty: {item.quantity ?? 0}
                              </p>
                              <p className="text-sm">
                                ${item.price?.toFixed(2) ?? "0.00"}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Order Footer - Shipping Address */}
                  {order.shippingAddress && (
                    <div className="border-t border-neutral-100 pt-4">
                      <div className="flex items-start gap-4">
                        <Package size={16} className="text-neutral-400 mt-1" />
                        <div className="text-sm">
                          <p className="font-medium">Shipping Address:</p>
                          <p className="text-neutral-500">
                            {order.shippingAddress.street ?? "No street"}
                            <br />
                            {order.shippingAddress.city ?? "No city"},{" "}
                            {order.shippingAddress.state ?? "No state"}{" "}
                            {order.shippingAddress.zipCode ?? "No zipcode"}
                            <br />
                            {order.shippingAddress.country ?? "No country"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-10 mt-20">
              <p className="text-lg font-medium text-neutral-500">
                No Orders Found
              </p>
              <div className="flex justify-center items-center w-fit gap-5 bg-white/70 backdrop-blur-sm shadow rounded-lg p-1">
                <Link
                  href="/shop"
                  className="hover:cursor-pointer hover:bg-purple-100 text-sm rounded-md px-2 py-1 transition-colors duration-300 flex gap-1 items-center">
                  <ChevronLeft size={14} strokeWidth={1.5} />
                  Back to shop
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
