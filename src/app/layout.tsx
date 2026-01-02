import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agent Employees",
  description: "Hire AI teammates that execute work inside your tools.",
};

import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { WaitlistProvider } from "@/context/WaitlistContext";
import WaitlistModal from "@/components/WaitlistModal/WaitlistModal";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <WaitlistProvider>
          <Navbar />
          {children}
          <Footer />
          <WaitlistModal />
        </WaitlistProvider>
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
};

export default RootLayout;
