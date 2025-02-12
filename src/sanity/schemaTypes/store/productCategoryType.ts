import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productCategoryType = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
      },
    }),
  ],
});
