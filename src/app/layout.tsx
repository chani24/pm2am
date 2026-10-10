import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Sedgwick_Ave_Display, Space_Mono } from "next/font/google";
import SmoothScroll from "@/components/site/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Footer link style.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

// Graffiti handstyle used for accent words — echoes the drippy logo.
const graffiti = Sedgwick_Ave_Display({
  subsets: ["latin"],
  variable: "--font-graffiti",
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
      <body suppressHydrationWarning
        className={`${monument.variable} ${monumentLight.variable} ${monumentBlack.variable} ${inter.variable} ${graffiti.variable} ${spaceMono.variable} antialiased`}
      >
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
