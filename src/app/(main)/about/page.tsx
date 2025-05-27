"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/loading";

const AboutPage = dynamic(() => import("@/components/pages/about/AboutPage"), {
  ssr: false,
  loading: () => <Loading fullScreen />,
});

const Page = () => {
  return (
    <>
      <AboutPage />
    </>
  );
};

export default Page;
