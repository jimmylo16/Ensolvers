import * as z from "zod";

export type CategorySchema = z.infer<typeof categorySchema>;

export const categorySchema = z.object({
  name: z
    .string({ required_error: "the name of the category is required" })
    .max(30),
  description: z.string(),
});
