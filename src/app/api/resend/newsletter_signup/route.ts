"use server";

import { NewsletterSignup } from "@/components/email/NewsletterSignup";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return Response.json(
        { error: "All email field is required" },
        { status: 400 }
      );
    }

    // admin notification email
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["ryanbprog@gmail.com"],
      subject: "Newsletter Request",
      react: await NewsletterSignup({ email }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
