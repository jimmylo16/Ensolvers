import * as z from "zod";

export type LoginFormSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("This is not a valid email."),
  password: z.string({ required_error: "Password is required" }).min(6).max(50),
});
