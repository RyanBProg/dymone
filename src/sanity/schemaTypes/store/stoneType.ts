import { CircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const stoneType = defineType({
  name: "stone",
  title: "Stone",
  type: "document",
  icon: CircleIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
