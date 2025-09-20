import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import ThemeComp from "@/components/themes/ThemeComp";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toygma",
  description: "Full Stack Developer Journey, Frontend, Backend, Full Stack",
  openGraph: {
    images: [
      {
        url: "/images/toygma-min.png",
        width: 1200,
        height: 630,
        alt: "Toygma Open Graph Image",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeComp>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <Toaster richColors duration={3000} position="top-center" />
            </ThemeComp>
          </ThemeProvider>
        </body>
      </html>
  );
}
