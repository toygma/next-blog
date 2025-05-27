"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/loading";

const BlogPage = dynamic(
  () => import("@/components/pages/blog/BlogPage"),
  {
    ssr: false,
    loading: () => <Loading fullScreen />,
  }
);
const Page = () => {
  return (
    <>
      <BlogPage />
    </>
  );
};

export default Page;
