"server only";

import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const getAllProductCategories = async () => {
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

export const getAllProductMaterials = async () => {
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

export const getAllProductStones = async () => {
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

export const getProductById = async (productId: string) => {
  if (!productId) {
    console.log("getProductById: No productId provided");
    return [];
  }

  const SINGLE_PRODUCT_FULL =
    defineQuery(`*[_type == "product" && _id == $productId]{
    _id,
    sku,
    "slug": slug.current,
    name,
    "image": images[0].asset->url,
    "description": description[].children,
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

export const getAllProducts = async () => {
  const ALL_PRODUCTS_PREVIEW = defineQuery(`{
    "total": count(*[_type == "product"]),
    "products": *[_type == "product"]
      {
        _id,
        sku,
        "slug": slug.current,
        name,
        "images": images[].asset->url,
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
    return products.data || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};

export const getFilteredProductsPreview = async (PRODUCTS_QUERY: string) => {
  if (!PRODUCTS_QUERY) {
    console.log("getFilteredProductsPreview: No PRODUCTS_QUERY provided");
    return [];
  }

  try {
    const products = await sanityFetch({ query: PRODUCTS_QUERY });
    return products.data || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};
