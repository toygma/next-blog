import { Comment } from "@/lib/generated/prisma";

export type ExtendedComment = Comment & {
  userId:string,
  user: {
    id: string;
    name: string |null;
    email: string | null;
    updatedAt: Date | null;
  };
};