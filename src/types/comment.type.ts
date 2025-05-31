import { Comment } from "@prisma/client";

export type ExtendedComment = Comment & {
  author: {
    id: string;
    name: string |null;
    email: string | null;
    updatedAt: Date | null;
  };
};