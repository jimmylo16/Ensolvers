import * as z from "zod";

export type RegisterFormSchema = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("This is not a valid email."),
  fullName: z.string({ required_error: "Full Name is required" }),
  password: z.string({ required_error: "Psassword is required" }),
});
