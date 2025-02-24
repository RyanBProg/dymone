"use server";

import { sanityDevClient } from "@/sanity/lib/backendClient";
import { currentUser } from "@clerk/nextjs/server";

// User details
export const updateUserDetails = async (user: string) => {
  try {
    if (!user) {
      throw new Error("Args not passed to function: updateUserDetails");
    }
  } catch (error) {
    console.log(error);
  }
};

// Wishlist
export const addItemToWishlist = async (itemId: string) => {
  if (!itemId) {
    throw new Error("Args not passed to function: addItemToWishlist");
  }

  try {
    // get user from clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("User not signed in");
    }

    // Check if the user exists in sanity
    const sanityUser = await sanityDevClient.fetch(
      `*[_type == "user" && clerkId == $clerkId][0]`,
      { clerkId: clerkUser.id }
    );
    if (!sanityUser) {
      throw new Error("User doesn't exist in Sanity");
    }

    // Check if the user has a wishlist
    const wishlist = await sanityDevClient.fetch(
      `*[_type == "wishlist" && user._ref == $userId][0]`,
      { userId: sanityUser._id }
    );

    if (!wishlist) {
      // Create new wishlist for user
      await sanityDevClient.create({
        _type: "wishlist",
        user: {
          _type: "reference",
          _ref: sanityUser._id,
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
    console.log("AddItemToWishlist error:", error);
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
