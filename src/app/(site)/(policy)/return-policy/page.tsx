import Link from "next/link";

export default function page() {
  return (
    <main className="bg-neutral-100 text-neutral-800 my-20 md:my-44 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem] mb-5 text-black">
            Return Policy
          </h1>
          <p className="mt-2 text-lg">Effective Date: January 1, 2025</p>
        </div>

        {/* Main Content */}
        <section className="space-y-6">
          <p>
            At DYMONÉ, we take great pride in our finely crafted jewellery. If
            you are not entirely satisfied with your purchase, please review our
            Returns Policy below.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Eligibility for Returns
          </h2>
          <p>
            Returns are accepted within 30 days from the date of purchase for
            items in their original condition, unworn, and with all original
            packaging and tags intact. Please note that personalised or custom
            pieces, as well as final sale items, cannot be returned unless they
            arrive damaged or defective.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            How to Initiate a Return
          </h2>
          <p>
            To begin the return process, please contact our Customer Service
            team at{" "}
            <Link
              href="/contact-us"
              className="underline hover:text-neutral-400">
              contact us
            </Link>
            . Our team will guide you through the return procedure and provide
            you with a Return Merchandise Authorization (RMA) number.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Refunds and Exchanges
          </h2>
          <p>
            Once your return is received and inspected, we will notify you of
            the approval or rejection of your refund or exchange. If approved, a
            refund will be processed, and a credit will automatically be applied
            to your original method of payment within 7-10 business days. In the
            case of exchanges, we will ship your new item after the return is
            processed.
          </p>

          <h2 className="text-2xl font-semibold text-black">Shipping Costs</h2>
          <p>
            Return shipping costs are the responsibility of the customer unless
            the item is defective or an error was made on our part. We recommend
            using a trackable shipping service or purchasing shipping insurance.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Damaged or Defective Items
          </h2>
          <p>
            If you receive a damaged or defective item, please contact us
            immediately so that we can resolve the issue by offering a refund,
            replacement, or repair. Photographic evidence may be requested as
            part of the claims process.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Contact Information
          </h2>
          <p>
            If you have any questions about our Returns Policy, please{" "}
            <Link
              href="/contact-us"
              className="underline hover:text-neutral-400">
              contact us
            </Link>
            . We are here to help.
          </p>
        </section>
      </div>
    </main>
  );
}
