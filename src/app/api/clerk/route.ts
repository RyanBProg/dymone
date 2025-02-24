import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { sanityDevClient } from "@/sanity/lib/backendClient";

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("No CLERK_WEBHOOK_SECRET");
  }

  // Create new Svix instance with secret
  const wh = new Webhook(webhookSecret);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error: Could not verify webhook:", error);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  try {
    // Check if the user already exists in Sanity
    const existingUser = await sanityDevClient.fetch(
      `*[_type == "user" && clerkId == $clerkId][0]`,
      { clerkId: evt.data.id }
    );

    if (existingUser) {
      console.log("User already exists in database");
      return new Response("Webhook received, user already exists", {
        status: 200,
      });
    }

    if (evt.type === "user.created") {
      await sanityDevClient.create({
        _type: "user",
        clerkId: evt.data.id,
        email: evt.data.email_addresses[0]?.email_address || "",
        name: evt.data.first_name + " " + evt.data.last_name,
        phoneNumber: evt.data.phone_numbers[0].phone_number ?? "",
      });

      return new Response("User created in Sanity", { status: 201 });
    }

    console.log("Failed to create user");
    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Sanity Client Error", error);
    return new Response("Error: Sanity Client Error", {
      status: 500,
    });
  }
}

// TODO:
// - What happens if a user signs up but the webhook fails? The user is now signed in on the website but doesn't have a user created in the sanity db. How should I handle this?
