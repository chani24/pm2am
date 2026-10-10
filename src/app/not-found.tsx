import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/site/Nav";

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
          <p className="shead_time">404 · Page not found</p>
          <h1 className="hero_title display">
            <span className="hero_line">Wrong</span>
            <span className="hero_line hero_line--outline">Room</span>
          </h1>
          <div className="hero_ctas">
            <Link href="/" className="btn btn--solid btn--lg">Back to the party</Link>
          </div>
        </div>
      </main>
    </>
  );
}
