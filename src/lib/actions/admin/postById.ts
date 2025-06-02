"use server";
import prisma from "@/lib/prisma";

export const getPostById = async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        categories: true,
      },
    });

    return post;
  } catch (error: any) {
    console.error("Failed to fetch post:", error.message);
    return null;
  }
};
