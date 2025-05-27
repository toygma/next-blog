import { LoaderCircle } from "lucide-react";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className={"animate-spin"} />
    </div>
  );
};

export default loading;
