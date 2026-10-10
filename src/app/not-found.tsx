import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/site/Nav";

export const metadata: Metadata = { title: "Page not found — PM2AM" };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="hero">
        <div className="hero_media" aria-hidden="true">
          <Image src="/media/hero/03-disco-ball-crowd.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero_shade" aria-hidden="true" />
        <div className="hero_inner">
          <p className="status_label">404 · Page not found</p>
          <h1 className="hero_title tag tag--solid">
            <span className="hero_line">Wrong</span>
            <span className="hero_line">room</span>
          </h1>
          <div className="hero_ctas">
            <Link href="/" className="btn btn--solid">
              Back to the party
            </Link>
            <Link href="/#events" className="btn btn--ghost">
              Upcoming nights
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
