"use server";

import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export const deleteCommentAsAdmin = async (
  commentId: string
): Promise<{ success?: boolean; error?: any }> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "You must be logged in." };
  }
  const ClerkClient = await clerkClient();
  const user = await ClerkClient?.users?.getUser(userId);
  const isAdmin = user.publicMetadata?.isAdmin === true;

  if (!isAdmin) return { error: "Unauthorized: Admins only." };

  try {
    await prisma.comment.delete({ where: { id: commentId } });
    revalidatePath("/admin/comments");
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Unexpected error occurred." };
  }
};
