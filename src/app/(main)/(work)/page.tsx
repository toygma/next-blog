import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import { getAllPostsProjects } from "@/lib/actions/admin/get.posts";
import { PaginationWithLinks } from "@/components/ui/pagination-with";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack Web ve Siber Güvenlik Projeleri",
  description:
    "En son Next.js 15, TypeScript, Node.JS ve temiz mimari pratikleriyle geliştirdiğim uygulamaları keşfedin. Siber güvenliği merkeze alan projelerimi inceleyin!",
};

const WorkPage = dynamic(() => import("@/components/pages/work/WorkPage"), {
  loading: () => <Loading fullScreen />,
});

type PageProps = {
  searchParams?: Promise<{ page: string; pageSize: string }>;
};
const Page = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt((await searchParams)?.page || "1");
  const postsPerPage = parseInt((await searchParams)?.pageSize || "4");
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
