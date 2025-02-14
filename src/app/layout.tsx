import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: {
    default: "Dymoné",
    template: "%s | Dymoné",
  },
  description: "Dymoné Luxury Jewellery",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col bg-neutral-100 min-h-screen p-safe`}>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
