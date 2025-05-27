import { Suspense } from "react";
import Loading from "@/components/loading";
import WorkPage from "@/components/pages/work/WorkPage";
import { getAllPostsProjects } from "@/lib/actions/get.posts";
import { PaginationWithLinks } from "@/components/ui/pagination-with";

interface PageProps {
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

function getPaginationParams(searchParams?: { [key: string]: string | string[] | undefined }) {
  const currentPage = parseInt((searchParams?.page as string) || "1");
  const postsPerPage = parseInt((searchParams?.pageSize as string) || "4");
  return { currentPage, postsPerPage };
}


export async function generateMetadata() {
  return {
    title: "Dev-Journey Projects",
    description:
      "Discover the projects he developed during his software development journey. Here are some sample works done with React, Next.js and modern web technologies!",
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { currentPage, postsPerPage } = getPaginationParams(searchParams);
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
