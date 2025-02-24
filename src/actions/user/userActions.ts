"use server";

import { getUser, getUserWishlist } from "@/lib/utils/sanity/sanityQueries";
import { sanityDevClient } from "@/sanity/lib/backendClient";
import { sanityFetch } from "@/sanity/lib/live";
import { currentUser } from "@clerk/nextjs/server";

// User
export const getSanityUser = async () => {
  try {
    // get user from clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("User not signed in");
    }

    const sanityUser = await getUser(clerkUser.id);
    if (!sanityUser.success || !sanityUser.user) {
      throw new Error("No sanity user found");
    }

    return { success: true, user: sanityUser.user };
  } catch (error) {
    console.log("getSanityUser error:", error);
    return { success: false };
  }
};

// Wishlist
export const getSanityUserWishlist = async () => {
  try {
    const sanityUser = await getSanityUser();
    if (!sanityUser.success || !sanityUser.user) {
      throw new Error("No sanity user found");
    }

    const userWishlist = await getUserWishlist(sanityUser.user._id);
    if (!userWishlist.success || !userWishlist.wishlist) {
      throw new Error("No wishlist found");
    }

    return {
      success: true,
      wishlist: userWishlist.wishlist,
    };
  } catch (error) {
    console.log("getSanityUserWishlist error: ", error);
    return { success: false };
  }
};

export const addItemToWishlist = async (itemId: string) => {
  if (!itemId) {
    throw new Error("Args not passed to function: addItemToWishlist");
  }

  try {
    const sanityUser = await getSanityUser();
    if (!sanityUser.success || !sanityUser.user) {
      throw new Error("No sanity user found");
    }

    // Check if the user has a wishlist
    const wishlist = await sanityDevClient.fetch(
      `*[_type == "wishlist" && user._ref == $userId][0]`,
      { userId: sanityUser.user._id }
    );

    if (!wishlist) {
      // Create new wishlist for user
      await sanityDevClient.create({
        _type: "wishlist",
        user: {
          _type: "reference",
          _ref: sanityUser.user._id,
        },
        products: [
          {
            _key: `${itemId}-${new Date().getTime()}`,
            _type: "reference",
            _ref: itemId,
          },
        ],
      });
    } else {
      // Check if product already exists in wishlist
      const productExists = wishlist.products?.some(
        (product: { _ref: string }) => product._ref === itemId
      );

      if (!productExists) {
        // Add product to existing wishlist
        await sanityDevClient
          .patch(wishlist._id)
          .setIfMissing({ products: [] })
          .append("products", [
            {
              _key: `${itemId}-${new Date().getTime()}`,
              _type: "reference",
              _ref: itemId,
            },
          ])
          .commit();
      }
    }

    return { success: true };
  } catch (error) {
    console.log("AddItemToWishlist error: ", error);
    return { success: false };
  }
};

export const deleteItemFromWishlist = async (
  userId: string,
  itemId: string
) => {
  try {
    if (!userId || !itemId) {
      throw new Error("Args not passed to function: deleteItemFromWishlist");
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearWishlist = async (userId: string, itemId: string) => {
  try {
    if (!userId || !itemId) {
      throw new Error("Args not passed to function: clearWishlist");
    }
  } catch (error) {
    console.log(error);
  }
};
