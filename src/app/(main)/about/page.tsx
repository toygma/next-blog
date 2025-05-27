"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import { Suspense } from "react";


const AboutPage = dynamic(() => import("@/components/pages/about/AboutPage"), {
  ssr: false,
  loading: () => <Loading fullScreen />,
});
const Page = () => {
  return (
    <>
    <Suspense fallback={<Loading fullScreen/>}>
      <AboutPage />
    </Suspense>
    </>
  );
};

export default Page;
