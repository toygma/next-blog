"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { commentPostSchema } from "@/validation/comment.schema";
import { revalidatePath } from "next/cache";

type CreateCommentFormState = {
  success?: boolean;
  errors?: {
    content?: string[];
    formErrors?: string[];
  };
};

export const createComments = async (
  postId: string,
  input: { content: string }
): Promise<CreateCommentFormState> => {
  const result = commentPostSchema.safeParse({ content: input.content });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();
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
        formErrors: ["User not found. Please register before adding comment."],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        authorId: existingUser.id,
        postId,
      },
    });
    revalidatePath(`/posts/detail/${postId}`);
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
        formErrors: ["Some internal server error while creating comment"],
      },
    };
  }
};
