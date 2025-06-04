import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must be at most 100 characters" }),

  email: z
    .string()
    .email({ message: "Must be a valid email address" }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
