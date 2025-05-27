"use server";
import prisma from "../prisma";

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        categories:true,
        createdAt: true,
        views:true,
        likes: true,
        comments: true,
        featuredImage:true,
        postType:true,
        authorId: true,
      },
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, message: "Failed to fetch posts" };
  }
}