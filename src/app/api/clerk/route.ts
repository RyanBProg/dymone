import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request, res: Response) {
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
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // check event type and do the correct thing
  if (evt.type === "user.created") {
    console.log(
      `Received webhook with ID ${evt.data.id} and event type of ${evt.type}`
    );
    console.log("Webhook payload:", body);
  } else if (evt.type === "user.updated") {
    console.log(
      `Received webhook with ID ${evt.data.id} and event type of ${evt.type}`
    );
    console.log("Webhook payload:", body);
  } else if (evt.type === "user.deleted") {
    console.log(
      `Received webhook with ID ${evt.data.id} and event type of ${evt.type}`
    );
    console.log("Webhook payload:", body);
  }

  return new Response("Webhook received", { status: 200 });
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
