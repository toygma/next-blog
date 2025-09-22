"use server"
import { Metadata } from "next";
import React, { cache, Suspense } from "react";
import Loading from "@/components/loading";
import DetailPage from "@/components/pages/detail/DetailPage";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

interface ArticleDetailPageProps {
  params: { id: string };
}

const getPosts = cache(async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: { select: { name: true, email: true } },
      categories: { select: { name: true } },
    },
  });
});

export async function generateMetadata({
  params: { id },
}: ArticleDetailPageProps): Promise<Metadata> {
  const posts = await getPosts(id);

  if (!posts) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: posts.title,
    description: posts.content.slice(0, 150),
    openGraph: {
      images: [
        {
          url: posts.featuredImage || "",
        },
      ],
    },
  };
}

const Page = async ({ params }: ArticleDetailPageProps) => {
  const { id } = await params;
  const session = await getServerSession();
  const userId = session?.user?.id;

  const posts = await getPosts(id);

  if (!posts) return <h1>Article not found.</h1>;

  const likes = await prisma.like.findMany({ where: { postId: posts.id } });
  let isLiked = false;

  if (userId) {
    isLiked = likes.some((like) => like.userId === userId);
  }

  const comments = await prisma.comment.findMany({
    where: { postId: posts.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  const postWithUser = {
    ...posts,
    user: posts.user ?? { name: null, email: null },
  };

  return (
    <Suspense fallback={<Loading fullScreen />}>
      <DetailPage
        posts={postWithUser}
        isLiked={isLiked}
        likes={likes}
        comments={comments}
        userId={userId}
      />
    </Suspense>
  );
};

export default Page;
