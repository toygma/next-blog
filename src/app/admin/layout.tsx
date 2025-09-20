import "@/app/globals.css";
import Sidebar from "@/components/pages/admin/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
 
  return (
    <div className="flex mt-[75px]">
      <Sidebar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
export default Layout;
