import "@/app/globals.css";
import Sidebar from "@/components/pages/admin/Sidebar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const ClerkClient = await clerkClient();
  const user = await ClerkClient.users.getUser(userId);

  const isAdmin = user.publicMetadata.isAdmin;

  if (isAdmin === false) {
    redirect("/");
  }
  return (
    <div className="flex mt-[75px]">
      <Sidebar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
export default Layout;
