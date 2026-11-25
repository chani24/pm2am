import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/site/SmoothScroll";

const monumentBlack = localFont({
  src: "./fonts/PPMonument/PPMonumentExtended-Black.otf",
  variable: "--font-pp-monument-black",
  weight: "900",
});

const monument = localFont({
  src: "./fonts/PPMonument/PPMonumentExtended-Regular.otf",
  variable: "--font-pp-monument",
  weight: "400",
});

const monumentLight = localFont({
  src: "./fonts/PPMonument/PPMonumentExtended-Light.otf",
  variable: "--font-pp-monument-light",
  weight: "100",
});

export const metadata: Metadata = {
  // Resolves relative share images (e.g. event flyers) to absolute URLs.
  metadataBase: new URL("https://pm2amgang.com"),
  title: "PM2AM — For the real partiers",
  description:
      "PM2AM is a Lagos party culture: Afrobeats, Amapiano and Afro House nights at Casa 45, Voda Beach Club and beyond. Tickets, tables, merch and recaps — for the real partiers.",
  openGraph: {
    title: "PM2AM — For the real partiers",
    description:
      "PM2AM is a Lagos party culture: Afrobeats, Amapiano and Afro House nights at Casa 45, Voda Beach Club and beyond. Tickets, tables, merch and recaps — for the real partiers.",
    url: "https://pm2amgang.com",
    siteName: "PM2AM",
    images: [
      {
        url: "https://pm2amgang.com/og-image-2026.jpg",
        width: 1200,
        height: 630,
        alt: "PM2AM - For the Real Partiers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM2AM",
    description: "FOR THE REAL PARTIERS",
    images: ["https://pm2amgang.com/og-image-2026.jpg"],
    creator: "@pm2am_",
  },
};

// Tints the phone browser bar to match the site.
export const viewport: Viewport = { themeColor: "#07040b" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Sedgwick+Ave+Display&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning
        className={`${monument.variable} ${monumentLight.variable} ${monumentBlack.variable} antialiased`}
      >
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
