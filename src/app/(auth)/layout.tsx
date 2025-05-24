import "@/app/globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/header/Header";
export const metadata: Metadata = {
  title: "Authtenticated",
  description: "Login and Register",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
