import { Comment } from "@prisma/client";

export type ExtendedComment = Comment & {
  user: {
    id: string;
    name: string |null;
    email: string | null;
    updatedAt: Date | null;
  };
};