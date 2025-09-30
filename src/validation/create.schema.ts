import { z } from "zod";

export const createPostSchema = z.object({
  postType: z
    .string()
    .min(1, { message: "Yazı türü zorunludur." }),
  title: z
    .string()
    .min(3, { message: "Başlık en az 3 karakter olmalıdır." })
    .max(100, { message: "Başlık en fazla 100 karakter olmalıdır." }),

  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug yalnızca küçük harfler, rakamlar ve kısa çizgiler içerebilir.",
    })
    .min(3, { message: "Slug en az 3 karakter olmalıdır." })
    .max(100, { message: "Slug en fazla 100 karakter olmalıdır." }),

  content: z
    .string()
    .min(10, { message: "İçerik en az 10 karakter olmalıdır." }),

  featuredImage: z.union([z.instanceof(File), z.string()]).optional(),

  categories: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;