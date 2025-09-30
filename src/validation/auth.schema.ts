import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
    email: z.email("Lütfen geçerli bir e-posta adresi girin."),
    password: z.string().min(8, "Şifre en az 8 karakter olmalıdır."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.email("Lütfen geçerli bir e-posta adresi girin."),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır."),
  rememberMe: z.boolean().optional(),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;