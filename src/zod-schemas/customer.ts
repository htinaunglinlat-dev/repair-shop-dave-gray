import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required."),
  lastName: (schema) => schema.min(1, "Last name is required."),
  address1: (schema) => schema.min(1, "Address is required."),
  city: (schema) => schema.min(1, "City is required."),
  state: (schema) => schema.length(2, "State must exactly two characters."),
  email: z.email("Invalid email address."),
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid ZIP code. Use 5 digits or 5 digits followed by a hyphen and 4 digits.",
    ),
  phone: (schema) =>
    schema.regex(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid phone number. Use format: XXX-XXX-XXXX.",
    ), // /^\d{3}-\d{3}-\d{4}$/
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
