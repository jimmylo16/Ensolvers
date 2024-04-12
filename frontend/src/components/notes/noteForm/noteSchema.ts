import * as z from "zod";

export type NoteSchema = z.infer<typeof noteSchema>;

export const noteSchema = z.object({
  title: z.string().max(30),
  content: z.string(),
});
