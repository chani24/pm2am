import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Praise } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const praise = Praise({
  subsets: ["latin"],
  variable: "--font-praise",
  display: "swap",
  weight: "400",
});

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
  title: "PM2AM",
  description: "FOR THE REAL PARTIERS",
  openGraph: {
    title: "PM2AM",
    description: "FOR THE REAL PARTIERS",
    url: "https://pm2amgang.com",
    siteName: "PM2AM",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 679,
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
    images: ["/og-image.jpg"],
    creator: "@pm2am_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monument.variable} ${monumentLight.variable} ${monumentBlack.variable} ${praise.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
