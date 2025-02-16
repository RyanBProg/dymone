import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_LIVE_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_LIVE_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "vX",
  }),
  serverToken: token,
  browserToken: token,
});
