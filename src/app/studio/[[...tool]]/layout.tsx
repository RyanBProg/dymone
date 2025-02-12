import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Dymoné",
  description: "Manage studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
