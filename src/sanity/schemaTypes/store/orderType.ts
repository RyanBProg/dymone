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
  ],
});
