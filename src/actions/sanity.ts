"server only";

import {
  CATEGORIES_QUERY,
  MATERIALS_QUERY,
  STONES_QUERY,
} from "@/lib/utils/sanity/sanityQueries";
import { sanityFetch } from "@/sanity/lib/live";

export const getAllProductCategories = async () => {
  try {
    return sanityFetch({ query: CATEGORIES_QUERY });
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const getAllProductMaterials = async () => {
  try {
    return sanityFetch({ query: MATERIALS_QUERY });
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const getAllProductStones = async () => {
  try {
    return sanityFetch({ query: STONES_QUERY });
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const getFilteredProductsPreview = async (PRODUCTS_QUERY: string) => {
  try {
    return sanityFetch({ query: PRODUCTS_QUERY });
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};
