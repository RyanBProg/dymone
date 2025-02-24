import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_BACKEND_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_BACKEND_TOKEN");
}

export const sanityDevClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_BACKEND_TOKEN,
});
