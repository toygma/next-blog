import { Suspense } from "react";
import type { Metadata } from "next";
import Loading from "@/components/loading";
import { PaginationWithLinks } from "@/components/ui/pagination-with";
import { getAllPostsBlogs } from "@/lib/actions/get.posts";
import dynamic from "next/dynamic";

const BlogPage = dynamic(() => import("@/components/pages/blog/BlogPage"), {
  loading: () => <Loading fullScreen />,
});

export const metadata: Metadata = {
  title: "Dev-Journey Blogs",
}


const Page = async ({ searchParams }: any) => {
 const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt((searchParams.pageSize as string) || "4");
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
