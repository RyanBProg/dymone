import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dymoné",
  description: "Dymoné Luxury Jewellery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Header />
      {children}
      <Footer />
    </ClerkProvider>
  );
}
