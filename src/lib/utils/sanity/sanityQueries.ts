"server only";

import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { CartItem } from "@/zustand/cartStore";
import { ALL_PRODUCTS_PREVIEWResult } from "../../../../sanity.types";

export const getAllProductCategories = async () => {
  try {
    const CATEGORIES_QUERY = defineQuery(`
    *[_type == "productCategory"] {
      _id,
      name,
      "slug": slug.current
    } | order(name asc)
  `);

    const { data } = await sanityFetch({ query: CATEGORIES_QUERY });
    if (!data) {
      throw new Error("No categories found");
    }

    return { success: true, categories: data };
  } catch (error) {
    console.error("getAllProductCategories: ", error);
    return { success: false };
  }
};

export const getAllProductMaterials = async () => {
  try {
    const MATERIALS_QUERY = defineQuery(`
    *[_type == "material"] {
      _id,
      name,
      description,
      "slug": slug.current
    } | order(name asc)
  `);

    const { data } = await sanityFetch({ query: MATERIALS_QUERY });
    if (!data) {
      throw new Error("No materials found");
    }

    return { success: true, materials: data };
  } catch (error) {
    console.error("getAllProductMaterials: ", error);
    return { success: false };
  }
};

export const getAllProductStones = async () => {
  try {
    const STONES_QUERY = defineQuery(`
    *[_type == "stone"] {
      _id,
      name,
      description,
      "slug": slug.current
    } | order(name asc)
  `);

    const { data } = await sanityFetch({ query: STONES_QUERY });
    if (!data) {
      throw new Error("No stones found");
    }

    return { success: true, stones: data };
  } catch (error) {
    console.error("getAllProductStones: ", error);
    return { success: false };
  }
};

export const getProductById = async (productId: string) => {
  try {
    if (!productId) {
      throw new Error("No productId provided");
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

    const { data } = await sanityFetch({
      query: SINGLE_PRODUCT_FULL,
      params: { productId },
    });
    if (!data) {
      throw new Error("No product found");
    }

    return { success: true, product: data };
  } catch (error) {
    console.error("getProductById: ", error);
    return { success: false };
  }
};

export const getAllProducts = async () => {
  try {
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

    const { data } = await sanityFetch({ query: ALL_PRODUCTS_PREVIEW });
    if (!data) {
      throw new Error("No products found");
    }

    return { success: true, products: data };
  } catch (error) {
    console.error("getAllProducts: ", error);
    return { success: false };
  }
};

export const getFilteredProductsPreview = async (
  PRODUCTS_QUERY: string
): Promise<{ success: boolean; products?: ALL_PRODUCTS_PREVIEWResult }> => {
  try {
    if (!PRODUCTS_QUERY) {
      throw new Error("No PRODUCTS_QUERY provided");
    }

    const { data } = await sanityFetch({ query: PRODUCTS_QUERY });
    if (!data) {
      throw new Error("No products found");
    }

    return { success: true, products: data };
  } catch (error) {
    console.error("getFilteredProductsPreview: ", error);
    return { success: false };
  }
};

export const getUserWishlist = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("No userId provided");
    }

    const USER_WISHLIST = defineQuery(
      `*[_type == "wishlist" && user._ref == $userId]{
      user,
      "products": products[] -> {
        _id,
        name,
        price,
        discountPrice,
        "image": { "alt": images[0].alt, "url": images[0].asset->url },
        },
      }[0]`
    );

    const { data } = await sanityFetch({
      query: USER_WISHLIST,
      params: { userId },
    });

    return { success: true, wishlist: data };
  } catch (error) {
    console.error("getUserWishlist: ", error);
    return { success: false };
  }
};

export const getUser = async (clerkUserId: string) => {
  try {
    if (!clerkUserId) {
      throw new Error("No clerkUserId provided");
    }

    const GET_USER = defineQuery(
      `*[_type == "user" && clerkId == $clerkUserId][0]`
    );

    const { data } = await sanityFetch({
      query: GET_USER,
      params: { clerkUserId },
    });

    if (!data) {
      throw new Error("No user found");
    }

    return { success: true, user: data };
  } catch (error) {
    console.error("getUser: ", error);
    return { success: false };
  }
};

export const checkCartStock = async (cart: CartItem[]) => {
  try {
    if (!cart || !cart.length) {
      throw new Error("No cart provided");
    }
  } catch (error) {
    console.error("checkCartStock: ", error);
    return { success: false };
  }
};
