import { z } from "zod";
export const commentPostSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" }),
});

export type CommentPostInput = z.infer<typeof commentPostSchema>;
