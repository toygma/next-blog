"use server";
import prisma from "../../prisma";

export async function getAllPostsProjects(page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          postType: "Project",
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          content: true,
          categories: true,
          createdAt: true,
          views: true,
          likes: true,
          comments: true,
          featuredImage: true,
          postType: true,
          authorId: true,
        },
      }),
      prisma.post.count({
        where: {
          postType: "Project",
        },
      }),
    ]);

    return {
      success: true,
      data: posts,
      totalCount: total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, message: "Failed to fetch posts" };
  }
}




export async function getAllPostsBlogs(page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          postType: "Blog",
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          content: true,
          categories: true,
          createdAt: true,
          views: true,
          likes: true,
          comments: true,
          featuredImage: true,
          postType: true,
          authorId: true,
        },
      }),
      prisma.post.count({
        where: {
          postType: "Blog",
        },
      }),
    ]);

    return {
      success: true,
      data: posts,
      totalCount: total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, message: "Failed to fetch posts" };
  }
}
