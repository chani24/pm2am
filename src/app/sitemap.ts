import type { MetadataRoute } from "next";
import { events } from "@/config/site";

// Generated at build time from the event list, so new event pages are listed automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pm2amgang.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
