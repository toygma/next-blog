import "@/app/globals.css";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Detay Sayfasi",
  description: "Detay",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="mt-32 max-w-screen-xl mx-auto">{children}</main>
    </>
  );
};
export default Layout;
