import Loading from "@/components/loading";
import CreatePage from "@/components/pages/admin/create/CreatePage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <CreatePage />
    </Suspense>
  );
};

export default Page;
