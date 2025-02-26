"use server";

import { ContactFormData } from "@/components/email/ContactFormData";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // user confirmation email (can't do this part yet without a domain)
    // const { data: userEmailData, error: userEmailError } =
    //   await resend.emails.send({
    //     from: "Acme <onboarding@resend.dev>",
    //     to: [email],
    //     subject: "We'll be in touch soon",
    //     react: await ContactConfirmation({ name: "John" }),
    //   });

    // if (userEmailError) {
    //   return Response.json({ userEmailError }, { status: 500 });
    // }

    // admin notification email
    const { data: adminEmailData, error: adminEmailError } =
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["ryanbprog@gmail.com"],
        subject: "Contact form submission",
        react: await ContactFormData({ name, email, subject, message }),
      });

    if (adminEmailError) {
      return Response.json({ adminEmailError }, { status: 500 });
    }

    return Response.json([adminEmailData]);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
