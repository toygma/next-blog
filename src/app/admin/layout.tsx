import "@/app/globals.css";
import Sidebar from "@/components/pages/admin/Sidebar";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {

  const session = await getServerSession();

  if(session?.user?.role !== "admin") {
    return redirect("/")
  }
 
  return (
    <div className="flex mt-[75px]">
      <Sidebar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
export default Layout;
