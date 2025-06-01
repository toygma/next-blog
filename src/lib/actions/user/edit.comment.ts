"use server";

import { commentPostSchema } from "@/validation/comment.schema";
import prisma from "../../prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type EditCommentFormState = {
  success?: boolean;
  errors?: {
    commentId?: string;
    content?: string[];
    formErrors?: string[];
  };
};

export const editComment = async (
  commentId: string,
  content: string
): Promise<EditCommentFormState> => {
  const result = commentPostSchema.safeParse({ content });
  const { userId } = await auth();

  if (!result.success) {
    return {
      errors: {
        content: result.error.flatten().fieldErrors.content,
        formErrors: result.error.flatten().formErrors,
      },
    };
  }

  if (!commentId || commentId.trim() === "") {
    return {
      errors: {
        commentId: "Invalid comment ID",
      },
    };
  }

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found. Please register before editing a comment."],
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

  if (existingComment.authorId !== existingUser.id) {
    return {
      errors: {
        formErrors: ["You are not allowed to edit this comment."],
      },
    };
  }

  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        content: result.data.content,
        updatedAt: new Date(),
      },
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
