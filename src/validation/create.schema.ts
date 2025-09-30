import { z } from "zod";
export const createPostSchema = z.object({
  postType: z.string().min(1, { message: "Post type is required." }),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at least 100 characters" }),

  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    })
    .min(3, { message: "Slug must be at least 3 characters" })
    .max(100, { message: "Slug must be at most 100 characters" }),

  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" }),

  featuredImage: z.union([z.instanceof(File), z.string()]).optional(),

  categories: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
