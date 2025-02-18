import "../globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Header />
      {children}
      <Footer />
      <SanityLive />
    </ClerkProvider>
  );
}
