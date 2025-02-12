import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "clerkId",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      type: "object",
      fields: [
        { name: "street", type: "string" },
        { name: "city", type: "string" },
        { name: "state", type: "string" },
        { name: "zipCode", type: "string" },
        { name: "country", type: "string" },
      ],
    }),
    defineField({
      name: "phoneNumber",
      type: "string",
    }),
  ],
});
