import { Suspense } from "react";
import Loading from "@/components/loading";
import WorkPage from "@/components/pages/work/WorkPage";
import { getAllPosts } from "@/lib/actions/get.post";

const Page =async () => {
  const data = await getAllPosts();

  const postFilter = data?.data?.filter((post) => post.postType === "Project");

  return (
    <>
      <Suspense fallback={<Loading fullScreen />}>
        <WorkPage posts={postFilter}/>
      </Suspense>
    </>
  );
};

export default Page;
