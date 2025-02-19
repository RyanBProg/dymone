import "server-only";

import Stripe from "stripe";

const stripeKey = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log("STRIPE_SECRET_KEY not found");
    return "";
  } else return process.env.STRIPE_SECRET_KEY;
};

const key = stripeKey();

export const stripe = new Stripe(key);
