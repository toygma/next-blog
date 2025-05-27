import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Loading from "@/components/loading";
import { getAllPostsProjects } from "@/lib/actions/get.posts";
import { PaginationWithLinks } from "@/components/ui/pagination-with";


const WorkPage = dynamic(() => import("@/components/pages/work/WorkPage"), {
  loading: () => <Loading fullScreen />,
});

export const metadata: Metadata = {
  title: "Dev-Journey Projects",
    description:
      "Discover the projects he developed during his software development journey. Here are some sample works done with React, Next.js and modern web technologies!",
}

const Page = async ({ searchParams }: any) => {
  const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt((searchParams.pageSize as string) || "4");
  const { data, totalCount } = await getAllPostsProjects(
    currentPage,
    postsPerPage
  );

  return (
    <Suspense fallback={<Loading fullScreen />}>
      <WorkPage posts={data} />
      <div className="mt-8">
        <PaginationWithLinks
          page={currentPage}
          pageSize={postsPerPage}
          totalCount={Number(totalCount)}
          pageSizeSelectOptions={{
            pageSizeOptions: [4, 10, 25, 50],
          }}
        />
      </div>
    </Suspense>
  );
};

export default Page;
