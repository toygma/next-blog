import Loading from "@/components/loading";
import DetailPage from "@/components/pages/detail/DetailPage";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

const page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const id = (await params).id;
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
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <DetailPage posts={posts} />
    </Suspense>
  );
};

export default page;
