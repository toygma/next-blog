"use client";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";

const DetailPage = dynamic(
  () => import("@/components/pages/detail/DetailPage"),
  {
    ssr: false,
    loading: () => <Loading fullScreen />,
  }
);

const Page = () => {
  return (
    <div>
      <DetailPage />
    </div>
  );
};

export default Page;
