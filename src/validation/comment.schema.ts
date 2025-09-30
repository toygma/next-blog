import { z } from "zod";

export const commentPostSchema = z.object({
  content: z
    .string()
    .min(10, { message: "İçerik en az 10 karakter olmalıdır." }),
});

export type CommentPostInput = z.infer<typeof commentPostSchema>;