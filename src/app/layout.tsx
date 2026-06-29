import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect Link | Premium Construction & Property Development",
  description: "Building Zimbabwe's Future, One Project at a Time. Premium construction, property development, and high-end interiors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}
