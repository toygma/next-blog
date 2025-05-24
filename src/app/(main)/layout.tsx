import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import Title from "@/components/title/Title";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevJourney",
  description: "Full Stack Developer Journey, Frontend, Backend, Full Stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          {/* Main */}
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8 py-4 sm:py-6 md:py-8 flex-grow ">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 font-inter">
                <aside className="w-full lg:col-span-4 lg:mt-0 md:mt-12 mt-20">
                  <Sidebar />
                </aside>
                <main className="w-full  lg:mt-0 lg:col-span-8 ">
                  <Title />
                  {children}
                </main>
              </div>
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
