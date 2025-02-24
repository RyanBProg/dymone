import { HeartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const wishlistType = defineType({
  name: "wishlist",
  title: "Wishlist",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "user",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
});
