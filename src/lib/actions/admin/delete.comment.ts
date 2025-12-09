"use server";

import { getServerSession } from "@/lib/get-session";
import {prisma} from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCommentAsAdmin = async (
  commentId: string
): Promise<{ success?: boolean; error?: any }> => {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return { error: "You must be logged in." };
  }

  const isAdmin = session.user.role === "admin";
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