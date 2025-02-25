import { sanityDevClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("Missing STRIPE_WEBHOOK_SECRET");
    }

    if (!signature) {
      throw new Error("No signature found");
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get the Sanity user ID from session metadata
      const sanityUserId = session.metadata?.sanityUserId;
      if (!sanityUserId) {
        throw new Error("No Sanity user ID found in session metadata");
      }

      // Get line items with expanded price.product data
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          expand: ["data.price.product"],
        }
      );

      // Create order in Sanity
      await sanityDevClient.create({
        _type: "order",
        orderId: session.id,
        user: {
          _type: "reference",
          _ref: sanityUserId,
        },
        items: lineItems.data.map((item) => {
          const product = item.price?.product as Stripe.Product;
          return {
            _key: `${product.metadata.sanityProductId}-${new Date().getTime()}`,
            _type: "orderItem",
            product: {
              _type: "reference",
              _ref: product.metadata.sanityProductId,
            },
            quantity: item.quantity,
            price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
          };
        }),
        total: session.amount_total ? session.amount_total / 100 : 0,
        status: "pending",
        shippingMethod: "standard",
        paymentStatus: "paid",
        // Add shipping address if needed
        shippingAddress: session.shipping_details?.address
          ? {
              street: session.shipping_details.address.line1,
              city: session.shipping_details.address.city,
              state: session.shipping_details.address.state,
              zipCode: session.shipping_details.address.postal_code,
              country: session.shipping_details.address.country,
            }
          : undefined,
      });

      return new Response("Order created successfully", { status: 201 });
    }

    return new Response("Unhandled event type", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      `Webhook Error: ${error instanceof Error ? error.message : "Unknown Error"}`,
      { status: 400 }
    );
  }
}
