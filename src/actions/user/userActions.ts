"use server";

import { getUser, getUserWishlist } from "@/lib/utils/sanity/sanityQueries";
import { sanityDevClient } from "@/sanity/lib/backendClient";
import { UserDetailsSchema } from "@/zod/userDetailsSchema";
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

export const updateUserDetails = async (formData: UserDetailsSchema) => {
  try {
    const sanityUser = await getSanityUser();
    if (!sanityUser.success || !sanityUser.user) {
      throw new Error("No sanity user found");
    }

    const sanityData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.postcode,
        country: formData.country,
      },
    };

    await sanityDevClient.patch(sanityUser.user._id).set(sanityData).commit();

    return { success: true };
  } catch (error) {
    console.error("UpdateUserDetails error:", error);
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

export const addItemToWishlist = async (productId: string) => {
  if (!productId) {
    throw new Error("Args not passed to function");
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
            _key: `${productId}-${new Date().getTime()}`,
            _type: "reference",
            _ref: productId,
          },
        ],
      });
    } else {
      // Check if product already exists in wishlist
      const productExists = wishlist.products?.some(
        (product: { _ref: string }) => product._ref === productId
      );

      if (!productExists) {
        // Add product to existing wishlist
        await sanityDevClient
          .patch(wishlist._id)
          .setIfMissing({ products: [] })
          .append("products", [
            {
              _key: `${productId}-${new Date().getTime()}`,
              _type: "reference",
              _ref: productId,
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

export const deleteItemFromWishlist = async (productId: string) => {
  if (!productId) {
    throw new Error("Args not passed to function");
  }

  try {
    const sanityUser = await getSanityUser();
    if (!sanityUser.success || !sanityUser.user) {
      throw new Error("No sanity user found");
    }

    // Get user's wishlist
    const wishlist = await sanityDevClient.fetch(
      `*[_type == "wishlist" && user._ref == $userId][0]`,
      { userId: sanityUser.user._id }
    );

    if (!wishlist) {
      throw new Error("No wishlist found");
    }

    // Find the product in the wishlist
    const productToRemove = wishlist.products?.find(
      (product: { _ref: string }) => product._ref === productId
    );

    if (!productToRemove) {
      throw new Error("Product not found in wishlist");
    }

    // Remove the product from the wishlist using unset
    await sanityDevClient
      .patch(wishlist._id)
      .unset([`products[_ref=="${productId}"]`])
      .commit();

    return { success: true };
  } catch (error) {
    console.log("deleteItemFromWishlist error: ", error);
    return { success: false };
  }
};
