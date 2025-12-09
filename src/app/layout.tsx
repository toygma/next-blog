import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import ThemeComp from "@/components/themes/ThemeComp";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "./googleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Toygma - Full Stack Developer Yolculuğu",
    template: "%s | Toygma",
  },
  description: "Full Stack Developer Yolculuğu, Frontend, Backend, Full Stack",
  openGraph: {
    title: "Toygma - Full Stack Developer Yolculuğu",
    description:
      "Full Stack Developer Yolculuğu, Frontend, Backend, Full Stack",
    images: [
      {
        url: "https://www.toygma.com/opengraph-image.png",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
