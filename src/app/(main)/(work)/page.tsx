import { Suspense } from "react";
import Loading from "@/components/loading";
import WorkPage from "@/components/pages/work/WorkPage";
import { getAllPosts } from "@/lib/actions/get.post";

const Page =async () => {
  const data = await getAllPosts()

  return (
    <>
      <Suspense fallback={<Loading fullScreen />}>
        <WorkPage posts={data.data}/>
      </Suspense>
    </>
  );
};

export default Page;
