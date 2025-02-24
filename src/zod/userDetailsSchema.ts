import { z } from "zod";

export const userDetailsSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Name can only contain letters, spaces, hyphens and apostrophes"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),

  phoneNumber: z
    .string()
    .regex(
      /^(\+?\d{1,4})?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Please enter a valid phone number"
    )
    .optional()
    .nullable(),

  street: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .max(100, "Street address must be less than 100 characters"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "City can only contain letters, spaces, hyphens and apostrophes"
    ),

  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "State can only contain letters, spaces, hyphens and apostrophes"
    ),

  postcode: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid Australian postcode (4 digits)"),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Country can only contain letters, spaces, hyphens and apostrophes"
    ),
});

export type UserDetailsSchema = z.infer<typeof userDetailsSchema>;
