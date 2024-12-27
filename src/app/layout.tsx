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
  title: "PM2AM - FOR THE REAL PARTIERS",
  description:
    "Explore unforgettable party adventures with PM2AM. From beach carnivals to Halloween specials, we bring you the ultimate Lagos nightlife experience. Get in touch at PM2AMGANG@gmail.com or visit https://pm2amgang.com.",
  keywords: [
    "PM2AM",
    "PM2AM gang",
    "Real partiers",
    "Lagos nightlife",
    "Palmwine and friends",
    "Weekend Parties Lagos",
    "Nightlife",
    "Chibbyverse",
    "Outside",
    "Best parties",
    "Lagos events",
    "Even in the day",
    "Nativeland",
    "Premium Nightlife Spots",
    "Outsiders",
    "Detty December",
    "December Activities",
    "Lagos Nightclubs",
  ],
  openGraph: {
    title: "PM2AM - FOR THE REAL PARTIERS",
    description:
      "Explore unforgettable party adventures with PM2AM. From beach carnivals to Halloween specials, we bring you the ultimate Lagos nightlife experience. Get in touch at PM2AMGANG@gmail.com or visit https://pm2amgang.com.",
    url: "https://pm2amgang.com",
    siteName: "PM2AM",
    images: [
      {
        url: "https://pm2amgang.com/og-image.jpg",
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
    images: ["https://pm2amgang.com/og-image.jpg"],
    creator: "@pm2am_",
  },
  robots: {
    index: true,
    follow: true,
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
