import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SkipToContent from "@/components/SkipToContent";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUXE - Premium Luxury Fashion & Lifestyle",
  description: "Discover timeless elegance and premium luxury fashion for the modern lifestyle. Shop curated collections of designer clothing, accessories, and exclusive items.",
  keywords: ["luxury fashion", "designer clothing", "premium accessories", "lifestyle", "e-commerce", "luxury brands", "high-end fashion"],
  authors: [{ name: "LUXE Team" }],
  creator: "LUXE",
  publisher: "LUXE",
  robots: "index, follow",
  openGraph: {
    title: "LUXE - Premium Luxury Fashion & Lifestyle",
    description: "Discover timeless elegance and premium luxury fashion for the modern lifestyle.",
    url: "https://luxe.com",
    siteName: "LUXE",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LUXE - Premium Luxury Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE - Premium Luxury Fashion & Lifestyle",
    description: "Discover timeless elegance and premium luxury fashion for the modern lifestyle.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://luxe.com",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e40af",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="LUXE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LUXE" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <SkipToContent />
        <StructuredData />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
