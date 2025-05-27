import "@/app/globals.css";
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
    <>
      <main>{children}</main>
    </>
  );
};
export default Layout;
