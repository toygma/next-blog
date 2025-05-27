import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
const CreatePage = dynamic(
  () => import("@/components/pages/admin/create/CreatePage"),
  {
    loading: () => <Loading fullScreen />,
  }
);
const Page = () => {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <CreatePage />
    </Suspense>
  );
};

export default Page;
