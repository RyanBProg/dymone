import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="mt-auto bg-black text-gray-300 py-10 px-10">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-x-10">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:text-white">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping-information" className="hover:text-white">
                Shipping Information
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
        <NewsletterSignup />
      </div>
      <div className="mt-8 border-t border-neutral-700 pt-4 text-center text-sm">
        © {new Date().getFullYear()} DYMONÉ. All rights reserved.
      </div>
    </footer>
  );
}
