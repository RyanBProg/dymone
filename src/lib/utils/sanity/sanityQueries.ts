"server only";

import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  STONES_QUERYResult,
  ALL_PRODUCTS_PREVIEWResult,
  SINGLE_PRODUCT_FULLResult,
} from "@/lib/types";

export const getAllProductCategories = async (): Promise<
  CATEGORIES_QUERYResult | []
> => {
  const CATEGORIES_QUERY = defineQuery(`
    *[_type == "productCategory"] {
      _id,
      name,
      "slug": slug.current
    } | order(name asc)
  `);

  try {
    const categories = await sanityFetch({ query: CATEGORIES_QUERY });
    return categories.data || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};

export const getAllProductMaterials = async (): Promise<
  MATERIALS_QUERYResult | []
> => {
  const MATERIALS_QUERY = defineQuery(`
    *[_type == "material"] {
      _id,
      name,
      description,
      "slug": slug.current
    } | order(name asc)
  `);

  try {
    const materials = await sanityFetch({ query: MATERIALS_QUERY });
    return materials.data || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};

export const getAllProductStones = async (): Promise<
  STONES_QUERYResult | []
> => {
  const STONES_QUERY = defineQuery(`
    *[_type == "stone"] {
      _id,
      name,
      description,
      "slug": slug.current
    } | order(name asc)
  `);

  try {
    const stones = await sanityFetch({ query: STONES_QUERY });
    return stones.data || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};

export const getProductById = async (
  productId: string
): Promise<SINGLE_PRODUCT_FULLResult | null> => {
  if (!productId) {
    console.log("getProductById: No productId provided");
    return null;
  }

  const SINGLE_PRODUCT_FULL =
    defineQuery(`*[_type == "product" && _id == $productId]{
    _id,
    sku,
    "slug": slug.current,
    name,
    "images": images[]{ "alt": alt, "url": asset->url },
    description,
    price,
    discountPrice,
    gender,
    productCategory -> {_id, name},
    material -> {_id, name, description},
    stone -> {_id, name, description},
    stock,
    weight,
    _updatedAt,
    _createdAt,
    isFeatured
    }[0]`);

  try {
    const product = await sanityFetch({
      query: SINGLE_PRODUCT_FULL,
      params: { productId },
    });
    return product.data || null;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};

export const getAllProducts =
  async (): Promise<ALL_PRODUCTS_PREVIEWResult | null> => {
    const ALL_PRODUCTS_PREVIEW = defineQuery(`{
    "total": count(*[_type == "product"]),
    "products": *[_type == "product"]
      {
        _id,
        sku,
        "slug": slug.current,
        name,
        "image": { "alt": images[0].alt, "url": images[0].asset->url },
        price,
        discountPrice,
        gender,
        productCategory,
        material,
        stone,
        stock,
        _updatedAt,
        _createdAt,
        isFeatured
      } | order(price asc)
    }`);

    try {
      const products = await sanityFetch({ query: ALL_PRODUCTS_PREVIEW });
      return products.data;
    } catch (error) {
      console.error("Fetch failed:", error);
      return null;
    }
  };

export const getFilteredProductsPreview = async (
  PRODUCTS_QUERY: string
): Promise<ALL_PRODUCTS_PREVIEWResult | null> => {
  if (!PRODUCTS_QUERY) {
    console.log("getFilteredProductsPreview: No PRODUCTS_QUERY provided");
    return null;
  }

  try {
    const products = await sanityFetch({ query: PRODUCTS_QUERY });
    return products.data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};
