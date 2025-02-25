import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "orderId",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "user",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "orderItem" }],
    }),
    defineField({
      name: "total",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: ["pending", "processing", "shipped", "delivered", "cancelled"],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "trackingNumber",
      type: "string",
    }),
    defineField({
      name: "shippingMethod",
      type: "string",
    }),
    defineField({
      name: "paymentStatus",
      type: "string",
      options: {
        list: ["pending", "paid", "failed", "refunded"],
      },
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        {
          name: "street",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "city",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "state",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "zipCode",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "country",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
