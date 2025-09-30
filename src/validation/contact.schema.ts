import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z
    .string({message:"Adınız en az 3 karakter olmalıdır."})
    .min(3, { message: "Adınız en az 3 karakter olmalıdır." })
    .max(100, { message: "Adınız en fazla 100 karakter olmalıdır." }),

  email: z.email({ message: "Geçerli bir e-posta adresi olmalıdır." }),

  message: z
    .string({message:"Adınız en az 3 karakter olmalıdır."})
    .min(10, { message: "Mesajınız en az 10 karakter olmalıdır." }),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
