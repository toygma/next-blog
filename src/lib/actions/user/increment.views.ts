"use server";

import {prisma} from "@/lib/prisma";


export async function incrementPostViews(postId: string) {
  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}
