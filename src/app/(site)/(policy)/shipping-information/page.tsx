import Link from "next/link";

export default function page() {
  return (
    <main className="bg-neutral-100 text-neutral-800 my-20 md:my-44 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem] mb-5">
            Shipping Information
          </h1>
          <p className="mt-2 text-lg">Effective Date: January 1, 2025</p>
        </div>

        {/* Content */}
        <section className="space-y-6">
          <p>
            At DYMONÉ, we are committed to delivering our exquisite jewellery
            across Australia. Please read the following shipping information
            carefully to understand your delivery options.
          </p>

          <h2 className="text-2xl font-semibold text-black">Processing Time</h2>
          <p>
            Orders typically take 1-3 business days to process before shipment.
            During high volume periods, processing times may be slightly longer.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Domestic Shipping
          </h2>
          <p>
            We ship throughout Australia using reputable courier services.
            Standard delivery usually takes 3-7 business days, depending on your
            location. For metropolitan areas, delivery may be faster.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            International Shipping
          </h2>
          <p>
            International shipping is available to select countries. Please note
            that delivery times and shipping costs will vary based on the
            destination and are subject to customs clearance delays.
          </p>

          <h2 className="text-2xl font-semibold text-black">Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on your location and
            the weight of your order. Free standard shipping may be available on
            orders over a specified value.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Tracking & Delivery
          </h2>
          <p>
            Once your order has been shipped, you will receive a tracking number
            via email. Use this number to track your package&apos;s progress
            until it is delivered.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Contact Information
          </h2>
          <p>
            If you have any questions regarding shipping or your order status,
            please{" "}
            <Link
              href="/contact-us"
              className="text-black underline hover:text-neutral-400">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
