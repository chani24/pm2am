import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Praise } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const praise = Praise({
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
