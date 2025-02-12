import { CircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const materialType = defineType({
  name: "material",
  title: "Material",
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
