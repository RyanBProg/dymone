import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/zustand/cartStore";
import { getSanityUser } from "@/actions/user/userActions";

const SHIPPING_RATE = 999; // $9.99 in cents
const CURRENCY = "aud";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const cartItems: CartItem[] = await request.json();

    if (!cartItems.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Get Sanity user ID
    const sanityUser = await getSanityUser();
    if (!sanityUser.success || !sanityUser.user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Create line items from cart
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: item.name,
          images: [item.image.url],
          metadata: {
            sanityProductId: item.id, // Pass product ID in metadata
          },
        },
        unit_amount: Math.round((item.discountPrice || item.price) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items,
      metadata: {
        sanityUserId: sanityUser.user._id, // Pass user ID in metadata
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: SHIPPING_RATE,
              currency: CURRENCY,
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      mode: "payment",
      success_url: `${origin}/shop/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/checkout`,
      shipping_address_collection: {
        allowed_countries: ["AU"], // Restrict to Australia only
      },
      billing_address_collection: "required",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
