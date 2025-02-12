import { defineField, defineType } from "sanity";

export const orderItemType = defineType({
  name: "orderItem",
  title: "Order Item",
  type: "object",
  fields: [
    defineField({
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "quantity",
      type: "number",
    }),
    defineField({
      name: "price",
      type: "number",
    }),
  ],
});
