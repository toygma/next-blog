import "@/app/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt İşlemleri",
  description: "Giriş ve Kayıt",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
export default Layout;