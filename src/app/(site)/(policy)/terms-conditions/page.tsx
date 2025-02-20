import Link from "next/link";

export default function page() {
  return (
    <main className="bg-neutral-100 text-neutral-800 my-20 md:my-44 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem] mb-5">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-lg">Effective Date: January 1, 2025</p>
        </div>

        {/* Content */}
        <section className="space-y-6">
          <p>
            Welcome to DYMONÉ. Please read these Terms and Conditions carefully
            before using our website. By accessing or using our website, you
            agree to be bound by these terms.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Use of Our Website
          </h2>
          <p>
            You agree to use our website only for lawful purposes and in a way
            that does not infringe the rights of, restrict, or inhibit anyone
            else’s use and enjoyment of the website.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Orders and Payments
          </h2>
          <p>
            All orders submitted via our website are subject to acceptance and
            availability. We reserve the right to refuse or cancel any order at
            any time. Prices are in Australian dollars and include applicable
            taxes.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Shipping and Returns
          </h2>
          <p>
            For details on shipping and returns, please refer to our{" "}
            <Link
              href="/shipping-information"
              className="text-black underline hover:text-neutral-400">
              Shipping Information
            </Link>{" "}
            and{" "}
            <Link
              href="/return-policy"
              className="text-black underline hover:text-neutral-400">
              Return Policy
            </Link>{" "}
            pages.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Intellectual Property
          </h2>
          <p>
            All content on our website, including text, images, logos, and
            designs, is the intellectual property of DYMONÉ or its licensors.
            You may not reproduce, distribute, or create derivative works
            without our consent.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, DYMONÉ shall not be liable
            for any indirect, incidental, or consequential damages arising out
            of your use of, or inability to use, our website.
          </p>

          <h2 className="text-2xl font-semibold text-black">Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the
            laws of Australia. Any disputes arising in connection with these
            terms will be subject to the exclusive jurisdiction of the courts of
            Australia.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Any changes will be posted on this page with an updated
            effective date. Your continued use of our website signifies your
            acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please{" "}
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
