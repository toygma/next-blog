import Loading from "@/components/loading";
import DetailPage from "@/components/pages/detail/DetailPage";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";

interface ArticleDetailPageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: ArticleDetailPageProps) => {
  const { id } = await params;

  const session = await getServerSession();
  const userId = session?.user?.id;

  const posts = await prisma.post.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      categories: { select: { name: true } },
    },
  });

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
