import "@/app/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration procedures",
  description: "Login and Register",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
export default Layout;
