import Link from "next/link";

export default function page() {
  return (
    <main className="bg-neutral-100 text-neutral-800 my-20 md:my-44 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem] mb-5">
            Cookie Policy
          </h1>
          <p className="mt-2 text-lg">Effective Date: January 1, 2025</p>
        </div>

        <section className="space-y-6">
          <p>
            This Cookie Policy explains how DYMONÉ (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) uses cookies and similar
            tracking technologies on our website.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            What are cookies?
          </h2>
          <p>
            Cookies are small text files placed on your device to help our
            website recognize you on subsequent visits, improve your user
            experience, and provide you with personalized content.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            How We Use Cookies
          </h2>
          <p>
            We use cookies to enhance user experience, improve functionality,
            analyze traffic, and personalize content. Some cookies are essential
            for the operation of our website, while others help us understand
            user interactions so we can optimize our website performance.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Managing Cookies
          </h2>
          <p>
            You can control and manage cookies through your browser settings.
            Please note that disabling cookies may impact the functionality of
            our website.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Changes to Our Cookie Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will
            be posted on this page with an updated effective date.
          </p>

          <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy, please{" "}
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
