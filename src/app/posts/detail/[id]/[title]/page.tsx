import Loading from "@/components/loading";
import DetailPage from "@/components/pages/detail/DetailPage";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

const page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const id = (await params).id;
  {
    /* Post detail Form */
  }
  const posts = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image_url: true,
        },
      },
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!posts) {
    return <h1>Article not found.</h1>;
  }
  {
    /* Liked Form */
  }
  const likes = await prisma.like.findMany({ where: { postId: posts.id } });
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId as string },
  });

  const isLiked = likes.some((like) => like.userId === user?.id);
  {
    /* comment Form */
  }
  const comments = await prisma.comment.findMany({
    where: { postId: posts.id },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image_url: true,
        },
      },
    },
  });

  return (
    <Suspense fallback={<Loading fullScreen />}>
      <DetailPage
        posts={posts}
        isLiked={isLiked}
        likes={likes}
        comments={comments}
      />
    </Suspense>
  );
};

export default page;
