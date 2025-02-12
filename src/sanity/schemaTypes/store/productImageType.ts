import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productImageType = defineType({
  name: "productImage",
  title: "Product Image",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip"],
        storeOriginalFilename: true,
        accept: "image/jpeg,image/png",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altText",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPrimary",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
