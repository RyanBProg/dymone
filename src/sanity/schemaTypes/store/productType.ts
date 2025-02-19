import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sku",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "discountPrice",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "productCategory",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "material",
      type: "reference",
      to: [{ type: "material" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stone",
      type: "reference",
      to: [{ type: "stone" }],
    }),
    defineField({
      name: "stock",
      type: "number",
      validation: (Rule) => Rule.required().positive().min(0),
    }),
    defineField({
      name: "gender",
      type: "string",
      options: {
        list: ["Male", "Female", "Unisex"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weight",
      type: "number",
      description: "Weight in grams",
    }),
    defineField({
      name: "dimensions",
      type: "string",
      description: "Product dimensions",
    }),
    defineField({
      name: "isFeatured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `$${subtitle}`,
        media,
      };
    },
  },
});
