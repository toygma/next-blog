"use server";

import { getServerSession } from "@/lib/get-session";
import {prisma} from "../../prisma";
import { revalidatePath } from "next/cache";

type DeleteCommentFormState = {
  success?: boolean;
  errors?: {
    commentId?: string;
    formErrors?: string[];
  };
};

export const deleteComment = async (
  commentId: string
): Promise<DeleteCommentFormState> => {
     const session = await getServerSession();
 

  if (!commentId || commentId.trim() === "") {
    return {
      errors: {
        commentId: "Invalid comment ID",
      },
    };
  }

  if (!session?.user.id) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found. Please register before deleting a comment."],
      },
    };
  }

  const existingComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!existingComment) {
    return {
      errors: {
        formErrors: ["Comment not found."],
      },
    };
  }

  if (existingComment.userId !== existingUser.id) {
    return {
      errors: {
        formErrors: ["You are not allowed to delete this comment."],
      },
    };
  }

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
    revalidatePath(`/posts/detail`);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    }

    return {
      errors: {
        formErrors: ["An unexpected error occurred."],
      },
    };
  }
};
