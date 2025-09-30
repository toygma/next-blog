import { Suspense } from "react";
import type { Metadata } from "next";
import Loading from "@/components/loading";
import { PaginationWithLinks } from "@/components/ui/pagination-with";
import { getAllPostsBlogs } from "@/lib/actions/admin/get.posts";
import dynamic from "next/dynamic";

const BlogPage = dynamic(() => import("@/components/pages/blog/BlogPage"), {
  loading: () => <Loading fullScreen />,
});

export const metadata: Metadata = {
  title: "Teknoloji, Kodlama ve Kişisel Gelişim Blogu",
  description:
    "Next.js, TypeScript ve siber güvenlik odaklı en güncel full-stack geliştirme makalelerini keşfedin. Bilgilerinizi bir üst seviyeye taşımak için hemen okumaya başlayın!",
};

type PageProps = {
  searchParams?: Promise<{ page: string; pageSize: string }>;
};
const Page = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt((await searchParams)?.page || "1");
  const postsPerPage = parseInt((await searchParams)?.pageSize || "4");

  const { data, totalCount } = await getAllPostsBlogs(
    currentPage,
    postsPerPage
  );

  return (
    <>
      <Suspense fallback={<Loading fullScreen />}>
        <BlogPage posts={data} />
        <div className="mt-8">
          <PaginationWithLinks
            page={currentPage}
            pageSize={postsPerPage}
            totalCount={Number(totalCount)}
            pageSizeSelectOptions={{
              pageSizeOptions: [5, 10, 25, 50],
            }}
          />
        </div>
      </Suspense>
    </>
  );
};

export default Page;
