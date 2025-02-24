import Link from "next/link";

export default function page() {
  return (
    <main className="bg-neutral-100 text-neutral-800 my-20 md:my-44 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem] mb-5">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg">Effective Date: January 1, 2025</p>
        </div>

        <section className="space-y-6">
          <p>
            This Privacy Policy explains how DYMONÉ (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) collects, uses, and safeguards
            your personal information when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, address,
            email, and phone number when you voluntarily provide it by
            registering, subscribing to our newsletter, or making a purchase.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            How We Use Your Information
          </h2>
          <p>
            Your personal information is used to process transactions, improve
            our website, and deliver a personalized experience. This may include
            sending you updates, promotional emails, and information about our
            products and services.
          </p>

          <h2 className="text-2xl font-semibold text-black">Data Security</h2>
          <p>
            We employ a variety of security measures to protect your
            information. While we strive to maintain data security, no system is
            completely impervious to breaches.
          </p>

          <h2 className="text-2xl font-semibold text-black">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information held by us. If you wish to exercise any of these rights,
            please contact us.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Changes to Our Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be
            posted on this page along with an updated effective date.
          </p>

          <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please{" "}
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
