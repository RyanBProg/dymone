"use client";

import { useState } from "react";
import { z } from "zod";
import LoadingSpinner from "../common/LoadingSpinner";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const validatedFields = schema.safeParse({ email });
      if (!validatedFields.success) {
        throw new Error(validatedFields.error.errors[0].message);
      }

      await fetch("/api/resend/newsletter_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      setEmail("");
      setIsSending(false);
      toast.success("Subscribed successfully!");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 max-w-[300px]">
      <h2 className="text-lg font-semibold">Subscribe to our Newsletter</h2>
      <p className="text-sm">Get the latest updates, offers, and insights.</p>
      <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-grow p-2 rounded-md text-black bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-purple-200"
          required
        />
        <button
          type="submit"
          disabled={isSending}
          className={`${isSending ? "hover:cursor-auto bg-neutral-500" : "bg-purple-200 hover:bg-purple-100"} text-black px-4 py-2 rounded-md transition-colors duration-300 disabled:opacity-50"`}>
          {isSending ? <LoadingSpinner size="sm" /> : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
