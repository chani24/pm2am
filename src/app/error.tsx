"use client";

import Link from "next/link";
import Nav from "@/components/site/Nav";

// Shown if a page crashes while rendering — same look as the 404.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <Nav />
      <main className="hero hero--plain">
        <div className="hero_shade" aria-hidden="true" />
        <div className="hero_inner">
          <p className="status_label">Something went wrong</p>
          <h1 className="hero_title tag tag--solid">
            <span className="hero_line">The DJ</span>
            <span className="hero_line">skipped</span>
          </h1>
          <div className="hero_ctas">
            <button className="btn btn--solid" onClick={reset}>
              Try again
            </button>
            <Link href="/" className="btn btn--ghost">
              Back to the party
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
